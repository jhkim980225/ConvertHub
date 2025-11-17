/**
 * 페이지 타이틀 설정
 */
export const setPageTitle = (title: string) => {
  document.title = `${title} | ConvertHub`;
};

/**
 * 메타 태그 설정
 */
export const setMetaDescription = (description: string) => {
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
};

/**
 * 페이지 SEO 정보 설정
 */
export const setPageSEO = (title: string, description: string) => {
  setPageTitle(title);
  setMetaDescription(description);
};

