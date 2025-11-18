/**
 * 이미지 변환 커스텀 훅
 */

import { useState, useCallback } from 'react';
import { ImageFormatKey, ConversionResult, ConversionOptions } from '@/types/conversion';
import { detectFormat, changeExtension, FORMAT_INFO } from '@/lib/conversionMap';
import { convertFile, validateFileSize } from '@/lib/converters/unifiedConverter';
import { createDownloadUrl } from '@/lib/downloadUtils';

interface UseImageConverterReturn {
  results: ConversionResult[];
  isProcessing: boolean;
  convert: (files: File[], targetFormat: ImageFormatKey, options?: ConversionOptions) => Promise<void>;
  clearResults: () => void;
  clearResult: (id: string) => void;
}

/**
 * 이미지 변환 훅
 */
export const useImageConverter = (): UseImageConverterReturn => {
  const [results, setResults] = useState<ConversionResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * 파일 변환
   */
  const convert = useCallback(async (
    files: File[],
    targetFormat: ImageFormatKey,
    options: ConversionOptions = {}
  ) => {
    if (files.length === 0) return;
    
    setIsProcessing(true);

    // 초기 결과 상태 생성
    const newResults: ConversionResult[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      originalName: file.name,
      convertedName: changeExtension(file.name, targetFormat),
      originalSize: file.size,
      convertedSize: 0,
      downloadUrl: '',
      blob: new Blob(),
      status: 'processing' as const,
    }));

    setResults((prev) => [...prev, ...newResults]);

    // 각 파일 변환 처리
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const resultId = newResults[i].id;

      try {
        // 파일 크기 검증
        validateFileSize(file, 25);
        
        // 소스 포맷 감지
        const sourceFormat = detectFormat(file);
        if (!sourceFormat) {
          throw new Error('지원되지 않는 파일 형식입니다');
        }

        // 변환 실행
        const converted = await convertFile(file, sourceFormat, targetFormat, options);
        
        // PDF → 이미지의 경우 여러 페이지가 반환될 수 있음
        if (Array.isArray(converted)) {
          // 첫 번째 결과는 기존 항목 업데이트
          const firstBlob = converted[0];
          const downloadUrl = createDownloadUrl(firstBlob);
          
          setResults((prev) =>
            prev.map((r) =>
              r.id === resultId
                ? {
                    ...r,
                    convertedName: changeExtension(file.name, targetFormat).replace(
                      `.${FORMAT_INFO[targetFormat].extension}`,
                      `_page-1.${FORMAT_INFO[targetFormat].extension}`
                    ),
                    convertedSize: firstBlob.size,
                    downloadUrl,
                    blob: firstBlob,
                    status: 'success' as const,
                    pageNumber: 1,
                  }
                : r
            )
          );
          
          // 나머지 페이지들은 새 항목으로 추가
          const additionalResults: ConversionResult[] = converted.slice(1).map((blob, index) => ({
            id: `${resultId}-page-${index + 2}`,
            originalName: file.name,
            convertedName: changeExtension(file.name, targetFormat).replace(
              `.${FORMAT_INFO[targetFormat].extension}`,
              `_page-${index + 2}.${FORMAT_INFO[targetFormat].extension}`
            ),
            originalSize: file.size,
            convertedSize: blob.size,
            downloadUrl: createDownloadUrl(blob),
            blob,
            status: 'success' as const,
            pageNumber: index + 2,
          }));
          
          if (additionalResults.length > 0) {
            setResults((prev) => [...prev, ...additionalResults]);
          }
        } else {
          // 단일 결과
          const downloadUrl = createDownloadUrl(converted);
          
          setResults((prev) =>
            prev.map((r) =>
              r.id === resultId
                ? {
                    ...r,
                    convertedSize: converted.size,
                    downloadUrl,
                    blob: converted,
                    status: 'success' as const,
                  }
                : r
            )
          );
        }
      } catch (error) {
        setResults((prev) =>
          prev.map((r) =>
            r.id === resultId
              ? {
                  ...r,
                  status: 'error' as const,
                  error: error instanceof Error ? error.message : '변환 실패',
                }
              : r
          )
        );
      }
    }

    setIsProcessing(false);
  }, []);

  /**
   * 모든 결과 삭제
   */
  const clearResults = useCallback(() => {
    // URL 메모리 해제
    results.forEach((result) => {
      if (result.downloadUrl) {
        URL.revokeObjectURL(result.downloadUrl);
      }
    });
    setResults([]);
  }, [results]);

  /**
   * 특정 결과 삭제
   */
  const clearResult = useCallback((id: string) => {
    setResults((prev) => {
      const result = prev.find(r => r.id === id);
      if (result?.downloadUrl) {
        URL.revokeObjectURL(result.downloadUrl);
      }
      return prev.filter(r => r.id !== id);
    });
  }, []);

  return {
    results,
    isProcessing,
    convert,
    clearResults,
    clearResult,
  };
};

