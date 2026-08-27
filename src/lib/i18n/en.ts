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
			'Vlab is a student club at KAIST. We enter the AI and Science Quiz events of the Kapo Science War against POSTECH. We won the AI event 3–0 in 2025, and the Science Quiz in 2023 and 2024.',
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
		lead: 'A KAIST student club that enters the AI and Science Quiz events of the Kapo Science War. We started in 2022 and have entered both events every year since.',
		ctaPrimary: 'Get in touch',
		ctaSecondary: 'See our work',
		imageAlt: 'Vlab members together at a pavilion overlooking the sea in Yeosu'
	},
	stats: {
		heading: 'Record',
		items: [
			{ value: '3 : 0', label: '2025 AI event', note: 'vs POSTECH · won' },
			{ value: '29', label: 'Active members', note: 'as of 2026' },
			{ value: 'ML final', label: 'RLBot Championship', note: '2025 · international' },
			{ value: '2022', label: 'Founded', note: 'four years running' }
		]
	},
	teams: {
		heading: 'The AI team and the Science Quiz team',
		lead: 'The two barely overlap. The AI team meets every week to write code; the quiz team spends that time working through problems.',
		quiz: {
			name: 'Science Quiz Team',
			tagline: 'Preparing every week for an exam with no syllabus.',
			body: 'Physics, chemistry, biology, earth science and maths all come up. Nothing is off the table, so we collect the past papers, write up our own notes, and study from those.',
			points: [
				'Weekly sessions on past papers and likely questions.',
				'Everything we write up goes into a wiki.',
				'Mock rounds run in the real match format.'
			],
			imageAlt: 'Broadcast of the 2025 Kapo Science War quiz match'
		},
		ai: {
			name: 'AI Team',
			tagline: 'We build the program that plays the game.',
			body: 'The AI event sets a different task each season. One year it was a board game, another it was Rocket League, so we pick whatever suits it, reinforcement learning or a hand-written heuristic.',
			points: [
				'Once the season’s task is announced, we design a new agent around it.',
				'We build the simulators and training infrastructure ourselves.',
				'Seminars pitched so that CS101 is enough to follow along.'
			],
			imageAlt: '2025 AI event, Rocket League. The Vlab agent leads against POSTECH.'
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
				image: 'flex-rlbot',
				imageAlt: 'RLBot Championship 2025 ML finals bracket showing Flex by KAIST AI Club.',
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
