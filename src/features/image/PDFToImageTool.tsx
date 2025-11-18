/**
 * PDF를 이미지로 변환하는 툴
 */

import { GenericImageConverter } from '@/components/image/GenericImageConverter';

/**
 * PDF → 이미지 변환 툴
 */
export const PDFToImageTool: React.FC = () => {
  const infoContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        PDF 변환 안내
      </h3>
      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <div>
          <h4 className="font-semibold">다중 페이지 처리</h4>
          <p className="text-sm">
            PDF의 각 페이지가 개별 이미지 파일로 변환됩니다. 파일명에 페이지 번호가 자동으로 추가됩니다.
            예: document.pdf → document_page-1.jpg, document_page-2.jpg
          </p>
        </div>
        <div>
          <h4 className="font-semibold">다운로드 옵션</h4>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><strong>개별 다운로드</strong>: 각 페이지를 하나씩 다운로드</li>
            <li><strong>모두 다운로드</strong>: 모든 페이지를 순차적으로 다운로드</li>
            <li><strong>ZIP 다운로드</strong>: 모든 페이지를 하나의 ZIP 파일로 다운로드</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">변환 품질</h4>
          <p className="text-sm">
            각 페이지는 2배 스케일로 렌더링되어 고품질 이미지로 변환됩니다.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">추천 포맷</h4>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><strong>JPG</strong>: 일반 문서, 작은 파일 크기</li>
            <li><strong>PNG</strong>: 텍스트나 도표가 많은 문서, 고품질</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <GenericImageConverter
      title="PDF → 이미지 변환기"
      description="PDF 문서의 각 페이지를 JPG 또는 PNG 이미지로 변환합니다. 다중 페이지 PDF도 지원합니다."
      sourceFormats={['pdf']}
      targetFormats={['jpg', 'png']}
      acceptTypes="application/pdf,.pdf"
      infoContent={infoContent}
    />
  );
};

