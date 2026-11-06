import type { Dict } from './types';

/*
 * Korean copy — the source of truth. en.ts mirrors this shape.
 *
 * Team ordering: 인공지능 first, 과학퀴즈 second, everywhere the two are named
 * together (meta, hero, teams, join, footer). The club asked for it. If you add
 * copy that names both, follow it.
 *
 * The 카포전 record below came from the club directly (2023–2025) and, for
 * 2026, from the broadcast itself: the AI stream ends on a "2 : 0" card and
 * the quiz stream on "280 : 210". Both match the press (한국경제, 2026-09-20).
 * 2022 is still the old site's claim — see CONTENT-TODO.md.
 *
 * Voice: 개조식. The club asked for it after reading the earlier 습니다체
 * draft, where every line ended "…나옵니다 / …합니다" and the page read like
 * a press release. So: short lines that end on a noun or a 명사형 (-음/-함),
 * the club's own words where they exist (수물화생정, 기출), and no filler
 * pronouns — "그걸로 공부." was the example of what not to do, a sentence
 * chopped off rather than written short.
 *
 * Kept in full sentences on purpose: the hero headline (a slogan), the
 * sponsor block (it addresses companies), and the "모집 기간이 아닙니다"
 * notice (the club's own wording).
 *
 * Checked against daleseo/korean-skills `humanizer`: no comma runs, no
 * three-beat lists where two or four would do, no ~적 chains.
 */
