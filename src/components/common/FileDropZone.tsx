import { useState, useCallback, DragEvent, ChangeEvent } from 'react';

interface FileDropZoneProps {
  /**
   * 파일 선택 시 콜백
   */
  onFilesSelected: (files: File[]) => void;
  /**
   * 허용 파일 타입 (예: "image/jpeg,image/png")
   */
  accept?: string;
  /**
   * 다중 파일 선택 허용 여부
   */
  multiple?: boolean;
  /**
   * 설명 텍스트
   */
  description?: string;
}

/**
 * 파일 드래그&드롭 및 선택 컴포넌트
 */
export const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFilesSelected,
  accept = '*',
  multiple = true,
  description = '파일을 드래그하거나 클릭하여 선택하세요',
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  const handleFileInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
    // 같은 파일을 다시 선택할 수 있도록 value 초기화
    e.target.value = '';
  }, [onFilesSelected]);

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        transition-colors duration-200
        ${isDragging 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }
      `}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
      />
      
      <div className="space-y-2">
        <div className="text-5xl">📁</div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {multiple ? '여러 파일 선택 가능' : '단일 파일만 선택 가능'}
        </p>
      </div>
    </div>
  );
};

