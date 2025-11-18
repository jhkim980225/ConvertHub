/**
 * 이미지를 PDF로 변환하는 커스텀 훅
 */

import { useState, useCallback } from 'react';
import { ConversionResult } from '@/types/conversion';
import { convertMultipleImagesToPDF, validateFileSizes } from '@/lib/converters/unifiedConverter';
import { createDownloadUrl } from '@/lib/downloadUtils';

interface UseImagesToPDFReturn {
  result: ConversionResult | null;
  isProcessing: boolean;
  selectedFiles: File[];
  addFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  convertToPDF: (filename?: string) => Promise<void>;
  clearResult: () => void;
  clearFiles: () => void;
}

/**
 * 여러 이미지를 PDF로 변환하는 훅
 */
export const useImagesToPDF = (): UseImagesToPDFReturn => {
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  /**
   * 파일 추가
   */
  const addFiles = useCallback((files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  }, []);

  /**
   * 파일 제거
   */
  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /**
   * 파일 목록 초기화
   */
  const clearFiles = useCallback(() => {
    setSelectedFiles([]);
  }, []);

  /**
   * PDF로 변환
   */
  const convertToPDF = useCallback(async (filename: string = 'converted.pdf') => {
    if (selectedFiles.length === 0) {
      throw new Error('변환할 이미지를 선택해주세요');
    }

    setIsProcessing(true);

    try {
      // 파일 크기 검증
      validateFileSizes(selectedFiles, 25);

      // PDF 생성
      const pdfBlob = await convertMultipleImagesToPDF(selectedFiles);
      
      const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
      
      const newResult: ConversionResult = {
        id: `pdf-${Date.now()}`,
        originalName: `${selectedFiles.length}개의 이미지`,
        convertedName: filename,
        originalSize: totalSize,
        convertedSize: pdfBlob.size,
        downloadUrl: createDownloadUrl(pdfBlob),
        blob: pdfBlob,
        status: 'success',
      };

      setResult(newResult);
    } catch (error) {
      const errorResult: ConversionResult = {
        id: `pdf-error-${Date.now()}`,
        originalName: `${selectedFiles.length}개의 이미지`,
        convertedName: filename,
        originalSize: 0,
        convertedSize: 0,
        downloadUrl: '',
        blob: new Blob(),
        status: 'error',
        error: error instanceof Error ? error.message : 'PDF 생성 실패',
      };
      
      setResult(errorResult);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFiles]);

  /**
   * 결과 삭제
   */
  const clearResult = useCallback(() => {
    if (result?.downloadUrl) {
      URL.revokeObjectURL(result.downloadUrl);
    }
    setResult(null);
  }, [result]);

  return {
    result,
    isProcessing,
    selectedFiles,
    addFiles,
    removeFile,
    convertToPDF,
    clearResult,
    clearFiles,
  };
};

