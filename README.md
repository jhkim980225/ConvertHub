# ConvertHub

다양한 인코딩, 변환, 유틸리티 도구를 무료로 제공하는 온라인 툴 모음 웹 포털입니다.

## 주요 기능

- 🖼️ **이미지 변환**: JPEG to PNG 등 다양한 이미지 포맷 변환
- 📝 **텍스트 인코딩**: Base64, URL 인코딩 등 (추가 예정)
- ⚙️ **개발자 도구**: JWT 디코딩, JSON 포맷팅 등 (추가 예정)
- 🔧 **유틸리티**: 타임스탬프 변환 등 (추가 예정)

## 특징

- ✅ 100% 클라이언트 사이드 처리 - 파일이 서버로 전송되지 않아 안전함
- ✅ 빠른 변환 속도
- ✅ 무료 사용, 제한 없음
- ✅ 반응형 디자인
- ✅ 다크 모드 지원

## 기술 스택

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS

## 프로젝트 구조

```
src/
├── main.tsx              # 엔트리 포인트
├── App.tsx               # 루트 컴포넌트
├── router/
│   └── routes.tsx        # 라우팅 설정
├── layout/
│   └── MainLayout.tsx    # 공통 레이아웃
├── components/common/
│   ├── AdSlot.tsx        # 광고 슬롯
│   ├── FileDropZone.tsx  # 파일 드래그&드롭
│   └── ConvertResultList.tsx # 변환 결과 리스트
├── features/
│   └── image/
│       └── JpegToPngTool.tsx # JPEG to PNG 툴
├── pages/
│   ├── HomePage.tsx      # 홈페이지
│   ├── CategoryPage.tsx  # 카테고리 페이지
│   └── ToolPage.tsx      # 툴 페이지
├── data/
│   ├── categories.ts     # 카테고리 메타데이터
│   └── tools.ts          # 툴 메타데이터
├── lib/
│   ├── imageConverter.ts # 이미지 변환 유틸
│   └── seo.ts            # SEO 유틸
└── types/
    └── tool.ts           # 타입 정의
```

## 개발 시작하기

### 사전 요구사항

- Node.js 18+ 설치

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 열기

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 새로운 툴 추가하기

1. **툴 컴포넌트 생성**: `src/features/[category]/[ToolName]Tool.tsx` 파일 생성
2. **메타데이터 추가**: `src/data/tools.ts`에 툴 정보 추가

```typescript
{
  id: 'new-tool',
  path: '/category/new-tool',
  category: 'category',
  name: '새 툴 이름',
  description: '툴 설명',
  keywords: ['키워드1', '키워드2'],
  component: NewTool,
}
```

3. 자동으로 라우팅, 사이드바, 홈페이지에 표시됩니다!

## 라이선스

MIT

## 기여

이슈와 PR을 환영합니다!

