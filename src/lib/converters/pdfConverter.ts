/**
 * PDF 변환 유틸리티
 * PDF ↔ 이미지 변환
 */

import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import { ImageFormat, ConversionOptions } from '@/types/conversion';

// PDF.js worker 설정
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

/**
 * PDF의 각 페이지를 이미지로 변환
 */
export const convertPDFToImages = async (
  file: File,
  targetFormat: ImageFormat,
  options: ConversionOptions = {}
): Promise<Blob[]> => {
  const {
    quality = 0.92,
    scale = 2,
  } = options;

  try {
    // PDF 파일을 ArrayBuffer로 읽기
    const arrayBuffer = await file.arrayBuffer();
    
    // PDF 문서 로드
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    
    const numPages = pdfDoc.numPages;
    const images: Blob[] = [];
    
    // 각 페이지를 순회하며 이미지로 변환
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      
      // 렌더링을 위한 viewport 설정
      const viewport = page.getViewport({ scale });
      
      // Canvas 생성
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Canvas context를 가져올 수 없습니다');
      }
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      // PDF 페이지를 canvas에 렌더링
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
      
      // Canvas를 Blob으로 변환
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error(`페이지 ${pageNum} 변환 실패`));
            }
          },
          targetFormat,
          quality
        );
      });
      
      images.push(blob);
    }
    
    return images;
  } catch (error) {
    throw new Error(`PDF 변환 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
};

/**
 * 이미지들을 하나의 PDF로 변환
 */
export const convertImagesToPDF = async (
  files: File[],
  options: ConversionOptions = {}
): Promise<Blob> => {
  try {
    // 새 PDF 문서 생성
    const pdfDoc = await PDFDocument.create();
    
    // 각 이미지를 PDF 페이지로 추가
    for (const file of files) {
      // 이미지를 ArrayBuffer로 읽기
      const arrayBuffer = await file.arrayBuffer();
      
      let image;
      const mimeType = file.type;
      
      // 이미지 타입에 따라 임베드
      if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
        image = await pdfDoc.embedJpg(arrayBuffer);
      } else if (mimeType === 'image/png') {
        image = await pdfDoc.embedPng(arrayBuffer);
      } else {
        // 다른 포맷은 Canvas를 통해 PNG로 변환
        const blob = await convertImageToPNG(file);
        const pngArrayBuffer = await blob.arrayBuffer();
        image = await pdfDoc.embedPng(pngArrayBuffer);
      }
      
      // 이미지 크기에 맞는 페이지 생성
      const page = pdfDoc.addPage([image.width, image.height]);
      
      // 페이지에 이미지 그리기
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }
    
    // PDF를 Blob으로 저장
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  } catch (error) {
    throw new Error(`PDF 생성 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
};

/**
 * 이미지를 PNG로 변환 (헬퍼 함수)
 */
async function convertImageToPNG(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context를 가져올 수 없습니다'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('PNG 변환 실패'));
          }
        }, 'image/png');
      };
      
      img.onerror = () => reject(new Error('이미지 로딩 실패'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsDataURL(file);
  });
}

