# vlab-kaist.github.io

Vlab 동아리 웹사이트. <https://vlab-kaist.github.io>

SvelteKit 2 + Svelte 5 로 만든 정적 사이트입니다. 한국어(`/`)와 영어(`/en/`)를 제공합니다.

---

## 빠르게 시작하기

```bash
npm install
npm run dev        # http://localhost:5173
```

Node 20 이상이 필요합니다.

## 명령어

| 명령                  | 설명                                                                |
| --------------------- | ------------------------------------------------------------------- |
| `npm run dev`         | 개발 서버                                                           |
| `npm run build`       | `build/` 에 정적 사이트 생성                                        |
| `npm run preview`     | 빌드 결과 미리보기                                                  |
| `npm run images`      | `images.source/` 에서 `static/img/` 의 모든 이미지·아이콘·OG 재생성 |
| `npm run og`          | 공유 카드(`static/og.png`)만 재생성 — 문구만 바꿀 때                |
| `npm run check`       | 타입 검사                                                           |
| `npm run check:links` | 빌드 결과에 깨진 내부 링크가 없는지 확인                            |
| `npm run lint`        | 포맷 검사                                                           |
| `npm run format`      | 포맷 적용                                                           |

## 배포

`main` 에 push 하면 `.github/workflows/deploy.yml` 이 빌드해서 GitHub Pages 에 올립니다.
사람 손으로 배포하는 단계는 없습니다.

> **최초 1회, 저장소 관리자가 해야 합니다:**
> Settings → Pages → Build and deployment → Source 를 **"GitHub Actions"** 로 바꿔주세요.
> 이걸 하지 않으면 워크플로는 통과하지만 사이트에는 아무것도 반영되지 않습니다.

## 글·문구 고치기

사이트의 모든 문장은 두 파일에 있습니다. 컴포넌트를 건드릴 필요가 없습니다.

- `src/lib/i18n/ko.ts` — 한국어 (기준)
- `src/lib/i18n/en.ts` — 영어

두 파일은 같은 타입(`types.ts`의 `Dict`)을 따릅니다. 한쪽에만 키를 추가하면 **빌드가 실패합니다.**
번역이 조용히 어긋나는 것을 막기 위한 장치입니다.

연혁·프로젝트 목록도 이 파일 안에 있습니다 (`history.entries`, `projects.items`).

## 사진 추가하기

1. 원본을 `images.source/` 에 넣습니다 (긴 변 2400px 정도의 jpg 권장).
2. `scripts/build-images.js` 의 `IMAGES` 에 항목을 추가합니다.
3. `npm run images` 를 실행합니다.
4. `<Picture name="새이름" alt="..." sizes="..." />` 로 씁니다.

`static/img/` 와 `src/lib/data/images.ts` 는 **자동 생성물**입니다. 직접 고치지 마세요.

## 공유 카드 (OG 이미지)

`static/og.png` 는 `scripts/build-images.js` 안의 SVG에서 나옵니다. 문구(동아리 이름, 기록 숫자)만
고칠 때는 그 SVG를 고치고 `npm run og` 를 돌리세요 — `npm run images` 는 `static/img/` 의 93개
파일을 전부 다시 씁니다.

> **Pretendard 가 시스템 폰트로 깔려 있어야 합니다.** `static/fonts/` 의 것은 woff2 서브셋 92개라
> fontconfig 이 못 씁니다. 없으면 **조용히** 다른 폰트로 렌더됩니다.
> `fc-list | grep -i pretendard` 로 먼저 확인하세요.
> 지워도 `npm run images` 로 되살아납니다.

## 구조

```
src/
  app.html              문서 셸. <html lang> 은 hooks.server.ts 가 채웁니다.
  hooks.server.ts       페이지별 lang 속성 주입
  lib/
    components/         Header, Footer, Sponsors, PageHead, LifeGrid, Picture, Logo, Seo
    data/images.ts      자동 생성 — 이미지 크기 정보
    i18n/               ko.ts, en.ts, types.ts  ← 문구는 전부 여기
    styles/
      tokens.css        색·타이포·간격 토큰. 하드코딩 대신 여기에 추가하세요.
      base.css          리셋과 전역 스타일, .reveal 스크롤 애니메이션
  params/lang.ts        [[lang]] 매처
  routes/
    [[lang=lang]]/      / 와 /en/ 이 같은 컴포넌트를 씁니다
      +page.svelte      홈 — 히어로, 기록, 섹션 목록
      teams/            팀
      projects/         프로젝트
      life/             생활
      history/          연혁
      join/             함께하기
    sitemap.xml/        경로를 추가하면 여기 paths 배열도 같이 고치세요
static/
  fonts/                Pretendard 자체 호스팅 (OFL)
  img/                  자동 생성
images.source/          이미지 원본 (커밋됨)
scripts/                build-images.js, check-links.js
```

