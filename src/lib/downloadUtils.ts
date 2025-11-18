/**
 * 다운로드 유틸리티
 */

import JSZip from 'jszip';
import { ConversionResult } from '@/types/conversion';

/**
 * Blob을 파일로 다운로드
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // 메모리 정리를 위해 약간의 딜레이 후 URL 해제
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

/**
 * 변환 결과를 다운로드
 */
export const downloadResult = (result: ConversionResult): void => {
  downloadBlob(result.blob, result.convertedName);
};

/**
 * 여러 변환 결과를 순차적으로 다운로드
 */
export const downloadAllResults = (results: ConversionResult[]): void => {
  const successResults = results.filter(r => r.status === 'success');
  
  successResults.forEach((result, index) => {
    // 브라우저가 다운로드를 처리할 수 있도록 약간의 딜레이
    setTimeout(() => downloadResult(result), index * 100);
  });
};

/**
 * 여러 파일을 ZIP으로 묶어서 다운로드
 */
export const downloadAsZip = async (
  results: ConversionResult[],
  zipFilename: string = 'converted.zip'
): Promise<void> => {
  try {
    const zip = new JSZip();
    
    // 성공한 결과만 필터링
    const successResults = results.filter(r => r.status === 'success');
    
    if (successResults.length === 0) {
      throw new Error('다운로드할 파일이 없습니다');
    }
    
    // 각 파일을 ZIP에 추가
    for (const result of successResults) {
      zip.file(result.convertedName, result.blob);
    }
    
    // ZIP 생성
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });
    
    // ZIP 다운로드
    downloadBlob(zipBlob, zipFilename);
  } catch (error) {
    throw new Error(`ZIP 생성 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
};

/**
 * 다운로드 URL 생성
 */
export const createDownloadUrl = (blob: Blob): string => {
  return URL.createObjectURL(blob);
};

/**
 * 다운로드 URL 해제
 */
export const revokeDownloadUrl = (url: string): void => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};

/**
 * 여러 다운로드 URL 해제
 */
export const revokeAllDownloadUrls = (urls: string[]): void => {
  urls.forEach(url => revokeDownloadUrl(url));
};

