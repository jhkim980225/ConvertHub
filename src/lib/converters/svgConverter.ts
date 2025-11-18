/**
 * SVG 변환 유틸리티
 * SVG를 래스터 이미지로 변환
 */

import { ImageFormat, ConversionOptions } from '@/types/conversion';

/**
 * SVG를 래스터 이미지로 변환
 */
export const convertSVGToRaster = async (
  file: File,
  targetFormat: ImageFormat,
  options: ConversionOptions = {}
): Promise<Blob> => {
  const {
    quality = 0.92,
    scale = 2,
    backgroundColor = '#FFFFFF',
  } = options;

  return new Promise(async (resolve, reject) => {
    try {
      // SVG 파일을 텍스트로 읽기
      const svgText = await file.text();
      
      // SVG 파싱하여 크기 정보 추출
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      const svgElement = svgDoc.querySelector('svg');
      
      if (!svgElement) {
        throw new Error('유효하지 않은 SVG 파일입니다');
      }
      
      // SVG의 viewBox 또는 width/height 속성에서 크기 가져오기
      let width = 1024;
      let height = 1024;
      
      const viewBox = svgElement.getAttribute('viewBox');
      if (viewBox) {
        const parts = viewBox.split(/\s+|,/);
        width = parseFloat(parts[2]) || width;
        height = parseFloat(parts[3]) || height;
      } else {
        const widthAttr = svgElement.getAttribute('width');
        const heightAttr = svgElement.getAttribute('height');
        
        if (widthAttr) width = parseFloat(widthAttr) || width;
        if (heightAttr) height = parseFloat(heightAttr) || height;
      }
      
      // Scale 적용
      width *= scale;
      height *= scale;
      
      // Blob URL 생성
      const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      // Image 엘리먼트로 로드
      const img = new Image();
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Canvas context를 가져올 수 없습니다');
          }
          
          // 배경색 설정 (JPEG의 경우)
          if (targetFormat === 'image/jpeg') {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(
            (resultBlob) => {
              URL.revokeObjectURL(url);
              if (resultBlob) {
                resolve(resultBlob);
              } else {
                reject(new Error('SVG 변환 실패'));
              }
            },
            targetFormat,
            quality
          );
        } catch (error) {
          URL.revokeObjectURL(url);
          reject(error);
        }
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('SVG 로딩 실패'));
      };
      
      img.src = url;
    } catch (error) {
      reject(error);
    }
  });
};

