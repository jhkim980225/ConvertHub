/**
 * 이미지 포맷 변환 맵
 * 각 포맷에서 변환 가능한 타겟 포맷을 정의
 */

import { ImageFormatKey, FormatInfo } from '@/types/conversion';

/**
 * 지원하는 포맷 정보
 */
export const FORMAT_INFO: Record<ImageFormatKey, FormatInfo> = {
  jpg: {
    key: 'jpg',
    mime: 'image/jpeg',
    extension: 'jpg',
    name: 'JPEG',
    supportsBrowser: true,
  },
  png: {
    key: 'png',
    mime: 'image/png',
    extension: 'png',
    name: 'PNG',
    supportsBrowser: true,
  },
  webp: {
    key: 'webp',
    mime: 'image/webp',
    extension: 'webp',
    name: 'WebP',
    supportsBrowser: true,
  },
  avif: {
    key: 'avif',
    mime: 'image/avif',
    extension: 'avif',
    name: 'AVIF',
    supportsBrowser: typeof document !== 'undefined' && checkAVIFSupport(),
  },
  gif: {
    key: 'gif',
    mime: 'image/gif',
    extension: 'gif',
    name: 'GIF',
    supportsBrowser: true,
  },
  svg: {
    key: 'svg',
    mime: 'image/svg+xml',
    extension: 'svg',
    name: 'SVG',
    supportsBrowser: true,
  },
  pdf: {
    key: 'pdf',
    mime: 'application/pdf',
    extension: 'pdf',
    name: 'PDF',
    supportsBrowser: true,
  },
};

/**
 * 변환 가능한 포맷 맵
 * 키: 소스 포맷, 값: 변환 가능한 타겟 포맷 배열
 */
export const CONVERSION_MAP: Record<ImageFormatKey, ImageFormatKey[]> = {
  jpg: ['png', 'webp', 'avif', 'pdf'],
  png: ['jpg', 'webp', 'avif', 'pdf'],
  webp: ['jpg', 'png', 'avif'],
  avif: ['jpg', 'png', 'webp'],
  gif: ['png', 'webp', 'jpg'],
  svg: ['png', 'jpg', 'webp'],
  pdf: ['jpg', 'png'],
};

/**
 * AVIF 지원 여부 확인
 */
function checkAVIFSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  } catch {
    return false;
  }
}

/**
 * 파일 확장자에서 포맷 키 추출
 */
export function getFormatFromExtension(filename: string): ImageFormatKey | null {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'jpg';
    case 'png':
      return 'png';
    case 'webp':
      return 'webp';
    case 'avif':
      return 'avif';
    case 'gif':
      return 'gif';
    case 'svg':
      return 'svg';
    case 'pdf':
      return 'pdf';
    default:
      return null;
  }
}

/**
 * MIME 타입에서 포맷 키 추출
 */
export function getFormatFromMime(mimeType: string): ImageFormatKey | null {
  switch (mimeType) {
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/avif':
      return 'avif';
    case 'image/gif':
      return 'gif';
    case 'image/svg+xml':
      return 'svg';
    case 'application/pdf':
      return 'pdf';
    default:
      return null;
  }
}

/**
 * 파일에서 포맷 감지
 */
export function detectFormat(file: File): ImageFormatKey | null {
  // 먼저 MIME 타입으로 시도
  const formatFromMime = getFormatFromMime(file.type);
  if (formatFromMime) {
    return formatFromMime;
  }
  
  // MIME 타입이 없으면 파일명 확장자로 시도
  return getFormatFromExtension(file.name);
}

/**
 * 변환 가능 여부 확인
 */
export function canConvert(sourceFormat: ImageFormatKey, targetFormat: ImageFormatKey): boolean {
  const allowedTargets = CONVERSION_MAP[sourceFormat];
  if (!allowedTargets) {
    return false;
  }
  
  return allowedTargets.includes(targetFormat);
}

/**
 * 포맷 지원 여부 확인
 */
export function isFormatSupported(format: ImageFormatKey): boolean {
  const info = FORMAT_INFO[format];
  return info ? info.supportsBrowser : false;
}

/**
 * 파일명의 확장자 변경
 */
export function changeExtension(filename: string, newFormat: ImageFormatKey): string {
  const lastDotIndex = filename.lastIndexOf('.');
  const nameWithoutExt = lastDotIndex > 0 ? filename.substring(0, lastDotIndex) : filename;
  const extension = FORMAT_INFO[newFormat].extension;
  return `${nameWithoutExt}.${extension}`;
}

