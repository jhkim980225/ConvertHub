/**
 * AVIF 변환 툴
 */

import { RasterImageTool } from './RasterImageTool';

/**
 * AVIF → JPG/PNG/WEBP 변환 툴
 */
export const AVIFConverterTool: React.FC = () => {
  return (
    <RasterImageTool
      sourceFormats={['avif']}
      targetFormats={['jpg', 'png', 'webp']}
      title="AVIF → JPG / PNG / WEBP 변환기"
      description="AVIF 이미지를 JPG, PNG, WebP 포맷으로 변환합니다. AVIF를 지원하지 않는 환경에서 사용하기 위해 변환할 수 있습니다."
    />
  );
};

