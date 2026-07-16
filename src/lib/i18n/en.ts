import type { Dict } from './types';

/*
 * English copy. Mirrors ko.ts exactly — the Dict type will fail the build if a
 * key drifts, which is the cheapest way to keep two languages in sync.
 *
 * This is written for KAIST's international students, so it explains 카포전
 * ("Kapo-jeon" / the KAIST–POSTECH Science War) rather than assuming it.
 */
export const en: Dict = {
	meta: {
		title: 'VLAB — KAIST Science Quiz & AI Club',
		description:
			'VLAB represents KAIST in the Science Quiz and AI events of the annual KAIST–POSTECH Science War. 2025: won Science Quiz 80–75 and the AI event 3–0.',
		ogAlt: 'VLAB — the club that wins the Science War'
	},
	nav: {
		teams: 'Teams',
		projects: 'Projects',
		history: 'History',
		join: 'Join',
		skipToContent: 'Skip to content',
		menu: 'Open menu',
		close: 'Close menu',
		theme: 'Toggle theme',
		language: 'Language'
	},
	hero: {
		eyebrow: 'A KAIST academic club',
		title: 'We win the',
		titleAccent: 'Science War.',
		lead: 'Science Quiz and Artificial Intelligence. VLAB represents KAIST in both. We answer the questions, we build the agents, and we win.',
		ctaPrimary: 'Join us',
		ctaSecondary: 'See our work',
		imageAlt: 'VLAB members together at a pavilion overlooking the sea',
		scrollHint: 'Scroll'
	},
	stats: {
		heading: '2025 season',
		items: [
			{ value: '80 : 75', label: '2025 Science Quiz', note: 'vs POSTECH · won' },
			{ value: '3 : 0', label: '2025 AI event', note: 'vs POSTECH · won' },
			{ value: '200+', label: 'Flex training', note: 'in-game years' },
			{ value: '2022', label: 'Founded', note: 'four years running' }
		]
	},
	teams: {
		heading: 'Two teams, one goal',
		lead: 'VLAB solves the same problem two ways. One team answers the questions itself. The other builds the machine that answers them.',
		quiz: {
			name: 'Science Quiz Team',
			tagline: 'We get every question right.',
			body: 'Physics, chemistry, biology, earth science, mathematics. The Science War quiz has no syllabus — so we write one.',
			points: [
				'Weekly sessions working through past papers together.',
				'A growing wiki of past questions and worked concepts.',
				'Full mock rounds run under real match conditions.'
			],
			imageAlt: '2025 Science War quiz broadcast. KAIST 80, POSTECH 75.'
		},
		ai: {
			name: 'AI Team',
			tagline: 'We build agents that win.',
			body: 'From reinforcement learning to hand-written heuristics, we implement whatever it takes to beat the game we are given. And then we beat it.',
			points: [
				'A new agent designed around each season’s AI event task.',
				'Our own training infrastructure and simulators, built in-house.',
				'Seminars pitched so that CS101 is enough to follow along.'
			],
			imageAlt: '2025 Science War AI event, Rocket League. The VLAB agent leads against POSTECH.'
		}
	},
	projects: {
		heading: 'What we build',
		lead: 'Most of what we make is public. Here is some of it.',
		viewRepo: 'View repository',
		items: [
			{
				id: 'flex',
				name: 'Flex',
				tagline: 'The Rocket League agent that won 2025 three–nil',
				body: 'Trained for over 200 in-game years of reinforcement learning against a pool of 100+ self-play models, then refined with behaviour cloning and further fine-tuning. It beat POSTECH 3–0 in the 2025 AI event and reached the ML finals of the RLBot Championship 2025.',
				tags: ['Reinforcement learning', 'Self-play', 'Python'],
				image: 'flex-rlbot',
				imageAlt: 'RLBot Championship 2025 ML finals bracket showing Flex by KAIST AI Club.',
				featured: true
			},
			{
				id: 'rocketsim',
				name: 'RocketSim · pyvrsim',
				tagline: 'A fast Rocket League simulator built for training',
				body: 'Training an agent means running the game absurdly fast. We maintain a C++ simulator and a Python binding that keeps C++-level parallelism.',
				tags: ['C++', 'Python bindings', 'Simulation'],
				repo: 'https://github.com/vlab-kaist/RocketSim'
			},
			{
				id: 'neopjuki',
				name: 'Neopjuki',
				tagline: 'A Puoribor agent',
				body: 'An agent for Puoribor, the board game set as the 2022–2023 AI event task, combining search with a neural network.',
				tags: ['Search', 'Neural networks', 'Python'],
				repo: 'https://github.com/vlab-kaist/Neopjuki-v2'
			},
			{
				id: 'melee',
				name: 'Melee-PPO',
				tagline: 'Reinforcement learning for a fighting game',
				body: 'Training real-time fighting-game policies with PPO — an environment that demands fast reactions and long-horizon strategy at the same time.',
				tags: ['PPO', 'Reinforcement learning'],
				repo: 'https://github.com/vlab-kaist/Melee-PPO'
			},
			{
				id: 'nn101',
				name: 'NN101',
				tagline: 'A deep learning course for new members',
				body: 'Regression, then classification, MLPs, CNNs, RNNs and Transformers. Materials and assignments published weekly alongside live sessions. It became the AI Winter Camp in January 2026.',
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
		lead: 'From founding to now.',
		entries: [
			{
				date: '2026.01',
				title: 'AI Winter Camp',
				body: 'A six-week course running from regression through to Transformers.',
				highlight: true
			},
			{
				date: '2025.09',
				title: 'Won both the Science Quiz and the AI event',
				body: 'Science Quiz 80–75, AI event 3–0. Both taken in the same season.',
				highlight: true
			},
			{
				date: '2025',
				title: 'Flex reaches the RLBot Championship ML finals',
				body: 'Our Rocket League agent reached the finals of an international competition.'
			},
			{ date: '2022.09', title: 'Won the 2022 Science Quiz and AI events', highlight: true },
			{ date: '2022.04', title: 'VLAB founded' }
		]
	},
	join: {
		heading: 'We are looking for people',
		lead: 'People who stay with a problem. People who want to win.',
		body: 'Your major does not matter. For the quiz team, liking science is enough. For the AI team, CS101 is enough to start. You can learn the rest here.',
		cta: 'Apply',
		ctaNote: 'TODO(owner): recruiting form link needed',
		channels: [
			{ label: 'GitHub', value: 'vlab-kaist', href: 'https://github.com/vlab-kaist' },
			{ label: 'Email', value: 'TODO(owner)', href: 'mailto:' }
		]
	},
	footer: {
		blurb: 'KAIST Science Quiz & AI club',
		copyright: '© {year} VLAB. All rights reserved.',
		builtBy: 'Made with ❤️ by {author}',
		links: [
			{ label: 'GitHub', href: 'https://github.com/vlab-kaist', external: true },
			{ label: 'Join', href: '#join' }
		]
	},
	notFound: {
		title: 'Page not found',
		body: 'The address may have changed, or the page is gone.',
		cta: 'Back home'
	}
};
