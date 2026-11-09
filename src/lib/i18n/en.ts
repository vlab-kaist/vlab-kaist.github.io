import type { Dict } from './types';

/*
 * English copy. Mirrors ko.ts exactly — the Dict type will fail the build if a
 * key drifts, which is the cheapest way to keep two languages in sync.
 *
 * Written for KAIST's international students, so it names 카포전 as the
 * "KAIST-POSTECH Science War", the event's official English name (it is on
 * the 2026 stage banner), rather than assuming it.
 *
 * "KAIST-\u2060POSTECH" in visible copy: U+2060 (word joiner) after the
 * hyphen stops a line breaking inside the name ("KAIST-" / "POSTECH") on
 * narrow screens. It renders as nothing. meta keeps the plain spelling for
 * search snippets.
 *
 * Translated from the club's own Korean rewrite (2026-11-06), line for line:
 * when ko.ts changes, change the matching line here. The hero title is the
 * club's pick ("For victory").
 */
export const en: Dict = {
	meta: {
		title: 'Vlab: KAIST AI & Science Quiz Club',
		description:
			'Vlab, the KAIST AI & Science Quiz club. We compete in the AI and Science Quiz events of the KAIST-POSTECH Science War. In 2026 we won both: the AI event 2–0 and the Science Quiz 280–210.',
		ogAlt: 'Vlab: the club that wins the KAIST-POSTECH Science War'
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
		badgeClosed: 'New members',
		title: 'KAIST-\u2060POSTECH Science War',
		titleAccent: 'For victory',
		lead: 'A KAIST science and engineering club in the AI and Science Quiz events of the KAIST-\u2060POSTECH Science War\nFounded in 2022, 29 members today\nWon both the AI event and the Science Quiz in 2026',
		ctaPrimary: 'Join',
		ctaSecondary: 'See projects',
		imageAlt:
			'Vlab members in matching blue T-shirts cheering in front of the KAIST-\u2060POSTECH Science War stage after the 2026 finals',
		photoSlot: 'Our 2026 group photo goes here'
	},
	kapo: {
		heading: 'KAIST-\u2060POSTECH Science War 2026',
		when: '18–19 September, at POSTECH in Pohang. We won every event we entered.',
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
				body: 'An AI we trained ourselves drives the kart on its own. We took rounds one and two back to back for a clean win.',
				image: 'kapo-2026-ai',
				imageAlt:
					'Broadcast of the 2026 AI event: Mario Kart Wii split four ways, each kart driven by one school’s AI.',
				video: 'https://www.youtube.com/watch?v=EzsDPWexwCY'
			},
			{
				id: 'quiz',
				event: 'Science Quiz',
				score: [280, 210],
				format: 'Quiz + rock-paper-scissors chess',
				body: 'The team that answers correctly moves a piece on the chessboard. KAIST won 280 to 210.',
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
		lead: 'Vlab has two teams: the AI team and the Science Quiz team. The AI team works to build smarter AI, and the Science Quiz team works to know more.',
		quiz: {
			name: 'Science Quiz Team',
			tagline: 'The team that prepares science across every field, plus game strategy',
			body: 'We study for questions from maths, physics, chemistry, biology and computer science, with no fixed syllabus. And we work out strategy for the game that runs alongside the quiz!',
			points: [
				'Regular sessions on past papers and practice problems',
				'Our own database of past questions and everything worth studying',
				'Playing the game ourselves to find strategies that win'
			],
			imageAlt:
				'The 2026 Science Quiz stage, the board showing the final score: KAIST 280, POSTECH 210.'
		},
		ai: {
			name: 'AI Team',
			tagline: 'The team that builds AI to win the game',
			body: 'The game in the AI event changes every year, from simple board games to Rocket League and Mario Kart! We train our AI with a range of learning methods.',
			points: [
				'Once the game is announced, we do it all ourselves, from the training environment to the finished AI',
				'We also run seminars anyone can follow to build AI knowledge and experience'
			],
			imageAlt:
				'Broadcast of the 2026 AI event: Mario Kart Wii split four ways, each kart driven by one school’s AI.'
		}
	},
	projects: {
		heading: 'What we have built so far',
		lead: 'From competition AI to tools for our own learning, we build it and keep it on GitHub.',
		items: [
			{
				id: 'flex',
				name: 'Flex',
				tagline: 'The Rocket League agent that won 2025 three–nil',
				body: 'The Rocket League agent that beat POSTECH 3–0 in 2025. Trained with reinforcement learning, then finished with behaviour cloning (BC) on hundreds of samples and fine-tuning. Reached the ML finals of the RLBot Championship 2025.',
				tags: ['Reinforcement learning', 'Self-play', 'Python'],
				image: 'rocketleague',
				imageAlt: 'The 2025 AI event, Rocket League. Flex leads POSTECH 1–0.',
				featured: true
			},
			{
				id: 'mariokart',
				name: 'Mario Kart AI',
				tagline: 'The Mario Kart agent that won 2026 two–nil',
				body: 'An AI that drives Mario Kart Wii by itself. In the 2026 AI event it took rounds one and two back to back and beat POSTECH 2–0.',
				tags: ['Game AI', 'Mario Kart Wii']
			},
			{
				id: 'rocketsim',
				name: 'RocketSim · pyvrsim',
				tagline: 'A fast Rocket League simulator for training',
				body: 'Training an agent means running the game very fast. So we built a C++ simulator and a Python binding that keeps its parallelism, to speed up Rocket League training.',
				tags: ['C++', 'Python bindings', 'Simulation']
			},
			{
				id: 'neopjuki',
				name: 'Neopjuki',
				tagline: 'A Puoribor agent',
				body: 'An agent for Puoribor, the board game set as the AI event task in 2022–2023. Search, with a neural network on top.',
				tags: ['Search', 'Neural networks', 'Python']
			},
			{
				id: 'melee',
				name: 'Melee-PPO',
				tagline: 'Reinforcement learning for a fighting game',
				body: 'Learning a real-time fighting game with PPO.',
				tags: ['PPO', 'Reinforcement learning']
			},
			{
				id: 'nn101',
				name: 'NN101',
				tagline: 'A deep learning course for new members',
				body: 'Regression first, then classification, MLPs, CNNs, RNNs and Transformers. Materials and assignments go out weekly, with live sessions alongside. It became the AI Winter Camp in January 2026.',
				tags: ['Teaching', 'Curriculum']
			},
			{
				id: 'vlms',
				name: 'VLMS',
				tagline: 'Our learning archive',
				body: 'Seminar material and worked concepts, collected in one public place.',
				tags: ['Archive', 'Wiki']
			}
		]
	},
	history: {
		heading: 'History',
		lead: 'From 2022 to now',
		entries: [
			{
				date: '2026.09',
				title: '2026 KAIST-\u2060POSTECH Science War: won the AI event and the Science Quiz',
				body: 'The AI event (Mario Kart Wii) 2–0, the Science Quiz 280–210. From 2023 to 2025 we took one event a year; this time it was both.',
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
				title: '2025 KAIST-\u2060POSTECH Science War: won the AI event',
				body: 'Beat POSTECH 3–0 in the AI event. Lost the Science Quiz.',
				highlight: true
			},
			{
				date: '2025',
				title: 'Flex reaches the RLBot Championship ML finals',
				body: 'Our Rocket League agent made it to the machine learning finals of an international competition.'
			},
			{
				date: '2024.09',
				title: '2024 KAIST-\u2060POSTECH Science War: won the Science Quiz',
				body: 'Took the Science Quiz, lost the AI event.'
			},
			{
				date: '2023.09',
				title: '2023 KAIST-\u2060POSTECH Science War: won the Science Quiz',
				body: 'Took the Science Quiz, lost the AI event.'
			},
			{ date: '2022.09', title: 'Won both the Science Quiz and the AI event', highlight: true },
			{ date: '2022.04', title: 'Vlab founded' }
		]
	},
	life: {
		heading: 'Beyond the KAIST-\u2060POSTECH Science War',
		lead: 'We gather in the club room a lot, stay up all night, and go out together.',
		captions: [
			{
				title: 'Practice',
				alt: 'Vlab members preparing for the KAIST-\u2060POSTECH Science War in the club room, laptops and a whiteboard'
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
		lead: 'If you don’t mind holding on to one problem for a long time, you are welcome here!',
		body: 'Any major. For the AI team, CS101 is enough to start! For the Science Quiz team, loving science is enough! Learn the rest once you join! If you have questions, please email us.',
		cta: 'Apply',
		ctaNote: 'Opens a Google Form.',
		ctaHref: 'https://forms.gle/AAHfwuAT4VVEYmBG6',
		closed: 'Recruiting is closed right now',
		closedNote: 'When recruiting opens, this button takes you straight to the form.',
		imageAlt:
			'Vlab members in matching blue T-shirts cheering with the award in front of the stage after the 2026 KAIST-\u2060POSTECH Science War',
		photoSlot: 'Our 2026 award photo goes here',
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
			body: 'We look forward to hearing from companies that want to support Vlab.',
			label: 'Ask about sponsorship',
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
		blurb: 'KAIST AI & Science Quiz club',
		email: 'kaist.victorylab@gmail.com',
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
