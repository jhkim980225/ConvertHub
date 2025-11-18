/**
 * 통합 이미지 변환기
 * 모든 포맷 변환을 처리하는 중앙 인터페이스
 */

import { ImageFormatKey, ConversionOptions } from '@/types/conversion';
import { FORMAT_INFO, canConvert, isFormatSupported } from '@/lib/conversionMap';
import { convertRasterImage, convertGIF } from './rasterConverter';
import { convertSVGToRaster } from './svgConverter';
import { convertPDFToImages, convertImagesToPDF } from './pdfConverter';

/**
 * 단일 파일 변환
 */
export const convertFile = async (
  file: File,
  sourceFormat: ImageFormatKey,
  targetFormat: ImageFormatKey,
  options: ConversionOptions = {}
): Promise<Blob | Blob[]> => {
  // 변환 가능 여부 확인
  if (!canConvert(sourceFormat, targetFormat)) {
    throw new Error(`${FORMAT_INFO[sourceFormat].name}에서 ${FORMAT_INFO[targetFormat].name}로의 변환은 지원되지 않습니다`);
  }
  
  // 포맷 지원 여부 확인
  if (!isFormatSupported(targetFormat)) {
    throw new Error(`${FORMAT_INFO[targetFormat].name} 포맷은 현재 브라우저에서 지원되지 않습니다`);
  }
  
  const targetMime = FORMAT_INFO[targetFormat].mime;
  
  // 소스 포맷에 따라 적절한 변환 함수 호출
  switch (sourceFormat) {
    case 'pdf':
      // PDF → 이미지 (여러 페이지 → 여러 이미지)
      return convertPDFToImages(file, targetMime, options);
      
    case 'svg':
      // SVG → 래스터
      return convertSVGToRaster(file, targetMime, options);
      
    case 'gif':
      // GIF → 다른 포맷 (첫 프레임만)
      return convertGIF(file, targetMime, options);
      
    default:
      // 일반 래스터 이미지 변환
      return convertRasterImage(file, targetMime, options);
  }
};

/**
 * 여러 이미지를 PDF로 변환
 */
export const convertMultipleImagesToPDF = async (
  files: File[],
  options: ConversionOptions = {}
): Promise<Blob> => {
  if (files.length === 0) {
    throw new Error('변환할 파일이 없습니다');
  }
  
  return convertImagesToPDF(files, options);
};

/**
 * 파일 크기 검증
 */
export const validateFileSize = (file: File, maxSizeMB: number = 25): void => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error(`파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다 (현재: ${(file.size / 1024 / 1024).toFixed(2)}MB)`);
  }
};

/**
 * 여러 파일 크기 검증
 */
export const validateFileSizes = (files: File[], maxSizeMB: number = 25): void => {
  for (const file of files) {
    validateFileSize(file, maxSizeMB);
  }
};

