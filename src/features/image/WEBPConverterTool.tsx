/**
 * WebP 변환 툴
 */

import { RasterImageTool } from './RasterImageTool';

/**
 * WEBP → JPG/PNG/AVIF 변환 툴
 */
export const WEBPConverterTool: React.FC = () => {
  return (
    <RasterImageTool
      sourceFormats={['webp']}
      targetFormats={['jpg', 'png', 'avif']}
      title="WEBP → JPG / PNG / AVIF 변환기"
      description="WebP 이미지를 JPG, PNG, AVIF 포맷으로 변환합니다. 다양한 브라우저와 플랫폼 호환성을 위해 변환할 수 있습니다."
    />
  );
};

