/**
 * 래스터 이미지 변환 유틸리티
 * JPG, PNG, WEBP, AVIF, GIF 간 변환
 */

import { ImageFormat, ConversionOptions } from '@/types/conversion';
import { FORMAT_INFO } from '@/lib/conversionMap';

/**
 * 이미지 파일을 HTMLImageElement로 로드
 */
export const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('이미지 로딩 실패'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsDataURL(file);
  });
};

/**
 * 래스터 이미지 변환 (Canvas 기반)
 */
export const convertRasterImage = async (
  file: File,
  targetFormat: ImageFormat,
  options: ConversionOptions = {}
): Promise<Blob> => {
  const {
    quality = 0.92,
    backgroundColor = '#FFFFFF',
    maxWidth,
    maxHeight,
  } = options;

  return new Promise(async (resolve, reject) => {
    try {
      const img = await loadImage(file);
      
      let { width, height } = img;
      
      // 최대 크기 제한이 있으면 리사이즈
      if (maxWidth && width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (maxHeight && height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas context를 가져올 수 없습니다');
      }
      
      // 투명 배경을 지원하지 않는 포맷의 경우 배경색 채우기
      if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('이미지 변환 실패'));
          }
        },
        targetFormat,
        quality
      );
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * GIF의 첫 프레임을 다른 포맷으로 변환
 */
export const convertGIF = async (
  file: File,
  targetFormat: ImageFormat,
  options: ConversionOptions = {}
): Promise<Blob> => {
  // GIF는 일반 래스터 변환과 동일하게 처리 (첫 프레임만 변환됨)
  return convertRasterImage(file, targetFormat, options);
};

