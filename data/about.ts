/*
 * ── Marking something unfinished ───────────────────────────────────────
 * Add `todo: 'what is missing'` to any block or detail. Run
 * `npm run content:check` to list everything still outstanding, and in
 * `npm run dev` those spots get a visible DRAFT badge. Neither shows up
 * in a production build — but placeholder *text* does, so clear it.
 */

export type AboutDetail = {
  /** Each string becomes its own paragraph inside the panel. */
  text: string[]
  /** Optional photo, shown beside the text (above it on phones). */
  image?: { src: string; alt: string }
  /** Optional link at the end of the panel. */
  link?: { href: string; label: string }
  todo?: string
}

export type AboutBlock = {
  /** One paragraph of the story. Use [[id|Label]] for keywords. */
  body: string
  details?: Record<string, AboutDetail>
  todo?: string
}

export const intro = {
  name: 'Elias Zarco',
  tagline: 'AI, Optimization & Systems',
  photo: {
    src: '/images/profile/avatar.jpg',
    alt: 'Elias Zarco Gonzalez',
  },
}

export const about: AboutBlock[] = [
  {
    body: 'Born and raised in [[toluca|Toluca]], Mexico a city an hour away from CDMX.',
    details: {
      toluca: {
        text: [
          'Toluca is known for its altitude, red chorizo and one of the best football teams in Mexico. This city was my home for the first 18 years of my life. Had to leave to discover who I was.'
        ],
        image: { src: '/public/images/story/toluca.jpg', alt: 'Toluca' },
      },
    },
  },
  {
    body: 'Early on, I was convinced that [[policy|public policy]] was the best way to change the world, so I focused on competitive debate and preparing to study for an humanities degree during highschool. On my senior year, I realized that if I wanted to create I had to learn how to build things and systems.',
    details: {
      policy: {
        text: [
          'Before doing competitive debate, I rarely voiced my opinions and my concerns. Debate taught me how to be analytical and articulate during discussions.',
          'Made a lot of friends through and learnt a lot about economics, politics and philosophy.'
        ],
        image : {src : '/public/images/story'}
      },
    },
  },
  {
    body: ['Not sure which Engineering degree to study, I chose the most general one. I came to Georgia Tech for [[isye|industrial engineering]] which is the best place on the world to study this.',
          'I ended up finding my focus after taking two introductory Computer Science classes that made me realize that software was the tool to build and bring my ideas to life.'
    ]
    details: {
      isye: {
        text: [
          'Industrial & Systems Engineering, Data Science & Analytics concentration, with a CS minor in Intelligence.',
          'People ask why an industrial engineer would do well in software or AI role. ISYE teaches the math you need to understand Machine Learning and AI from a first principles perspective.',
          'The best about IEs is that they can do anything, all my peers worked/work in different fields ranging from supply chain, banking, operations, consulting, and technology.'
        ],
      },
    },
  },
  {
    body: 'I have always been interested in the business side of things too. Through [[clubs|clubs and projects]] I have been able to build solid business fundamentals that help me understand how complex financial systems work.',
    details: {
      clubs: {
        text: [
          'This interest has been sharpened by my experience in Georgia Tech Investments Committee where I helped manage a 2M doing fundamental and quantitative analysis.',
          'I learned a ton about financial modeling, valuation methods and public presentations. I have also been part of several business and case competitions that have honed my overall consulting skills.'
        ],
        link: { href: '/experience#gtsf', label: 'More on that' },
      },
    },
  },
  {
    body: 'In the summer of 2025, I had the incredible opportunity of working at [[google|Google]] on the Gemini Education team. My project focused on creating interactive AI tools to help kids learn school subjects.',
    details: {
      google: {
        text: [
          'Learnt how to be a full stack engineer and built AI systems. Owned my product end to end, from conception to platform integration. Worked mostly with Kotlin for the backend and TypeScript for the frontend.',
        ],
        link: { href: '/experience#google-learnx', label: 'More on that' },
      },
    },
  },
  {
    body: 'In my last two years of my undergrad career I felt in love with the fundamentals of [[ie-ml| Modern Machine Learning and AI]] as I realized that is what the ultimate intersection of all the skills I had been developing during my previous professional and academic experiences.',
    details: {
      'ie-ml': {
        text: [
          'Optimization is how models get trained. Probability and statistics are the foundation underneath the whole field. Stochastic modeling is what you reach for the moment a system stops being deterministic. The ISYE curriculum was teaching me the machinery of modern ML without calling it that.',
        ],
        link: { href: '/projects', label: 'Where that shows up' },
      },
    },
  },
  {
    body: 'The summer after, I was at [[bank| HSBC Mexico]], implementing AI rather than building it. Getting a model adopted inside an organization is a different problem from getting it to work, and it taught me more about people than about models.',
    details: {
      bank: {
        text: [
          'AI Project Manager at HSBC\'s Transformation Department.',
          'The short version: the hard part was never the modeling. It was the people who had to trust the output, the processes that had to bend around it, and the gap between what a system can do and what an institution is ready to let it do.',
        ],
      },
    },
  },
  {
    body: 'What I want next is to keep deepening the technical foundation while pointing it at problems worth solving. Right now that means the intersection of [[ai-optimization|AI and optimization]], and what both look like in [[domains|healthcare and manufacturing]].',
    details: {
      'ai-optimization': {
        text: [
          ' I am currently exploring the applications of optimization theory in Modern AI , particularly the intersection of Difussion Models and Optimization. ',
        ],
      },
      domains: {
        text: [
          'Both are industries where a better decision compounds into something physical: a shorter wait, a line that does not stop, a resource that reaches the person who needs it. They are also exactly where industrial engineering has been working for a century, which means the domain knowledge already exists to be borrowed.',
        ],
      },
    },
  },
  {
    body: 'On a more personal note, I am passionate about the following thins: [[hobbies|futból, history, startups(coming soon), music, politics, traveling]].',
    details: {
      hobbies: {
        text: [
          'Pretty decent goalkeeper. Avid Toluca FC(best team in Mexico btw) and Bayern Munich fan. Interested in building AI solutions for developing countries.',
          'Closely following geopolitical and ideological developments in Latin America. My favorite three albums - Channel Orange(Frank Ocean), Bocanada(Cerati), Discovery(Daft Punk).',
          'I love spontaneuos traveling, some of my favorite places I have visited have been: Athens, Ibiza, Lindau, Santa Teresa (CR) and Chiapas, Mexico,'
        ],
      },
    },
  },
]
