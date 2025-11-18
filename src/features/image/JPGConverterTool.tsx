/**
 * JPG 변환 툴들
 */

import { RasterImageTool } from './RasterImageTool';

/**
 * JPG → PNG/WEBP/AVIF 변환 툴
 */
export const JPGConverterTool: React.FC = () => {
  return (
    <RasterImageTool
      sourceFormats={['jpg']}
      targetFormats={['png', 'webp', 'avif']}
      title="JPG → PNG / WEBP / AVIF 변환기"
      description="JPG/JPEG 이미지를 PNG, WebP, AVIF 포맷으로 변환합니다. 모든 변환은 브라우저에서만 처리되며, 파일이 서버로 업로드되지 않습니다."
    />
  );
};

