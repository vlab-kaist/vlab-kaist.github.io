# vlab-kaist.github.io

VLAB 동아리 웹사이트. <https://vlab-kaist.github.io>

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
지워도 `npm run images` 로 되살아납니다.

## 구조

```
src/
  app.html              문서 셸. <html lang> 은 hooks.server.ts 가 채웁니다.
  hooks.server.ts       페이지별 lang 속성 주입
  lib/
    components/         Header, Footer, Picture, Logo, Seo
    data/images.ts      자동 생성 — 이미지 크기 정보
    i18n/               ko.ts, en.ts, types.ts  ← 문구는 전부 여기
    styles/
      tokens.css        색·타이포·간격 토큰. 하드코딩 대신 여기에 추가하세요.
      base.css          리셋과 전역 스타일
    theme.svelte.ts     라이트/다크 상태
  params/lang.ts        [[lang]] 매처
  routes/
    [[lang=lang]]/      / 와 /en/ 이 같은 컴포넌트를 씁니다
    sitemap.xml/
static/
  fonts/                Pretendard 자체 호스팅 (OFL)
  img/                  자동 생성
images.source/          이미지 원본 (커밋됨)
scripts/                build-images.js, check-links.js
```

## 알아둘 것

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
