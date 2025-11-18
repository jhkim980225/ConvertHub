/**
 * 이미지 변환 관련 타입 정의
 */

export type ImageFormat = 
  | 'image/jpeg'
  | 'image/png'
  | 'image/webp'
  | 'image/avif'
  | 'image/gif'
  | 'image/svg+xml'
  | 'application/pdf';

export type ImageFormatKey = 'jpg' | 'png' | 'webp' | 'avif' | 'gif' | 'svg' | 'pdf';

/**
 * 변환 작업 상태
 */
export type ConversionStatus = 'pending' | 'processing' | 'success' | 'error';

/**
 * 변환 작업 정보
 */
export interface ConversionTask {
  id: string;
  file: File;
  sourceFormat: ImageFormatKey;
  targetFormat: ImageFormatKey;
  status: ConversionStatus;
  progress: number;
  error?: string;
}

/**
 * 변환 결과
 */
export interface ConversionResult {
  id: string;
  originalName: string;
  convertedName: string;
  originalSize: number;
  convertedSize: number;
  downloadUrl: string;
  blob: Blob;
  status: ConversionStatus;
  error?: string;
  pageNumber?: number; // For multi-page PDF conversions
}

/**
 * 포맷 정보
 */
export interface FormatInfo {
  key: ImageFormatKey;
  mime: ImageFormat;
  extension: string;
  name: string;
  supportsBrowser: boolean;
}

/**
 * 변환 옵션
 */
export interface ConversionOptions {
  quality?: number; // 0-1 for JPEG/WEBP
  scale?: number; // For PDF/SVG rendering
  backgroundColor?: string; // For formats that don't support transparency
  maxWidth?: number;
  maxHeight?: number;
}

