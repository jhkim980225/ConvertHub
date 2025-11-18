/**
 * 래스터 이미지 변환 툴 (JPG, PNG, WEBP, AVIF)
 */

import { GenericImageConverter } from '@/components/image/GenericImageConverter';
import { ImageFormatKey } from '@/types/conversion';

interface RasterImageToolProps {
  sourceFormats: ImageFormatKey[];
  targetFormats: ImageFormatKey[];
  title: string;
  description: string;
}

/**
 * 래스터 이미지 변환 툴
 */
export const RasterImageTool: React.FC<RasterImageToolProps> = ({
  sourceFormats,
  targetFormats,
  title,
  description,
}) => {
  // MIME 타입 생성
  const acceptTypes = sourceFormats
    .map(format => {
      switch (format) {
        case 'jpg': return 'image/jpeg';
        case 'png': return 'image/png';
        case 'webp': return 'image/webp';
        case 'avif': return 'image/avif';
        default: return '';
      }
    })
    .filter(Boolean)
    .join(',');

  const infoContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        포맷 특징
      </h3>
      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        {sourceFormats.includes('jpg') && (
          <div>
            <h4 className="font-semibold">JPEG (JPG)</h4>
            <p className="text-sm">
              손실 압축 방식으로 파일 크기가 작습니다. 사진에 적합하지만 투명 배경을 지원하지 않습니다.
            </p>
          </div>
        )}
        {sourceFormats.includes('png') && (
          <div>
            <h4 className="font-semibold">PNG</h4>
            <p className="text-sm">
              무손실 압축 방식으로 고품질을 유지합니다. 투명 배경을 지원하며 로고, 아이콘 등에 적합합니다.
            </p>
          </div>
        )}
        {targetFormats.includes('webp') && (
          <div>
            <h4 className="font-semibold">WebP</h4>
            <p className="text-sm">
              구글이 개발한 차세대 이미지 포맷으로 JPEG보다 작은 크기에 더 좋은 품질을 제공합니다. 투명도도 지원합니다.
            </p>
          </div>
        )}
        {targetFormats.includes('avif') && (
          <div>
            <h4 className="font-semibold">AVIF</h4>
            <p className="text-sm">
              최신 이미지 포맷으로 WebP보다 더 효율적인 압축을 제공합니다. 일부 구형 브라우저에서는 지원되지 않을 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <GenericImageConverter
      title={title}
      description={description}
      sourceFormats={sourceFormats}
      targetFormats={targetFormats}
      acceptTypes={acceptTypes}
      infoContent={infoContent}
    />
  );
};

