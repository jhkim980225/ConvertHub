import { useState, useCallback } from 'react';
import { FileDropZone } from '@/components/common/FileDropZone';
import { ConvertResultList, ConvertResult } from '@/components/common/ConvertResultList';
import {
  convertImageFormat,
  createDownloadUrl,
  changeFileExtension,
} from '@/lib/imageConverter';

/**
 * JPEG to PNG 변환 툴 컴포넌트
 */
export const JpegToPngTool: React.FC = () => {
  const [results, setResults] = useState<ConvertResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    setIsProcessing(true);

    // 필터링: JPEG/JPG 파일만
    const imageFiles = files.filter(file =>
      file.type === 'image/jpeg' || file.type === 'image/jpg'
    );

    if (imageFiles.length === 0) {
      alert('JPEG 또는 JPG 파일을 선택해주세요.');
      setIsProcessing(false);
      return;
    }

    // 초기 결과 상태 추가
    const newResults: ConvertResult[] = imageFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      originalName: file.name,
      convertedName: changeFileExtension(file.name, 'png'),
      originalSize: file.size,
      convertedSize: 0,
      downloadUrl: '',
      status: 'processing',
    }));

    setResults((prev) => [...prev, ...newResults]);

    // 각 파일 변환 처리
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const resultId = newResults[i].id;

      try {
        const blob = await convertImageFormat(file, 'image/png');
        const downloadUrl = createDownloadUrl(blob);

        setResults((prev) =>
          prev.map((r) =>
            r.id === resultId
              ? {
                  ...r,
                  convertedSize: blob.size,
                  downloadUrl,
                  status: 'success',
                }
              : r
          )
        );
      } catch (error) {
        setResults((prev) =>
          prev.map((r) =>
            r.id === resultId
              ? {
                  ...r,
                  status: 'error',
                  error: error instanceof Error ? error.message : '변환 실패',
                }
              : r
          )
        );
      }
    }

    setIsProcessing(false);
  }, []);

  const handleDownload = useCallback((result: ConvertResult) => {
    const link = document.createElement('a');
    link.href = result.downloadUrl;
    link.download = result.convertedName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleDownloadAll = useCallback(() => {
    const successResults = results.filter((r) => r.status === 'success');
    successResults.forEach((result) => {
      setTimeout(() => handleDownload(result), 100);
    });
  }, [results, handleDownload]);

  const handleClear = useCallback(() => {
    // URL 메모리 해제
    results.forEach((result) => {
      if (result.downloadUrl) {
        URL.revokeObjectURL(result.downloadUrl);
      }
    });
    setResults([]);
  }, [results]);

  return (
    <div className="space-y-6">
      {/* 툴 설명 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          JPEG → PNG 변환기
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          JPEG/JPG 이미지를 PNG 포맷으로 빠르게 변환합니다. 모든 변환은 브라우저에서만 처리되며,
          파일이 서버로 업로드되지 않습니다.
        </p>
      </div>

      {/* 파일 선택 영역 */}
      <FileDropZone
        onFilesSelected={handleFilesSelected}
        accept="image/jpeg,image/jpg"
        multiple={true}
        description="JPEG/JPG 이미지를 드래그하거나 클릭하여 선택하세요"
      />

      {/* 처리 중 표시 */}
      {isProcessing && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">변환 중...</p>
        </div>
      )}

      {/* 변환 결과 리스트 */}
      <ConvertResultList
        results={results}
        onDownload={handleDownload}
        onDownloadAll={handleDownloadAll}
        onClear={handleClear}
      />

      {/* FAQ / 설명 섹션 */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          JPEG와 PNG의 차이점
        </h3>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <div>
            <h4 className="font-semibold">JPEG (JPG)</h4>
            <p className="text-sm">
              손실 압축 방식으로 파일 크기가 작습니다. 사진에 적합하지만 투명 배경을 지원하지 않습니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">PNG</h4>
            <p className="text-sm">
              무손실 압축 방식으로 고품질을 유지합니다. 투명 배경을 지원하며 로고, 아이콘 등에 적합합니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">언제 PNG를 사용해야 하나요?</h4>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>투명 배경이 필요한 경우</li>
              <li>텍스트나 선명한 경계선이 있는 이미지</li>
              <li>이미지 품질이 중요한 경우</li>
              <li>추가 편집이 필요한 경우</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

