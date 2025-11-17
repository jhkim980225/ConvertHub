/**
 * 이미지 파일을 HTMLImageElement로 로드
 */
export const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('이미지 로딩 실패'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsDataURL(file);
  });
};

/**
 * 이미지를 특정 포맷으로 변환
 */
export const convertImageFormat = async (
  file: File,
  targetFormat: 'image/png' | 'image/jpeg' | 'image/webp',
  quality: number = 0.92
): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      const img = await loadImage(file);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas context를 가져올 수 없습니다');
      }
      
      // 투명 배경 처리 (JPEG는 투명 배경 지원 안함)
      if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('이미지 변환 실패'));
          }
        },
        targetFormat,
        quality
      );
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Blob을 다운로드 가능한 URL로 변환
 */
export const createDownloadUrl = (blob: Blob): string => {
  return URL.createObjectURL(blob);
};

/**
 * 파일명의 확장자를 변경
 */
export const changeFileExtension = (filename: string, newExtension: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  const nameWithoutExt = lastDotIndex > 0 ? filename.substring(0, lastDotIndex) : filename;
  return `${nameWithoutExt}.${newExtension}`;
};

/**
 * 파일 크기를 읽기 쉬운 형식으로 변환
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

