import type { Dict } from './types';

/*
 * Korean copy — the source of truth. en.ts mirrors this shape.
 *
 * The 카포전 record below came from the club directly. Note that it does NOT
 * match the scoreboard visible in quiz-2025.jpg (KAIST 80 : 75 POSTECH): that
 * capture is a mid-match frame, not the final result. Do not "correct" this
 * copy from that image.
 */
export const ko: Dict = {
	meta: {
		title: 'VLAB — KAIST 과학퀴즈 · 인공지능 학술동아리',
		description:
			'VLAB은 카포전 과학퀴즈와 인공지능 종목에서 KAIST를 대표하는 학술동아리입니다. 2025 AI 종목 3:0 승리, 과학퀴즈 2023·2024 연속 승리.',
		ogAlt: 'VLAB — 카포전을 이기는 동아리'
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
		theme: '테마 전환',
		language: '언어'
	},
	hero: {
		eyebrow: 'KAIST 학술동아리',
		title: '카포전을',
		titleAccent: '이깁니다.',
		lead: '과학퀴즈와 인공지능. VLAB은 두 종목에서 KAIST를 대표합니다. 문제를 풀고, 에이전트를 만들고, 이깁니다.',
		ctaPrimary: '함께하기',
		ctaSecondary: '프로젝트 보기',
		imageAlt: '여수 바다가 내려다보이는 정자에서 함께 찍은 VLAB 단체 사진',
		scrollHint: '아래로'
	},
	stats: {
		heading: '기록',
		items: [
			{ value: '3 : 0', label: '2025 AI 종목', note: 'vs POSTECH · 승' },
			{ value: '200+', label: 'Flex 학습량', note: '인게임 연 단위' },
			{ value: 'ML 결승', label: 'RLBot Championship', note: '2025 · 국제 대회' },
			{ value: '2022', label: 'VLAB 설립', note: '4년째 활동 중' }
		]
	},
	teams: {
		heading: '두 개의 팀, 하나의 목표',
		lead: 'VLAB은 서로 다른 방식으로 같은 문제를 풉니다. 한 팀은 사람이 직접 답을 맞히고, 다른 한 팀은 답을 맞히는 기계를 만듭니다.',
		quiz: {
			name: '과학퀴즈팀',
			tagline: '모든 문제를 맞춥니다.',
			body: '물리, 화학, 생물, 지구과학, 수학. 카포전 과학퀴즈는 범위가 없습니다. 그래서 우리는 범위를 만듭니다.',
			points: [
				'매주 모여 기출과 예상 문제를 함께 풉니다.',
				'과거 기출과 개념 정리를 위키로 축적합니다.',
				'실전과 같은 형식으로 모의고사를 진행합니다.'
			],
			imageAlt: '2025 카포전 과학퀴즈 경기 중계 화면'
		},
		ai: {
			name: '인공지능팀',
			tagline: '이기는 에이전트를 만듭니다.',
			body: '강화학습부터 휴리스틱까지, 주어진 게임을 이기기 위해 필요한 모든 것을 직접 구현합니다. 그리고 실제로 이깁니다.',
			points: [
				'매 시즌 카포전 AI 종목 과제에 맞춰 에이전트를 설계합니다.',
				'학습 인프라와 시뮬레이터를 직접 만들어 씁니다.',
				'CS101만 들었다면 따라올 수 있는 세미나를 운영합니다.'
			],
			imageAlt:
				'2025 카포전 AI 종목 로켓리그 경기 화면. VLAB 에이전트가 POSTECH을 상대로 앞서고 있다.'
		}
	},
	projects: {
		heading: '만드는 것들',
		lead: '동아리의 결과물은 대부분 공개되어 있습니다. 아래는 그중 일부입니다.',
		viewRepo: '저장소 보기',
		items: [
			{
				id: 'flex',
				name: 'Flex',
				tagline: '2025 카포전을 3:0으로 이긴 로켓리그 에이전트',
				body: '100개 이상의 셀프플레이 모델로 200년 넘는 인게임 시간을 강화학습한 뒤, 행동 복제(BC)와 추가 파인튜닝으로 다듬었습니다. 2025 카포전 AI 종목에서 POSTECH을 3:0으로 이겼고, RLBot Championship 2025 ML 부문 결승에 진출했습니다.',
				tags: ['강화학습', 'Self-play', 'Python'],
				image: 'flex-rlbot',
				imageAlt: 'RLBot Championship 2025 ML 결승 대진표. KAIST AI Club의 Flex가 표시되어 있다.',
				featured: true
			},
			{
				id: 'rocketsim',
				name: 'RocketSim · pyvrsim',
				tagline: '학습을 위한 고속 로켓리그 시뮬레이터',
				body: '에이전트를 학습시키려면 게임을 아주 빠르게 돌려야 합니다. C++ 시뮬레이터와, C++ 수준의 병렬성을 유지하는 파이썬 바인딩을 직접 만들어 사용합니다.',
				tags: ['C++', 'Python 바인딩', '시뮬레이션'],
				repo: 'https://github.com/vlab-kaist/RocketSim'
			},
			{
				id: 'neopjuki',
				name: 'Neopjuki',
				tagline: 'Puoribor 에이전트',
				body: '2022–2023 카포전 AI 종목 과제였던 보드게임 Puoribor를 푸는 에이전트입니다. 탐색과 신경망을 결합했습니다.',
				tags: ['탐색', '신경망', 'Python'],
				repo: 'https://github.com/vlab-kaist/Neopjuki-v2'
			},
			{
				id: 'melee',
				name: 'Melee-PPO',
				tagline: '대전 격투 게임 강화학습',
				body: 'PPO로 실시간 대전 게임을 학습시키는 실험. 빠른 반응과 장기 전략을 동시에 요구하는 환경에서 정책 학습을 다룹니다.',
				tags: ['PPO', '강화학습'],
				repo: 'https://github.com/vlab-kaist/Melee-PPO'
			},
			{
				id: 'nn101',
				name: 'NN101',
				tagline: '신입 부원을 위한 딥러닝 입문 과정',
				body: '회귀에서 시작해 분류, MLP, CNN, RNN, Transformer까지. 매주 자료와 과제를 공개하고 실시간 강의를 병행합니다. 2026년 1월 AI Winter Camp로 이어졌습니다.',
				tags: ['교육', '커리큘럼'],
				repo: 'https://github.com/vlab-kaist/NN101_23S'
			},
			{
				id: 'vlms',
				name: 'VLMS',
				tagline: '학습 자료 아카이브',
				body: '세미나 자료와 개념 정리를 한곳에 모아 공개하는 저장소입니다.',
				tags: ['아카이브', '위키'],
				repo: 'https://github.com/vlab-kaist/VLMS'
			}
		]
	},
	history: {
		heading: '연혁',
		lead: '설립부터 지금까지. 이긴 해와 진 해를 모두 적습니다.',
		entries: [
			{
				date: '2026.01',
				title: 'AI Winter Camp 개최',
				body: '회귀·분류·MLP·CNN·RNN·Transformer로 이어지는 6주 과정을 운영했습니다.',
				highlight: true
			},
			{
				date: '2025.09',
				title: '2025 카포전 — AI 종목 승리',
				body: 'AI 종목에서 POSTECH을 3:0으로 이겼습니다. 과학퀴즈는 패배했습니다.',
				highlight: true
			},
			{
				date: '2025',
				title: 'Flex, RLBot Championship ML 결승 진출',
				body: '동아리에서 만든 로켓리그 에이전트가 국제 대회 머신러닝 부문 결승에 올랐습니다.'
			},
			{
				date: '2024.09',
				title: '2024 카포전 — 과학퀴즈 승리',
				body: '과학퀴즈에서 이겼습니다. AI 종목은 패배했습니다.'
			},
			{
				date: '2023.09',
				title: '2023 카포전 — 과학퀴즈 승리',
				body: '과학퀴즈에서 이겼습니다. AI 종목은 패배했습니다.'
			},
			{ date: '2022.09', title: '2022 카포전 과학퀴즈 · AI 종목 우승', highlight: true },
			{ date: '2022.04', title: 'VLAB 설립' }
		]
	},
	life: {
		heading: '이기기만 하는 건 아닙니다',
		lead: '같이 공부하고, 같이 먹고, 같이 놉니다. VLAB의 진짜 모습.',
		captions: [
			{
				title: '카포전 연습',
				subtitle: '화이트보드가 가득 찰 때까지',
				alt: '동아리방에서 노트북과 화이트보드를 두고 카포전을 준비하는 VLAB 부원들'
			},
			{
				title: '학생문화제',
				subtitle: '부스를 열고 사람들을 만납니다',
				alt: 'KAIST 학생문화제에서 VLAB 부스 앞에 모여 사진을 찍는 부원들'
			},
			{
				title: '딸기 파티',
				subtitle: '벚꽃 아래, 잔디밭에서',
				alt: '벚꽃이 핀 봄 캠퍼스 잔디밭에서 딸기를 나눠 먹는 VLAB 부원들'
			},
			{
				title: '회식',
				subtitle: '잘 싸우려면 잘 먹어야죠',
				alt: '밤에 다 같이 모여 고기를 구워 먹는 VLAB 회식'
			},
			{
				title: '봄 소풍',
				subtitle: '다 같이 모이는 날',
				alt: 'KAIST 캠퍼스 잔디밭에서 돗자리를 펴고 다 함께 모인 VLAB 부원들'
			}
		]
	},
	join: {
		heading: '함께할 사람을 찾습니다',
		lead: '문제를 끝까지 붙잡는 사람, 그리고 이기고 싶은 사람.',
		body: '전공은 상관없습니다. 과학퀴즈팀은 과학을 좋아하면 되고, 인공지능팀은 CS101 정도면 시작할 수 있습니다. 나머지는 들어와서 배우면 됩니다. 궁금한 것이 있으면 편하게 메일 주세요.',
		cta: '메일 보내기',
		imageAlt: '2025 카포전 AI 종목에서 승리한 뒤 트로피를 들어올리는 VLAB 부원들',
		channels: [
			{
				label: '이메일',
				value: 'kaist.victorylab@gmail.com',
				href: 'mailto:kaist.victorylab@gmail.com'
			},
			{ label: 'GitHub', value: 'vlab-kaist', href: 'https://github.com/vlab-kaist' }
		]
	},
	sponsors: {
		heading: '후원',
		items: [
			{
				name: '엘리스',
				logo: 'elice.png',
				href: 'https://elice.io/'
			}
		]
	},
	footer: {
		blurb: 'KAIST 과학퀴즈 · 인공지능 학술동아리',
		copyright: '© {year} VLAB. All rights reserved.',
		builtBy: 'Made with ❤️ by {author}',
		links: [
			{ label: 'GitHub', href: 'https://github.com/vlab-kaist', external: true },
			{ label: '함께하기', href: '#join' }
		]
	},
	notFound: {
		title: '페이지를 찾을 수 없습니다',
		body: '주소가 바뀌었거나, 사라진 페이지입니다.',
		cta: '홈으로'
	}
};
