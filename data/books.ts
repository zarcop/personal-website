/**
 * The four books on the shelf: what I care about outside of STEM.
 *
 * Each book is a list of pages, read two at a time as an open spread. Keep a
 * text page under ~140 words or it will not fit the page at the reader's size.
 *
 * Images live in public/images/books. Every one is public domain or CC BY-SA
 * from Wikimedia Commons; the CC ones must keep their `credit` line, which is
 * printed under the image. Joan Miró's work is still under copyright, so his
 * page has words and no picture.
 */

export type BookFigure = {
  src: string
  alt: string
  width: number
  height: number
  caption: string
  /** Author and licence. Required by CC BY-SA; also kept for public-domain works. */
  credit: string
}

export type BookPage =
  | { kind: 'title'; title: string; subtitle: string; epigraph: { text: string; source: string } }
  | { kind: 'text'; heading?: string; paragraphs: string[] }
  | { kind: 'figure'; figure: BookFigure }

export type Book = {
  id: string
  /** Short title, printed on the spine and the tab. */
  spine: string
  /** Cloth colour of the cover, also used on the shelf in the room. */
  cloth: string
  pages: BookPage[]
  todo?: string
}

export const books: Book[] = [
  {
    id: 'history',
    spine: 'History',
    cloth: '#6e2a24',
    todo: 'Drafted from your notes. Check the wording sounds like you.',
    pages: [
      {
        kind: 'title',
        title: 'History',
        subtitle: 'Where we have been, and what it cost',
        epigraph: { text: 'Historia magistra vitae.', source: 'Cicero, De Oratore' },
      },
      {
        kind: 'text',
        heading: 'Why it matters to me',
        paragraphs: [
          'History is one of my oldest passions. I read it because it is the only record we have of our own mistakes, written by the people who made them or by the people who paid for them.',
          'It is also the only place where you can watch progress happen. Not in a straight line, and never for free, but it happens: laws, ideas and institutions built slowly over the ruins of whatever came before.',
          'Four stretches of it keep pulling me back.',
        ],
      },
      {
        kind: 'text',
        heading: 'The ancient Middle East',
        paragraphs: [
          'This is where I geek out most. I am fascinated by the origins of Judaism: how a small people between empires shaped ideas that half the world still lives by.',
          'And by the traditions around it. Zoroastrianism, the faith of the Persian empire, with its struggle between good and evil, its judgement and its angels. Scholars still argue over how much it shaped Judaism after Cyrus let the exiles go home from Babylon.',
          'Then the Yazidis, whose faith has survived in the mountains of northern Iraq for centuries, against everything that tried to end it.',
        ],
      },
      {
        kind: 'figure',
        figure: {
          src: '/images/books/faravahar.png',
          alt: 'The Faravahar, a winged disc with a human figure, the best-known symbol of Zoroastrianism',
          width: 700,
          height: 375,
          caption: 'The Faravahar, the winged symbol of Zoroastrianism.',
          credit: 'Ploxhoi and Kevin McCormick · CC BY-SA 3.0 · Wikimedia Commons',
        },
      },
      {
        kind: 'figure',
        figure: {
          src: '/images/books/lalish.jpg',
          alt: 'The conical stone spires of the Yazidi temple at Lalish, in the hills of northern Iraq',
          width: 666,
          height: 1000,
          caption: 'Lalish, the holiest place of the Yazidi faith.',
          credit: 'Luay Qassim Hassan · CC BY-SA 4.0 · Wikimedia Commons',
        },
      },
      {
        kind: 'text',
        heading: 'Rome, and what grew from it',
        paragraphs: [
          'The fall of the Western Roman Empire is usually told as an ending. I read it as a beginning.',
          'The Germanic kingdoms that took over did not start from nothing. Visigoths in Hispania, Franks in Gaul, Ostrogoths and then Lombards in Italy: each of them built on Roman roads, Roman law, Roman cities and the Roman church.',
          'Out of those foundations came the nations that would become Europe. Spain, France and Italy are, in a real sense, what Rome turned into.',
        ],
      },
      {
        kind: 'figure',
        figure: {
          src: '/images/books/sack-of-rome.jpg',
          alt: 'Painting of Visigoth warriors pulling down statues as Rome is sacked',
          width: 561,
          height: 1000,
          caption: 'The Sack of Rome by the Visigoths, 410. Joseph-Noël Sylvestre, 1890.',
          credit: 'Public domain · Wikimedia Commons',
        },
      },
      {
        kind: 'text',
        heading: 'Byzantium',
        paragraphs: [
          'Meanwhile the Roman Empire did not fall in the East at all. It lasted another thousand years from Constantinople, until 1453.',
          'Byzantium kept Roman law alive, Greek learning alive and Christianity organised, and it stood as Europe’s wall to the east for centuries. We mostly forget it, which is exactly why I find it so interesting.',
        ],
      },
      {
        kind: 'figure',
        figure: {
          src: '/images/books/hagia-sophia.jpg',
          alt: 'The Hagia Sophia in Istanbul, a vast domed building with four minarets',
          width: 1000,
          height: 667,
          caption: 'Hagia Sophia, finished under Justinian in 537.',
          credit: 'Arild Vågen · CC BY-SA 3.0 · Wikimedia Commons',
        },
      },
      {
        kind: 'text',
        heading: 'The two world wars',
        paragraphs: [
          'And of course the two world wars: the clearest lesson we have in what happens when nationalism, broken economies and new technology meet.',
          'In thirty years they redrew every border in Europe and ended its empires, and they built most of the institutions we still live inside. I keep coming back to them to understand how ordinary people let it happen, and how others refused to.',
        ],
      },
    ],
  },
  {
    id: 'politics',
    spine: 'Politics & Economics',
    cloth: '#24384f',
    todo: 'Drafted from your notes. Check the wording sounds like you.',
    pages: [
      {
        kind: 'title',
        title: 'Politics & Economics',
        subtitle: 'How decisions at the top reach everyone else',
        epigraph: {
          text: 'It does not matter whether a cat is black or white, as long as it catches mice.',
          source: 'Attributed to Deng Xiaoping',
        },
      },
      {
        kind: 'text',
        heading: 'The bigger picture',
        paragraphs: [
          'I am interested in how politics and economics shape the bigger picture: what a law, a tariff or a central-bank decision ends up meaning for a family.',
          'Coming from Mexico, I care most about how that plays out in Latin America. Our economies are exposed to every swing in commodity prices and every change in Washington, and the bill tends to land on the people with the least room to absorb it.',
        ],
      },
      {
        kind: 'text',
        heading: 'Chile and the neoliberal experiment',
        paragraphs: [
          'Chile is the case I keep returning to. From the late 1970s it became the region’s neoliberal laboratory: privatisation, open trade and pensions run through private accounts, designed by economists trained in Chicago.',
          'It grew faster than its neighbours and cut poverty dramatically. It also stayed deeply unequal, and in 2019 that inequality spilled onto the streets.',
          'Both of those things are true at once. That is exactly what makes it worth studying instead of picking a side.',
        ],
      },
      {
        kind: 'figure',
        figure: {
          src: '/images/books/la-moneda.jpg',
          alt: 'The neoclassical facade of the Palacio de La Moneda in Santiago, Chile',
          width: 1000,
          height: 666,
          caption: 'La Moneda, the presidential palace in Santiago.',
          credit: 'Draceane · CC BY-SA 4.0 · Wikimedia Commons',
        },
      },
      {
        kind: 'text',
        heading: 'The pendulum',
        paragraphs: [
          'Latin American politics never seems to settle. The region swung left in the 2000s, right in the 2010s, and has kept swinging since, often from one election to the next.',
          'I want to understand why: what each side promises, what it actually delivers, and why voters keep reaching for the other option when it does not.',
        ],
      },
      {
        kind: 'text',
        heading: 'Deng Xiaoping’s balancing act',
        paragraphs: [
          'Outside the region, the economic story that fascinates me most is China after 1978.',
          'Deng Xiaoping let farmers sell their surplus, opened special economic zones like Shenzhen to foreign capital and let markets set more and more prices, all while the Communist Party kept complete political control.',
          'He lifted hundreds of millions of people out of poverty without giving up the party’s agenda. Whatever you think of the system, it is one of the most consequential balancing acts in economic history.',
        ],
      },
      {
        kind: 'figure',
        figure: {
          src: '/images/books/deng.jpg',
          alt: 'Deng Xiaoping and Jimmy Carter standing together at a ceremony at the White House',
          width: 1000,
          height: 790,
          caption: 'Deng Xiaoping with Jimmy Carter at the White House, 1979.',
          credit: 'U.S. National Archives · Public domain · Wikimedia Commons',
        },
      },
    ],
  },
  {
    id: 'faith',
    spine: 'Faith & Philosophy',
    cloth: '#3f4a2e',
    todo: 'Drafted from your notes. Check the wording sounds like you.',
    pages: [
      {
        kind: 'title',
        title: 'Faith & Philosophy',
        subtitle: 'What I try to live by',
        epigraph: { text: 'So the last shall be first, and the first last.', source: 'Matthew 20:16' },
      },
      {
        kind: 'text',
        heading: 'Faith',
        paragraphs: [
          'I am a Christian, and I hold a strong belief that Jesus Christ set the best moral framework there is to follow.',
          'The part I try to carry with me every day is the idea that the last shall be first. It changes how you treat people: the ones nobody is watching, the ones who cannot do anything for you, the ones at the back of the line.',
          'It is also a check on ambition. Whatever I build, the point is who it serves.',
        ],
      },
      {
        kind: 'figure',
        figure: {
          src: '/images/books/sermon-on-the-mount.jpg',
          alt: 'Painting of Jesus seated on a hillside, teaching a crowd gathered around him',
          width: 891,
          height: 1000,
          caption: 'The Sermon on the Mount. Carl Bloch, 1877.',
          credit: 'Public domain · Wikimedia Commons',
        },
      },
      {
        kind: 'text',
        heading: 'The Stoics',
        paragraphs: [
          'On the philosophical side, I have a real soft spot for the Stoics.',
          'Marcus Aurelius’s Meditations is the book I go back to most. It was never meant to be read: it is the private notebook of the most powerful man in the world, reminding himself to be patient, to do his work well and not to be ruled by what he cannot control.',
          'I find that it sits comfortably next to my faith. Both ask you to master yourself before you try to master anything else.',
        ],
      },
      {
        kind: 'figure',
        figure: {
          src: '/images/books/marcus-aurelius.jpg',
          alt: 'Marble bust of the Roman emperor Marcus Aurelius, bearded, with curled hair',
          width: 639,
          height: 1000,
          caption: 'Marcus Aurelius, emperor and Stoic, in the Glyptothek, Munich.',
          credit: 'Public domain · Wikimedia Commons',
        },
      },
      {
        kind: 'text',
        paragraphs: [
          'No longer talk at all about the kind of man that a good man ought to be, but be such.',
          'Marcus Aurelius, Meditations X.16, in George Long’s translation.',
        ],
      },
    ],
  },
  {
    id: 'art',
    spine: 'Museums & Art',
    cloth: '#7a5a1f',
    todo: 'Drafted from your notes. Check the wording sounds like you.',
    pages: [
      {
        kind: 'title',
        title: 'Museums & Art',
        subtitle: 'The rooms I could get lost in',
        epigraph: {
          text: 'To every age its art, to art its freedom.',
          source: 'Motto of the Vienna Secession',
        },
      },
      {
        kind: 'text',
        heading: 'Museums',
        paragraphs: [
          'I love museums. Give me a free afternoon in a new city and that is where I will be.',
          'My favourites: the Prado and the Thyssen-Bornemisza in Madrid, which between them can take you from El Greco to the twentieth century in a single walk; the Louvre, which is impossible to finish; and the Museo Soumaya in Mexico City, as remarkable from the outside as it is inside.',
        ],
      },
      {
        kind: 'figure',
        figure: {
          src: '/images/books/prado.jpg',
          alt: 'The Museo del Prado in Madrid, a long neoclassical building behind a statue',
          width: 1000,
          height: 747,
          caption: 'Museo del Prado, Madrid.',
          credit: 'Emilio J. Rodríguez Posada · CC BY-SA 2.0 · Wikimedia Commons',
        },
      },
      {
        kind: 'figure',
        figure: {
          src: '/images/books/soumaya.jpg',
          alt: 'The Museo Soumaya in Mexico City, a curved building covered in silver hexagonal tiles',
          width: 1000,
          height: 912,
          caption: 'Museo Soumaya, Mexico City.',
          credit: 'Diego Delso · CC BY-SA 4.0 · Wikimedia Commons',
        },
      },
      {
        kind: 'figure',
        figure: {
          src: '/images/books/louvre.jpg',
          alt: 'The glass pyramid in the courtyard of the Louvre in Paris, at dusk',
          width: 1000,
          height: 420,
          caption: 'The Louvre, Paris.',
          credit: 'Benh Lieu Song · CC BY-SA 3.0 · Wikimedia Commons',
        },
      },
      {
        kind: 'text',
        heading: 'Gustav Klimt',
        paragraphs: [
          'Klimt is my favourite painter. The gold is what everyone notices first, and it is real gold leaf, but what keeps me looking is how he sets soft, human faces inside all that flat, glittering pattern.',
          'The Kiss is the obvious choice, and I do not care that it is obvious.',
        ],
      },
      {
        kind: 'figure',
        figure: {
          src: '/images/books/the-kiss.jpg',
          alt: 'Klimt’s The Kiss: two lovers embracing, wrapped in robes of gold patterns',
          width: 997,
          height: 1000,
          caption: 'The Kiss. Gustav Klimt, 1907–1908. Belvedere, Vienna.',
          credit: 'Public domain · Wikimedia Commons',
        },
      },
      {
        kind: 'text',
        heading: 'El Greco and Miró',
        paragraphs: [
          'El Greco painted like nobody of his time: long, flickering figures and skies that look like they are about to break open. A Greek from Crete who became the painter of Toledo.',
          'Joan Miró is the other end of the scale: bright, playful and almost childlike, until you notice how carefully every line was placed. His foundation in Barcelona is worth the trip on its own.',
        ],
      },
      {
        kind: 'figure',
        figure: {
          src: '/images/books/view-of-toledo.jpg',
          alt: 'El Greco’s View of Toledo: the city on a green hill under a dark, stormy sky',
          width: 886,
          height: 1000,
          caption: 'View of Toledo. El Greco, c. 1600. The Met, New York.',
          credit: 'Public domain · Wikimedia Commons',
        },
      },
    ],
  },
]
