/**
 * Everything you say about yourself on the home page lives here.
 *
 * ── How the prose works ────────────────────────────────────────────────
 * Inside `body` and `text`, wrap a phrase in [[id|Label]] to make it an
 * expandable keyword:
 *
 *     'I came to [[isye|Georgia Tech]] for industrial engineering.'
 *
 * The `id` must match a key in that block's `details` object. The `Label`
 * is what readers see. Plain text around it renders as normal prose.
 *
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
  name: 'Elias Zarco.',
  tagline: 'AI, Optimization & Systems',
  photo: {
    src: '/images/profile/avatar.jpg',
    alt: 'Elias Zarco Gonzalez',
  },
}

export const about: AboutBlock[] = [
  {
    body: 'Born and raised in [[toluca|Toluca]] — an hour outside Mexico City, which is the answer I give when nobody has heard of Toluca.',
    details: {
      toluca: {
        todo: 'Replace the encyclopedia facts with what growing up there was actually like. Add a photo.',
        text: [
          'It sits at about 2,660 metres, which makes it the highest major city in Mexico and colder than anyone expects Mexico to be. Close enough to CDMX to feel its pull, far enough to be its own place.',
        ],
        // image: { src: '/images/story/toluca.jpg', alt: 'Toluca' },
      },
    },
  },
  {
    body: 'For most of high school I was convinced [[policy|public policy]] was how you fixed things, and I spent my weekends in debate rounds arguing about it. It took me longer than it should have to notice that the people actually changing anything were the ones building.',
    details: {
      policy: {
        text: [
          'Competitive debate taught me how to construct an argument and how to lose one in front of an audience. It is still why I care about problems with people on the other end of them. I just stopped believing that arguing was the last step.',
        ],
      },
    },
  },
  {
    body: 'So I went the other way. I came to Georgia Tech for [[isye|industrial engineering]] — the best program in the world for it — and somewhere in the middle I found software and fell for it completely.',
    details: {
      isye: {
        text: [
          'Industrial & Systems Engineering, Data Science & Analytics concentration, with a CS minor in Intelligence.',
          'People ask why an industrial engineer wants to write software. ISYE turns out to be the same material from a different angle, and it trains you to define a problem precisely before you touch it — which has mattered more than knowing one more framework.',
        ],
      },
    },
  },
  {
    body: 'I have kept one foot in business. Through [[clubs|clubs]] I have been building the consulting and banking side of things, mostly because I would rather understand a problem commercially before I model it.',
    details: {
      clubs: {
        text: [
          'Most of that has been the Georgia Tech Student Foundation, a student-managed fund of roughly $2.3M, where I work as a quantitative analyst — ARIMA, SARIMA-GARCH and XGBoost models tracking commodities volatility, plus ensemble strategies with backtesting and risk-adjusted metrics.',
        ],
        link: { href: '/experience#gtsf', label: 'More on that' },
      },
    },
  },
  {
    body: 'In 2025 I was at [[google|Google]], building AI tools for learning. That is where software engineering stopped being coursework and became systems: pipelines, latency, and the distance between a demo and something people actually use.',
    details: {
      google: {
        text: [
          'Summer 2025, on the LearnX team. I built agentic AI pipelines and interactive TypeScript game templates, and cut latency on our Gemini workflows by about 95%.',
        ],
        link: { href: '/experience#google-learnx', label: 'More on that' },
      },
    },
  },
  {
    body: 'Around then the classes and the projects started rhyming. [[ie-ml|Industrial engineering and machine learning]] are largely the same subject in different clothes — probability, optimization, and modeling systems that refuse to hold still.',
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
    todo: 'The bank: name, country, your title, and the dates. This text ships broken until it is filled in.',
    body: 'The summer after, I was at [[bank|a bank in {country}]], implementing AI rather than building it. Getting a model adopted inside an organization is a different problem from getting it to work, and it taught me more about people than about models.',
    details: {
      bank: {
        todo: 'Bank name, country, role, dates — plus one concrete thing you shipped or changed there.',
        text: [
          '[Placeholder — bank name, country, role, and dates still to fill in.]',
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
          'Learned models are good at prediction and bad at guarantees; optimization is the reverse. The interesting work is in the seam — using one to inform the other, and being honest about which half of a decision each is responsible for.',
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
    body: 'Away from all of it: [[hobbies|soccer, history and music]].',
    details: {
      hobbies: {
        todo: 'Needs your voice: the team, the era of history you fall into, what you listen to or play.',
        text: [
          '[Placeholder — worth a sentence in your own voice: the team you follow, the corner of history you fall into, what you listen to or play.]',
        ],
      },
    },
  },
]
