/**
 * 범용 이미지 변환 컴포넌트
 */

import { useState, useCallback } from 'react';
import { ImageFormatKey } from '@/types/conversion';
import { FileDropZone } from '@/components/common/FileDropZone';
import { useImageConverter } from '@/hooks/useImageConverter';
import { downloadResult, downloadAsZip } from '@/lib/downloadUtils';
import { formatFileSize } from '@/lib/imageConverter';
import { FORMAT_INFO } from '@/lib/conversionMap';

interface GenericImageConverterProps {
  title: string;
  description: string;
  sourceFormats: ImageFormatKey[];
  targetFormats: ImageFormatKey[];
  acceptTypes: string;
  infoContent?: React.ReactNode;
}

/**
 * 범용 이미지 변환 컴포넌트
 */
export const GenericImageConverter: React.FC<GenericImageConverterProps> = ({
  title,
  description,
  sourceFormats,
  targetFormats,
  acceptTypes,
  infoContent,
}) => {
  const { results, isProcessing, convert, clearResults } = useImageConverter();
  const [selectedTargetFormat, setSelectedTargetFormat] = useState<ImageFormatKey>(targetFormats[0]);

  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      await convert(files, selectedTargetFormat);
    },
    [convert, selectedTargetFormat]
  );

  const handleDownload = useCallback((resultId: string) => {
    const result = results.find(r => r.id === resultId);
    if (result) {
      downloadResult(result);
    }
  }, [results]);

  const handleDownloadAll = useCallback(() => {
    const successResults = results.filter((r) => r.status === 'success');
    successResults.forEach((result, index) => {
      setTimeout(() => downloadResult(result), index * 100);
    });
  }, [results]);

  const handleDownloadZip = useCallback(async () => {
    try {
      await downloadAsZip(results, `${selectedTargetFormat}_images.zip`);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'ZIP 다운로드 실패');
    }
  }, [results, selectedTargetFormat]);

  const successResults = results.filter(r => r.status === 'success');

  return (
    <div className="space-y-6">
      {/* 툴 설명 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>

      {/* 타겟 포맷 선택 (여러 개인 경우만) */}
      {targetFormats.length > 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            변환할 포맷 선택
          </label>
          <div className="flex flex-wrap gap-2">
            {targetFormats.map((format) => (
              <button
                key={format}
                onClick={() => setSelectedTargetFormat(format)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-colors
                  ${selectedTargetFormat === format
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }
                `}
              >
                {FORMAT_INFO[format].name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 파일 선택 영역 */}
      <FileDropZone
        onFilesSelected={handleFilesSelected}
        accept={acceptTypes}
        multiple={true}
        description={`${sourceFormats.map(f => FORMAT_INFO[f].name).join(', ')} 이미지를 드래그하거나 클릭하여 선택하세요`}
      />

      {/* 처리 중 표시 */}
      {isProcessing && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">변환 중...</p>
        </div>
      )}

      {/* 변환 결과 리스트 */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              변환 결과 ({successResults.length}/{results.length})
            </h3>
            <div className="space-x-2">
              {successResults.length > 1 && (
                <>
                  <button
                    onClick={handleDownloadAll}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    모두 다운로드
                  </button>
                  <button
                    onClick={handleDownloadZip}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    ZIP 다운로드
                  </button>
                </>
              )}
              <button
                onClick={clearResults}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                초기화
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {results.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {result.convertedName}
                  </p>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(result.originalSize)} → {formatFileSize(result.convertedSize)}
                    </p>
                    {result.status === 'processing' && (
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        변환 중...
                      </span>
                    )}
                    {result.status === 'error' && (
                      <span className="text-sm text-red-600 dark:text-red-400">
                        {result.error || '변환 실패'}
                      </span>
                    )}
                  </div>
                </div>

                {result.status === 'success' && (
                  <button
                    onClick={() => handleDownload(result.id)}
                    className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                  >
                    다운로드
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 추가 정보 섹션 */}
      {infoContent && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          {infoContent}
        </div>
      )}
    </div>
  );
};

