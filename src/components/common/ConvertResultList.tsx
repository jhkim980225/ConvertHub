import { formatFileSize } from '@/lib/imageConverter';

export interface ConvertResult {
  id: string;
  originalName: string;
  convertedName: string;
  originalSize: number;
  convertedSize: number;
  downloadUrl: string;
  status: 'processing' | 'success' | 'error';
  error?: string;
}

interface ConvertResultListProps {
  results: ConvertResult[];
  onDownload: (result: ConvertResult) => void;
  onDownloadAll?: () => void;
  onClear?: () => void;
}

/**
 * 변환 결과 리스트 컴포넌트
 */
export const ConvertResultList: React.FC<ConvertResultListProps> = ({
  results,
  onDownload,
  onDownloadAll,
  onClear,
}) => {
  if (results.length === 0) {
    return null;
  }

  const successResults = results.filter(r => r.status === 'success');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          변환 결과 ({successResults.length}/{results.length})
        </h3>
        <div className="space-x-2">
          {onDownloadAll && successResults.length > 1 && (
            <button
              onClick={onDownloadAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              모두 다운로드
            </button>
          )}
          {onClear && (
            <button
              onClick={onClear}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              초기화
            </button>
          )}
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
                {result.originalName}
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
                onClick={() => onDownload(result)}
                className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                다운로드
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

