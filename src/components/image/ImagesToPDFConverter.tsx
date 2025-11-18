/**
 * 여러 이미지를 PDF로 변환하는 컴포넌트
 */

import { useState, useCallback } from 'react';
import { FileDropZone } from '@/components/common/FileDropZone';
import { useImagesToPDF } from '@/hooks/useImagesToPDF';
import { downloadResult } from '@/lib/downloadUtils';
import { formatFileSize } from '@/lib/imageConverter';

/**
 * 이미지를 PDF로 변환하는 컴포넌트
 */
export const ImagesToPDFConverter: React.FC = () => {
  const {
    result,
    isProcessing,
    selectedFiles,
    addFiles,
    removeFile,
    convertToPDF,
    clearResult,
    clearFiles,
  } = useImagesToPDF();

  const [pdfFilename, setPdfFilename] = useState('converted.pdf');

  const handleFilesSelected = useCallback(
    (files: File[]) => {
      addFiles(files);
    },
    [addFiles]
  );

  const handleConvert = useCallback(async () => {
    try {
      await convertToPDF(pdfFilename);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'PDF 생성 실패');
    }
  }, [convertToPDF, pdfFilename]);

  const handleDownload = useCallback(() => {
    if (result) {
      downloadResult(result);
    }
  }, [result]);

  const handleClear = useCallback(() => {
    clearResult();
    clearFiles();
  }, [clearResult, clearFiles]);

  return (
    <div className="space-y-6">
      {/* 툴 설명 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          이미지 → PDF 변환기
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          여러 이미지를 하나의 PDF 파일로 변환합니다. 선택한 순서대로 페이지가 생성됩니다.
        </p>
      </div>

      {/* 파일 선택 영역 */}
      <FileDropZone
        onFilesSelected={handleFilesSelected}
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple={true}
        description="JPG, PNG, WEBP 이미지를 드래그하거나 클릭하여 선택하세요"
      />

      {/* 선택된 파일 목록 */}
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              선택된 이미지 ({selectedFiles.length}개)
            </h3>
            <button
              onClick={clearFiles}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              전체 제거
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="text-gray-500 dark:text-gray-400 font-mono text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate text-sm">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm"
                >
                  제거
                </button>
              </div>
            ))}
          </div>

          {/* PDF 파일명 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              PDF 파일명
            </label>
            <input
              type="text"
              value={pdfFilename}
              onChange={(e) => setPdfFilename(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="converted.pdf"
            />
          </div>

          {/* 변환 버튼 */}
          <button
            onClick={handleConvert}
            disabled={isProcessing || selectedFiles.length === 0}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isProcessing ? 'PDF 생성 중...' : 'PDF로 변환하기'}
          </button>
        </div>
      )}

      {/* 변환 결과 */}
      {result && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            변환 결과
          </h3>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {result.status === 'success' ? (
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {result.convertedName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    원본: {formatFileSize(result.originalSize)} → PDF: {formatFileSize(result.convertedSize)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                  >
                    다운로드
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    초기화
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-red-600 dark:text-red-400">
                  {result.error || 'PDF 생성 실패'}
                </p>
                <button
                  onClick={clearResult}
                  className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  다시 시도
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 추가 정보 */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          사용 방법
        </h3>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
          <li>여러 이미지를 선택하면 선택한 순서대로 PDF 페이지가 생성됩니다</li>
          <li>각 이미지는 자동으로 PDF 페이지 크기에 맞게 조정됩니다</li>
          <li>JPG, PNG, WEBP 형식을 지원합니다</li>
          <li>모든 변환은 브라우저에서만 처리되며 파일이 서버로 전송되지 않습니다</li>
        </ul>
      </div>
    </div>
  );
};

