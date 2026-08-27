import type { Dict } from './types';

/*
 * Korean copy — the source of truth. en.ts mirrors this shape.
 *
 * Team ordering: 인공지능 first, 과학퀴즈 second, everywhere the two are named
 * together (meta, hero, teams, join, footer). The club asked for it. If you add
 * copy that names both, follow it.
 *
 * The 카포전 record below came from the club directly. Note that it does NOT
 * match the scoreboard visible in quiz-2025.jpg (KAIST 80 : 75 POSTECH): that
 * capture is a mid-match frame, not the final result. Do not "correct" this
 * copy from that image.
 *
 * Voice: plain 습니다체, and deliberately uneven. The first draft of this file
 * was full of balanced pairs ("한 팀은 …, 다른 한 팀은 …"), three-part lists
 * ("풀고, 만들고, 이깁니다") and reversal slogans ("범위가 없습니다. 그래서
 * 우리는 범위를 만듭니다") — every sentence the same length and the same shape,
 * which is what made it read as machine-written. When you add copy here: say the
 * concrete thing, vary the sentence length, and resist the closing punchline.
 */
export const ko: Dict = {
	meta: {
		title: 'Vlab: KAIST 인공지능 · 과학퀴즈 학술동아리',
		description:
			'KAIST 학술동아리 Vlab입니다. 카포전 AI 종목과 과학퀴즈에 나갑니다. 2025년 AI 종목은 3:0으로 이겼고, 과학퀴즈는 2023·2024년에 이겼습니다.',
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
		title: '카포전을',
		titleAccent: '이깁니다.',
		lead: '카포전 AI 종목과 과학퀴즈에 나가는 KAIST 학술동아리입니다. 2022년에 만들어졌고, 그 뒤로 매년 두 종목에 모두 나가고 있습니다.',
		ctaPrimary: '함께하기',
		ctaSecondary: '프로젝트 보기',
		imageAlt: '여수 바다가 내려다보이는 정자에서 함께 찍은 Vlab 단체 사진'
	},
	stats: {
		heading: '기록',
		items: [
			{ value: '3 : 0', label: '2025 AI 종목', note: 'vs POSTECH · 승' },
			{ value: '29', label: '활동 인원', note: '2026년 현재' },
			{ value: 'ML 결승', label: 'RLBot Championship', note: '2025 · 국제 대회' },
			{ value: '2022', label: 'Vlab 설립', note: '4년째 활동 중' }
		]
	},
	teams: {
		heading: '인공지능팀과 과학퀴즈팀',
		lead: '하는 일은 거의 겹치지 않습니다. 인공지능팀은 매주 모여 코드를 쓰고, 과학퀴즈팀은 그 시간에 문제를 풉니다.',
		quiz: {
			name: '과학퀴즈팀',
			tagline: '범위가 없는 시험을 매주 준비합니다.',
			body: '물리, 화학, 생물, 지구과학, 수학이 전부 나옵니다. 정해진 범위가 없어서 기출을 모아 저희끼리 정리해 두고, 그걸로 공부합니다.',
			points: [
				'매주 모여 기출과 예상 문제를 풉니다.',
				'정리한 기출과 개념은 위키에 쌓아 둡니다.',
				'실전과 같은 형식으로 모의고사를 봅니다.'
			],
			imageAlt: '2025 카포전 과학퀴즈 경기 중계 화면'
		},
		ai: {
			name: '인공지능팀',
			tagline: '게임을 이길 프로그램을 직접 만듭니다.',
			body: '카포전 AI 종목은 시즌마다 과제가 바뀝니다. 보드게임이던 해도 있고 로켓리그였던 해도 있어서, 강화학습이든 휴리스틱이든 그 게임에 맞는 방법을 그때그때 골라 씁니다.',
			points: [
				'시즌 과제가 나오면 거기 맞춰 에이전트를 새로 설계합니다.',
				'학습에 쓸 시뮬레이터와 인프라도 직접 만들어 씁니다.',
				'CS101만 들었으면 따라올 수 있는 세미나를 엽니다.'
			],
			imageAlt:
				'2025 카포전 AI 종목 로켓리그 경기 화면. Vlab 에이전트가 POSTECH을 상대로 앞서고 있다.'
		}
	},
	projects: {
		heading: '만드는 것들',
		lead: '만든 건 대부분 GitHub에 올려 둡니다. 아래는 그중 일부입니다.',
		viewRepo: '저장소 보기',
		items: [
			{
				id: 'flex',
				name: 'Flex',
				tagline: '2025 카포전을 3:0으로 이긴 로켓리그 에이전트',
				body: '셀프플레이 모델 100개 이상을 상대로 인게임 200년이 넘게 강화학습을 돌린 뒤, 행동 복제(BC)와 파인튜닝으로 다듬었습니다. 2025 카포전 AI 종목에서 POSTECH을 3:0으로 이겼고, RLBot Championship 2025 ML 부문 결승까지 올라갔습니다.',
				tags: ['강화학습', 'Self-play', 'Python'],
				image: 'flex-rlbot',
				imageAlt: 'RLBot Championship 2025 ML 결승 대진표. KAIST AI Club의 Flex가 표시되어 있다.',
				featured: true
			},
			{
				id: 'rocketsim',
				name: 'RocketSim · pyvrsim',
				tagline: '학습을 위한 고속 로켓리그 시뮬레이터',
				body: '에이전트를 학습시키려면 게임을 아주 빠르게 돌려야 합니다. 그래서 C++ 시뮬레이터와, C++ 수준의 병렬성이 유지되는 파이썬 바인딩을 직접 만들어 씁니다.',
				tags: ['C++', 'Python 바인딩', '시뮬레이션'],
				repo: 'https://github.com/vlab-kaist/RocketSim'
			},
			{
				id: 'neopjuki',
				name: 'Neopjuki',
				tagline: 'Puoribor 에이전트',
				body: '2022–2023년 AI 종목 과제였던 보드게임 Puoribor용 에이전트입니다. 탐색에 신경망을 붙였습니다.',
				tags: ['탐색', '신경망', 'Python'],
				repo: 'https://github.com/vlab-kaist/Neopjuki-v2'
			},
			{
				id: 'melee',
				name: 'Melee-PPO',
				tagline: '대전 격투 게임 강화학습',
				body: 'PPO로 실시간 대전 게임을 학습시켜 본 실험입니다. 순간 반응과 긴 호흡의 전략이 동시에 필요한 환경이라 정책 학습이 까다롭습니다.',
				tags: ['PPO', '강화학습'],
				repo: 'https://github.com/vlab-kaist/Melee-PPO'
			},
			{
				id: 'nn101',
				name: 'NN101',
				tagline: '신입 부원을 위한 딥러닝 입문 과정',
				body: '회귀에서 시작해 분류, MLP, CNN, RNN, Transformer까지 갑니다. 자료와 과제는 매주 공개하고 강의도 같이 합니다. 2026년 1월 AI Winter Camp로 이어졌습니다.',
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
		lead: '2022년부터 지금까지입니다. 진 해도 그대로 적어 뒀습니다.',
		entries: [
			{
				date: '2026.01',
				title: 'AI Winter Camp 개최',
				body: '6주짜리 과정으로 열었습니다. 회귀에서 Transformer까지 다뤘습니다.',
				highlight: true
			},
			{
				date: '2025.09',
				title: '2025 카포전: AI 종목 승리',
				body: 'AI 종목에서 POSTECH을 3:0으로 이겼습니다. 과학퀴즈는 졌습니다.',
				highlight: true
			},
			{
				date: '2025',
				title: 'Flex, RLBot Championship ML 결승 진출',
				body: '동아리에서 만든 로켓리그 에이전트가 국제 대회 머신러닝 부문 결승까지 갔습니다.'
			},
			{
				date: '2024.09',
				title: '2024 카포전: 과학퀴즈 승리',
				body: '과학퀴즈는 이겼고, AI 종목은 졌습니다.'
			},
			{
				date: '2023.09',
				title: '2023 카포전: 과학퀴즈 승리',
				body: '과학퀴즈는 이겼고, AI 종목은 졌습니다.'
			},
			{ date: '2022.09', title: '2022 카포전 과학퀴즈 · AI 종목 우승', highlight: true },
			{ date: '2022.04', title: 'Vlab 설립' }
		]
	},
	life: {
		heading: '카포전만 하는 건 아닙니다',
		lead: '동아리방에 모여 있는 시간이 제일 깁니다. 그 외에는 대체로 같이 먹으러 다닙니다.',
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
		heading: '함께할 사람을 찾습니다',
		lead: '한 문제를 오래 붙잡고 있는 걸 싫어하지 않는 사람이면 좋겠습니다.',
		body: '전공은 상관없습니다. 인공지능팀은 CS101 정도만 들었으면 시작할 수 있고, 과학퀴즈팀은 과학을 좋아하면 됩니다. 나머지는 들어와서 배우면 됩니다. 궁금한 게 있으면 메일 주세요.',
		cta: '지원하기',
		ctaNote: '구글 폼으로 이동합니다.',
		ctaHref: 'https://forms.gle/AAHfwuAT4VVEYmBG6',
		imageAlt: '2025 카포전 AI 종목에서 승리한 뒤 트로피를 들어올리는 Vlab 부원들',
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
			body: 'Vlab을 후원하고 싶은 기업의 연락을 기다립니다.',
			label: '후원 문의하기',
			href: 'mailto:kaist.victorylab@gmail.com?subject=Vlab%20%ED%9B%84%EC%9B%90%20%EB%AC%B8%EC%9D%98'
		},
		items: [
			{
				name: '엘리스',
				logo: 'elice.png',
				href: 'https://elice.io/'
			}
		]
	},
	footer: {
		blurb: 'KAIST 인공지능 · 과학퀴즈 학술동아리',
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
		body: '주소가 바뀌었거나, 사라진 페이지입니다.',
		cta: '홈으로'
	}
};