export const ko: Dict = {
	meta: {
		title: 'Vlab: KAIST 인공지능 · 과학퀴즈 학술동아리',
		description:
			'KAIST 인공지능·과학퀴즈 학술동아리 Vlab. 카포전 AI 종목과 과학퀴즈 출전. 2026년 AI 종목 2:0, 과학퀴즈 280:210으로 두 종목 모두 승리.',
		ogAlt: 'Vlab: 카포전을 이기는 동아리'
	},
	nav: {
		teams: '팀',
		projects: '프로젝트',
		life: '생활',
		history: '연혁',
		join: '함께하기',
		skipToContent: '본문 바로가기',
		menu: '메뉴 열기',
		close: '메뉴 닫기',
		language: '언어',
		themeToLight: '밝은 테마로 바꾸기',
		themeToDark: '어두운 테마로 바꾸기'
	},
	hero: {
		badge: '신입 부원 모집 중',
		badgeClosed: '신입 부원 모집',
		title: '카포전을',
		titleAccent: '이깁니다.',
		// The \n is a deliberate line break (the lead is `white-space: pre-line`):
		// identity on one line, facts on the next. Left to wrap on its own,
		// the break landed between "2022년" and "창설".
		lead: '카포전 AI 종목과 과학퀴즈에 나가는 KAIST 학술동아리.\n2022년 창설, 현재 부원 29명.\n2026년엔 두 종목 모두 승리.',
		ctaPrimary: '함께하기',
		ctaSecondary: '프로젝트 보기',
		imageAlt:
			'2026 카포전이 끝난 뒤 학생대제전 무대 앞에서 파란 티셔츠를 맞춰 입고 주먹을 쥐며 환호하는 Vlab 부원들',
		photoSlot: '2026 단체 사진 들어갈 자리'
	},
	kapo: {
		heading: '2026 카포전',
		when: '9월 18–19일, 포항 POSTECH. 출전한 두 종목 모두 승리.',
		us: 'KAIST',
		them: 'POSTECH',
		won: '승',
		lost: '패',
		watch: '중계 다시보기',
		credit: '사진: 중계 화면 (POSTECH 방송국 PBS, KAIST 방송국 VOK)',
		matches: [
			{
				id: 'ai',
				event: 'AI 종목',
				score: [2, 0],
				format: '마리오카트 Wii, 3판 2선승',
				body: '직접 짜고 학습시킨 AI가 사람 손 없이 카트를 운전. 1·2라운드를 연달아 따내서 3라운드 없이 경기 종료.',
				image: 'kapo-2026-ai',
				imageAlt:
					'2026 카포전 AI 종목 중계 화면. 마리오카트 Wii 화면 네 개가 나뉘어 있고, 양교 AI가 각자 카트를 몰고 있다.',
				video: 'https://www.youtube.com/watch?v=EzsDPWexwCY'
			},
			{
				id: 'quiz',
				event: '과학퀴즈',
				score: [280, 210],
				format: '퀴즈 + 가위바위보 체스',
				body: '문제를 맞힌 팀이 체스판 위 말을 움직이는 방식.',
				image: 'kapo-2026-quiz',
				imageAlt:
					'2026 카포전 과학퀴즈 무대. 가운데 전광판에 KAIST 280, POSTECH 210 최종 점수가 떠 있고 양쪽에 두 학교 팀이 앉아 있다.',
				video: 'https://www.youtube.com/watch?v=RiqVfV2Fxsk'
			}
		],
		record: {
			heading: '역대 전적',
			event: '종목',
			overall: '통산',
			ai: 'AI 종목',
			quiz: '과학퀴즈',
			total: '{w}승 {l}패',
			years: [
				{ year: 2026, ai: 'win', quiz: 'win' },
				{ year: 2025, ai: 'win', quiz: 'loss' },
				{ year: 2024, ai: 'loss', quiz: 'win' },
				{ year: 2023, ai: 'loss', quiz: 'win' },
				{ year: 2022, ai: 'win', quiz: 'win' }
			]
		}
	},
	teams: {
		heading: '인공지능팀과 과학퀴즈팀',
		lead: '두 팀이 하는 일은 거의 안 겹침. 인공지능팀은 매주 코드, 과학퀴즈팀은 매주 문제 풀이.',
		quiz: {
			name: '과학퀴즈팀',
			tagline: '범위 없는 시험을 매주 준비하는 팀',
			body: '수물화생정 전 과목 출제, 범위 제한 없음. 교재는 부원들이 기출을 모아 직접 정리한 노트.',
			points: [
				'매주 기출·예상 문제 풀이',
				'정리한 기출과 개념은 위키에 누적',
				'실전과 같은 형식의 모의고사'
			],
			imageAlt: '2026 카포전 과학퀴즈 무대. 전광판에 KAIST 280, POSTECH 210 최종 점수가 떠 있다.'
		},
		ai: {
			name: '인공지능팀',
			tagline: '게임을 이기는 프로그램을 직접 만드는 팀',
			body: 'AI 종목 과제는 해마다 다름. 보드게임이던 해도, 로켓리그였던 해도 있었고 2026년엔 마리오카트. 방법도 게임에 맞춰 강화학습이든 휴리스틱이든 그때그때 선택.',
			points: [
				'과제가 나오면 에이전트를 새로 설계하고, 학습용 시뮬레이터까지 직접 제작',
				'CS101만 들었으면 따라올 수 있는 세미나 운영'
			],
			imageAlt:
				'2026 카포전 AI 종목 중계 화면. 마리오카트 Wii 화면 네 개에서 양교 AI가 카트를 몰고 있다.'
		}
	},
	projects: {
		heading: '만드는 것들',
		lead: '만든 건 대부분 GitHub에 공개.',
		viewRepo: '저장소 보기',
		items: [
			{
				id: 'flex',
				name: 'Flex',
				tagline: '2025 카포전을 3:0으로 이긴 로켓리그 에이전트',
				body: '셀프플레이 모델 100개 이상을 상대로 인게임 200년 넘게 강화학습. 마무리는 행동 복제(BC)와 파인튜닝. 2025 카포전 AI 종목 3:0 승리, RLBot Championship 2025 ML 부문 결승 진출.',
				tags: ['강화학습', 'Self-play', 'Python'],
				image: 'rocketleague',
				imageAlt:
					'2025 카포전 AI 종목 로켓리그 경기 화면. Flex가 POSTECH을 상대로 1:0으로 앞서고 있다.',
				featured: true
			},
			{
				// No repo link: the code is private. No project name either — the
				// club calls it what it is.
				id: 'mariokart',
				name: '마리오카트 AI',
				tagline: '2026 카포전을 2:0으로 이긴 에이전트',
				body: '마리오카트 Wii를 사람 손 없이 운전하는 AI. 2026 카포전 AI 종목에서 1·2라운드를 연달아 따내 POSTECH에 2:0 승리.',
				tags: ['게임 AI', '마리오카트 Wii']
			},
			{
				id: 'rocketsim',
				name: 'RocketSim · pyvrsim',
				tagline: '학습용 고속 로켓리그 시뮬레이터',
				body: '에이전트를 학습시키려면 게임을 아주 빠르게 돌려야 함. 그래서 C++ 시뮬레이터와, 그 병렬성을 그대로 살린 파이썬 바인딩을 직접 제작.',
				tags: ['C++', 'Python 바인딩', '시뮬레이션'],
				repo: 'https://github.com/vlab-kaist/RocketSim'
			},
			{
				id: 'neopjuki',
				name: 'Neopjuki',
				tagline: 'Puoribor 에이전트',
				body: '2022–2023년 AI 종목 과제였던 보드게임 Puoribor용 에이전트. 탐색에 신경망을 결합.',
				tags: ['탐색', '신경망', 'Python'],
				repo: 'https://github.com/vlab-kaist/Neopjuki-v2'
			},
			{
				id: 'melee',
				name: 'Melee-PPO',
				tagline: '대전 격투 게임 강화학습',
				body: 'PPO로 실시간 대전 게임을 학습시켜 본 실험. 순간 반응과 긴 호흡의 전략이 한꺼번에 필요해서 정책 학습이 까다로운 환경.',
				tags: ['PPO', '강화학습'],
				repo: 'https://github.com/vlab-kaist/Melee-PPO'
			},
			{
				id: 'nn101',
				name: 'NN101',
				tagline: '신입 부원용 딥러닝 입문 과정',
				body: '회귀부터 분류, MLP, CNN, RNN, Transformer까지. 자료와 과제는 매주 공개하고 강의도 병행. 2026년 1월 AI Winter Camp로 확장.',
				tags: ['교육', '커리큘럼'],
				repo: 'https://github.com/vlab-kaist/NN101_23S'
			},
			{
				id: 'vlms',
				name: 'VLMS',
				tagline: '학습 자료 아카이브',
				body: '세미나 자료와 개념 정리를 한곳에 모아 공개하는 저장소.',
				tags: ['아카이브', '위키'],
				repo: 'https://github.com/vlab-kaist/VLMS'
			}
		]
	},
	history: {
		heading: '연혁',
		lead: '2022년부터 지금까지.',
		entries: [
			{
				date: '2026.09',
				title: '2026 카포전: AI 종목 · 과학퀴즈 모두 승리',
				body: 'AI 종목(마리오카트 Wii) 2:0, 과학퀴즈 280:210. 2023~2025년엔 매년 한 종목씩만 이겼고, 올해는 두 종목 모두.',
				highlight: true
			},
			{
				date: '2026.01',
				title: 'AI Winter Camp 개최',
				body: '6주 과정. 회귀부터 Transformer까지.',
				highlight: true
			},
			{
				date: '2025.09',
				title: '2025 카포전: AI 종목 승리',
				body: 'AI 종목은 POSTECH 상대 3:0 승. 과학퀴즈는 패배.',
				highlight: true
			},
			{
				date: '2025',
				title: 'Flex, RLBot Championship ML 결승 진출',
				body: '동아리에서 만든 로켓리그 에이전트가 국제 대회 머신러닝 부문 결승까지 진출.'
			},
			{
				date: '2024.09',
				title: '2024 카포전: 과학퀴즈 승리',
				body: '과학퀴즈 승, AI 종목 패.'
			},
			{
				date: '2023.09',
				title: '2023 카포전: 과학퀴즈 승리',
				body: '과학퀴즈 승, AI 종목 패.'
			},
			{ date: '2022.09', title: '2022 카포전 과학퀴즈 · AI 종목 우승', highlight: true },
			{ date: '2022.04', title: 'Vlab 설립' }
		]
	},
	life: {
		heading: '카포전 말고도',
		lead: '제일 긴 건 동아리방에 모여 있는 시간. 나머지는 대개 같이 놀러 다니는 시간.',
		captions: [
			{
				title: '카포전 연습',
				alt: '동아리방에서 노트북과 화이트보드를 두고 카포전을 준비하는 Vlab 부원들'
			},
			{
				title: '학생문화제',
				alt: 'KAIST 학생문화제에서 Vlab 부스 앞에 모여 사진을 찍는 부원들'
			},
			{
				title: '딸기 파티',
				alt: '벚꽃이 핀 봄 캠퍼스 잔디밭에서 딸기를 나눠 먹는 Vlab 부원들'
			},
			{
				title: '회식',
				alt: '밤에 다 같이 모여 고기를 구워 먹는 Vlab 회식'
			},
			{
				title: '봄 소풍',
				alt: 'KAIST 캠퍼스 잔디밭에서 돗자리를 펴고 다 함께 모인 Vlab 부원들'
			}
		]
	},
	join: {
		// The one page in 존댓말 rather than 개조식: it is the page that talks
		// to a person deciding whether to join. The club's own wording.
		heading: '함께할 사람을 찾습니다',
		lead: '한 문제를 오래 붙잡고 있어도 괜찮은 사람이면 환영합니다!',
		body: '전공 무관. 인공지능팀은 CS101 정도면 시작 가능합니다! 과학퀴즈팀은 과학을 좋아하면 충분합니다! 나머지는 들어와서 배우세요! 궁금한 점은 메일로 문의 바랍니다.',
		cta: '지원하기',
		ctaNote: '구글 폼으로 이동합니다.',
		ctaHref: 'https://forms.gle/AAHfwuAT4VVEYmBG6',
		closed: '지금은 모집 기간이 아닙니다',
		closedNote: '모집이 열리면 이 버튼으로 바로 지원할 수 있습니다.',
		imageAlt:
			'2026 카포전 시상 후 학생대제전 무대 앞에서 상을 들고 파란 티셔츠를 맞춰 입고 환호하는 Vlab 부원들',
		photoSlot: '2026 시상 사진 들어갈 자리',
		channels: [
			{
				label: '이메일',
				value: 'kaist.victorylab@gmail.com',
				href: 'mailto:kaist.victorylab@gmail.com'
			},
			{ label: 'GitHub', value: 'vlab-kaist', href: 'https://github.com/vlab-kaist' },
			{
				label: 'Instagram',
				value: '@vlab.kaist',
				href: 'https://www.instagram.com/vlab.kaist/'
			}
		]
	},
	sponsors: {
		heading: '후원',
		contact: {
			heading: '후원에 관심이 있으신가요?',
			body: 'Vlab 후원을 원하는 기업의 연락을 기다립니다.',
			label: '후원 문의하기',
			href: 'mailto:kaist.victorylab@gmail.com?subject=Vlab%20%ED%9B%84%EC%9B%90%20%EB%AC%B8%EC%9D%98'
		},
		items: [
			{
				name: '엘리스',
				logo: 'elice.png',
				href: 'https://elice.io/'
			},
			{
				name: 'KAIST 전산학부',
				logo: 'kaist-cs.png',
				logoDark: 'kaist-cs-reverse.png',
				href: 'https://cs.kaist.ac.kr/'
			},
			{
				name: 'Jane Street',
				logo: 'jane-street.png',
				logoDark: 'jane-street-blue.png',
				height: 56,
				href: 'https://www.janestreet.com/'
			}
		]
	},
	footer: {
		blurb: 'KAIST 인공지능 · 과학퀴즈 학술동아리',
		email: 'kaist.victorylab@gmail.com',
		copyright: '© {year} Vlab. All rights reserved.',
		builtBy: 'Made with ❤️ by {authors}',
		links: [
			{ label: 'GitHub', href: 'https://github.com/vlab-kaist', external: true },
			{ label: 'Instagram', href: 'https://www.instagram.com/vlab.kaist/', external: true },
			{ label: '함께하기', href: '/join/' }
		]
	},
	notFound: {
		title: '페이지를 찾을 수 없습니다',
		body: '주소가 바뀌었거나 없어진 페이지.',
		cta: '홈으로'
	}
};