## 알아둘 것

- **탭마다 별도 페이지입니다.** 처음에는 한 페이지에 전부 넣고 헤더가 앵커로 스크롤시키는
  구조였는데, 페이지가 너무 길다는 피드백을 받아 라우트를 나눴습니다. 문구는 그대로
  `i18n/` 에서 오고, 페이지는 그걸 어떻게 배치할지만 정합니다. 섹션을 추가하려면 라우트
  하나, `Header.svelte` 의 `sections` 배열, `sitemap.xml` 의 `paths` 배열 세 군데를
  고치면 됩니다.
- **테마는 라이트와 다크 둘 다입니다.** 기본값은 시스템 설정을 따르고, 헤더의 토글로 덮어쓰면
  `localStorage` 에 남습니다. 두 팔레트 모두 `tokens.css` 에만 있습니다 — 다크는 파일 끝의
  `:root[data-theme='dark']` 블록입니다. 다크는 라이트를 뒤집은 게 아니라 따로 고른 값입니다
  (종이 위에서 '그은 선'처럼 보이던 얇은 테두리가 검정 위에서는 긁힌 자국이 되기 때문입니다).
  첫 페인트 전에 테마를 정하는 인라인 스크립트가 `app.html` 에 있고, 같은 규칙이
  `src/lib/theme.svelte.ts` 에도 있습니다 — **둘은 같이 고쳐야 합니다.**

- **배경에 액체 레이어가 깔려 있습니다.** `Liquid.svelte` — 크게 블러 처리한 브랜드색 덩어리
  네 개가 아주 느리게 움직이고, 겹치는 곳에서 섞입니다. `position: fixed; z-index: -1` 이라
  본문 상자들 뒤에 깔립니다. 카드가 반투명(`.glass`)인 것과 한 세트입니다 — 깊이는 배경이
  아니라 그 위를 무엇이 덮느냐에서 나옵니다. 움직임은 `transform` 만 건드리고,
  `prefers-reduced-motion` 이면 멈춥니다.

- **카드는 `.glass` 입니다.** `base.css` 에 있고, 반투명·블러·윗변 하이라이트가 한 묶음입니다.
  `backdrop-filter` 를 지원하지 않으면 예전처럼 불투명한 `--surface` 로 떨어집니다 — 블러 없는
  반투명은 그냥 안 읽히는 카드라서, 흐릿하게 반쯤 적용되느니 통째로 빠지는 편이 낫습니다.
- **스크롤 리빌은 CSS만 씁니다.** `.reveal` 클래스 하나이고 `animation-timeline: view()` 로 돕니다.
  기본값이 "보임" 이라서 JS가 죽든, 뷰 타임라인 미지원이든, `prefers-reduced-motion` 이든
  전부 그냥 보이는 쪽으로 떨어집니다.
- **디자인 토큰을 쓰세요.** `tokens.css` 에 없는 색이나 여백이 필요하면, 컴포넌트에 하드코딩하지 말고
  토큰을 추가하세요. 예전 사이트는 `style="font-size: 30px"` 를 카드마다 복사해 붙여 썼습니다.
- **폰트는 자체 호스팅입니다.** 예전에는 제3자 CDN에서 불러왔는데, Sass 설정 문제로 4년간
  실제로는 한 번도 로드되지 않았습니다. 지금은 `static/fonts/` 에 있습니다.
- **`npm run check:links` 가 CI에서 돕니다.** 예전 리크루팅 포스터(`poster_22f.png`)는 커밋된 적이
  없어서 2023년 2월부터 계속 404였고, 아무도 몰랐습니다. 이제는 빌드가 막습니다.
- **아직 채워야 할 내용이 있습니다.** [CONTENT-TODO.md](./CONTENT-TODO.md) 를 보세요.
  사이트에 빨간 `TODO(owner)` 배지로 보이는 것들이 그것입니다.

## 라이선스

코드는 MIT ([LICENSE](./LICENSE)). 사진과 동아리 로고는 제외입니다.
