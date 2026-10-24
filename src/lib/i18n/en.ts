import type { Dict } from './types';

/*
 * English copy. Mirrors ko.ts exactly — the Dict type will fail the build if a
 * key drifts, which is the cheapest way to keep two languages in sync.
 *
 * Written for KAIST's international students, so it names 카포전 as the
 * "Kapo Science War" (the club's own English term) rather than assuming it.
 *
 * Mirror the *register* too, not just the facts. See the voice note at the top
 * of ko.ts: plain, concrete, uneven sentence lengths, no closing punchline.
 */
export const en: Dict = {
	meta: {
		title: 'Vlab: KAIST AI & Science Quiz Club',
		description:
			'Vlab is a student club at KAIST. We enter the AI and Science Quiz events of the Kapo Science War against POSTECH. In 2026 we won both: the AI event 2–0 and the Science Quiz 280–210.',
		ogAlt: 'Vlab: the club that wins the Kapo Science War'
	},
	nav: {
		teams: 'Teams',
		projects: 'Projects',
		life: 'Life',
		history: 'History',
		join: 'Join',
		skipToContent: 'Skip to content',
		menu: 'Open menu',
		close: 'Close menu',
		language: 'Language',
		themeToLight: 'Switch to light theme',
		themeToDark: 'Switch to dark theme'
	},
	hero: {
		badge: 'Recruiting new members',
		title: 'We win the',
		titleAccent: 'Kapo Science War.',
		lead: 'A KAIST student club that enters the AI and Science Quiz events of the Kapo Science War. We started in 2022 and are 29 people now. This year we won both events.',
		ctaPrimary: 'Get in touch',
		ctaSecondary: 'See our work',
		imageAlt: 'Vlab members together at a pavilion overlooking the sea in Yeosu'
	},
	kapo: {
		heading: 'Kapo Science War 2026',
		when: '18–19 September, at POSTECH in Pohang. We won both of the events we enter.',
		us: 'KAIST',
		them: 'POSTECH',
		won: 'Won',
		lost: 'Lost',
		watch: 'Watch the broadcast',
		credit: 'Images: broadcast frames (POSTECH PBS, KAIST VOK)',
		matches: [
			{
				id: 'ai',
				event: 'AI event',
				score: [2, 0],
				format: 'Mario Kart Wii, best of three',
				body: 'Each school’s AI drives its own karts, with no one on the controller. We took rounds one and two, so round three was never played.',
				image: 'kapo-2026-ai',
				imageAlt:
					'Broadcast of the 2026 AI event: Mario Kart Wii split four ways, each kart driven by one school’s AI.',
				video: 'https://www.youtube.com/watch?v=EzsDPWexwCY'
			},
			{
				id: 'quiz',
				event: 'Science Quiz',
				score: [280, 210],
				format: 'A quiz with rock-paper-scissors chess on top',
				body: 'A right answer lets you move a piece on the board. This year there were computer science questions too, on how printf behaves and on A* search.',
				image: 'kapo-2026-quiz',
				imageAlt:
					'The 2026 Science Quiz stage. The board in the middle shows the final score, KAIST 280 to POSTECH 210, with the two teams seated either side.',
				video: 'https://www.youtube.com/watch?v=RiqVfV2Fxsk'
			}
		],
		record: {
			heading: 'All-time record',
			event: 'Event',
			overall: 'Overall',
			ai: 'AI event',
			quiz: 'Science Quiz',
			total: '{w}–{l}',
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
		heading: 'The AI team and the Science Quiz team',
		lead: 'The two barely overlap. The AI team meets every week to write code; the quiz team spends that time working through problems.',
		quiz: {
			name: 'Science Quiz Team',
			tagline: 'Preparing every week for an exam with no syllabus.',
			body: 'Physics, chemistry, biology, earth science and maths all come up, and lately computer science too. Nothing is off the table, so we collect the past papers, write up our own notes, and study from those.',
			points: [
				'Weekly sessions on past papers and likely questions.',
				'Everything we write up goes into a wiki.',
				'Mock rounds run in the real match format.'
			],
			imageAlt:
				'The 2026 Science Quiz stage, the board showing the final score: KAIST 280, POSTECH 210.'
		},
		ai: {
			name: 'AI Team',
			tagline: 'We build the program that plays the game.',
			body: 'The AI event sets a different task each season. One year it was a board game, another it was Rocket League, and in 2026 it was Mario Kart. So we pick whatever suits it, reinforcement learning or a hand-written heuristic.',
			points: [
				'Once the season’s task is announced, we design a new agent around it.',
				'We build the simulators and training infrastructure ourselves.',
				'Seminars pitched so that CS101 is enough to follow along.'
			],
			imageAlt:
				'Broadcast of the 2026 AI event: Mario Kart Wii split four ways, each kart driven by one school’s AI.'
		}
	},
	projects: {
		heading: 'What we build',
		lead: 'Most of what we make ends up on GitHub. Here is some of it.',
		viewRepo: 'View repository',
		items: [
			{
				id: 'flex',
				name: 'Flex',
				tagline: 'The Rocket League agent that won 2025 three–nil',
				body: 'Trained against a pool of 100+ self-play models for over 200 in-game years, then refined with behaviour cloning and further fine-tuning. It beat POSTECH 3–0 in the 2025 AI event and made the ML finals of the RLBot Championship 2025.',
				tags: ['Reinforcement learning', 'Self-play', 'Python'],
				image: 'rocketleague',
				imageAlt: 'The 2025 AI event, Rocket League. Flex leads POSTECH 1–0.',
				featured: true
			},
			{
				id: 'rocketsim',
				name: 'RocketSim · pyvrsim',
				tagline: 'A fast Rocket League simulator built for training',
				body: 'Training an agent means running the game very fast. So we maintain our own C++ simulator, plus a Python binding that keeps the parallelism you would get in C++.',
				tags: ['C++', 'Python bindings', 'Simulation'],
				repo: 'https://github.com/vlab-kaist/RocketSim'
			},
			{
				id: 'neopjuki',
				name: 'Neopjuki',
				tagline: 'A Puoribor agent',
				body: 'An agent for Puoribor, the board game set as the AI event task in 2022–2023. Search, with a neural network on top.',
				tags: ['Search', 'Neural networks', 'Python'],
				repo: 'https://github.com/vlab-kaist/Neopjuki-v2'
			},
			{
				id: 'melee',
				name: 'Melee-PPO',
				tagline: 'Reinforcement learning for a fighting game',
				body: 'An experiment in training real-time fighting-game policies with PPO. The environment wants split-second reactions and long-horizon strategy at once, which makes the policy awkward to learn.',
				tags: ['PPO', 'Reinforcement learning'],
				repo: 'https://github.com/vlab-kaist/Melee-PPO'
			},
			{
				id: 'nn101',
				name: 'NN101',
				tagline: 'A deep learning course for new members',
				body: 'Regression first, then classification, MLPs, CNNs, RNNs and Transformers. Materials and assignments go out weekly, with live sessions alongside. It became the AI Winter Camp in January 2026.',
				tags: ['Teaching', 'Curriculum'],
				repo: 'https://github.com/vlab-kaist/NN101_23S'
			},
			{
				id: 'vlms',
				name: 'VLMS',
				tagline: 'Our learning archive',
				body: 'Seminar material and worked concepts, collected in one public place.',
				tags: ['Archive', 'Wiki'],
				repo: 'https://github.com/vlab-kaist/VLMS'
			}
		]
	},
	history: {
		heading: 'History',
		lead: 'From 2022 to now. The years we lost are in here too.',
		entries: [
			{
				date: '2026.09',
				title: '2026 Kapo Science War: won the AI event and the Science Quiz',
				body: 'The AI event (Mario Kart Wii) 2–0, the Science Quiz 280–210. From 2023 we had taken one event a year; this time it was both.',
				highlight: true
			},
			{
				date: '2026.01',
				title: 'AI Winter Camp',
				body: 'Six weeks, running from regression through to Transformers.',
				highlight: true
			},
			{
				date: '2025.09',
				title: '2025 Kapo Science War: won the AI event',
				body: 'Beat POSTECH 3–0 in the AI event. Lost the Science Quiz.',
				highlight: true
			},
			{
				date: '2025',
				title: 'Flex reaches the RLBot Championship ML finals',
				body: 'Our Rocket League agent made it to the finals of an international competition.'
			},
			{
				date: '2024.09',
				title: '2024 Kapo Science War: won the Science Quiz',
				body: 'Took the Science Quiz, lost the AI event.'
			},
			{
				date: '2023.09',
				title: '2023 Kapo Science War: won the Science Quiz',
				body: 'Took the Science Quiz, lost the AI event.'
			},
			{ date: '2022.09', title: 'Won both the Science Quiz and the AI event', highlight: true },
			{ date: '2022.04', title: 'Vlab founded' }
		]
	},
	life: {
		heading: 'It is not all Kapo Science War',
		lead: 'Most of our time goes on sitting in the club room. The rest of it, mostly, goes on eating.',
		captions: [
			{
				title: 'Practice',
				alt: 'Vlab members preparing for the Kapo Science War in the club room, laptops and a whiteboard'
			},
			{
				title: 'Culture Festival',
				alt: 'Members gathered in front of the Vlab booth at the KAIST student culture festival'
			},
			{
				title: 'Strawberry Party',
				alt: 'Vlab members sharing strawberries on the spring campus lawn under cherry blossoms'
			},
			{
				title: 'Team Dinner',
				alt: 'Vlab members grilling and sharing a meal together at night'
			},
			{
				title: 'Spring Picnic',
				alt: 'Vlab members gathered together on a picnic mat on the KAIST campus lawn'
			}
		]
	},
	join: {
		heading: 'We are looking for people',
		lead: 'Ideally someone who does not mind sitting with one problem for a long time.',
		body: 'Your major does not matter. For the AI team, CS101 is enough to start; for the quiz team, liking science is enough. You can pick up the rest here. Email us if you want to ask anything.',
		cta: 'Apply',
		ctaNote: 'Opens a Google Form.',
		ctaHref: 'https://forms.gle/AAHfwuAT4VVEYmBG6',
		imageAlt: 'Vlab members lifting the trophy after winning the 2025 AI event',
		channels: [
			{
				label: 'Email',
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
		heading: 'Supported by',
		contact: {
			heading: 'Interested in sponsoring us?',
			body: 'We would like to hear from companies that want to grow alongside Vlab.',
			label: 'Get in touch',
			href: 'mailto:kaist.victorylab@gmail.com?subject=Vlab%20sponsorship'
		},
		items: [
			{
				name: 'Elice',
				logo: 'elice.png',
				href: 'https://elice.io/'
			},
			{
				name: 'KAIST School of Computing',
				logo: 'kaist-cs.png',
				logoDark: 'kaist-cs-reverse.png',
				href: 'https://cs.kaist.ac.kr/'
			}
		]
	},
	footer: {
		blurb: 'KAIST AI & Science Quiz club',
		copyright: '© {year} Vlab. All rights reserved.',
		builtBy: 'Made with ❤️ by {authors}',
		links: [
			{ label: 'GitHub', href: 'https://github.com/vlab-kaist', external: true },
			{ label: 'Instagram', href: 'https://www.instagram.com/vlab.kaist/', external: true },
			{ label: 'Join', href: '/join/' }
		]
	},
	notFound: {
		title: 'Page not found',
		body: 'The address may have changed, or the page is gone.',
		cta: 'Back home'
	}
};
