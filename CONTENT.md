# Editing your own words

Everything you say about yourself on the home page lives in one file:

```
data/about.ts
```

You don't need to touch any React to change the copy. The page is just a
renderer over that file.

---

## The one piece of syntax

Inside `body` and `text`, wrap a phrase in `[[id|Label]]` to turn it into an
expandable keyword:

```ts
body: 'I came to [[isye|Georgia Tech]] for industrial engineering.'
```

- `isye` is the **id** — it has to match a key in that block's `details`.
- `Georgia Tech` is what readers actually see.

Everything else is plain prose. Write it the way you'd say it.

A keyword and its panel live together in one block:

```ts
{
  body: 'I spent two summers on [[trading|a trading desk]].',
  details: {
    trading: {
      text: [
        'First paragraph of the panel.',
        'Second paragraph — each string is its own paragraph.',
      ],
    },
  },
}
```

If you typo an id, `npm run build` fails and tells you exactly which one and
what the valid options were. You can't ship a keyword that opens nothing.

---

## Adding a photo to a panel

Drop the image in `public/images/story/`, then point at it:

```ts
details: {
  toluca: {
    image: { src: '/images/story/toluca.jpg', alt: 'Downtown Toluca' },
    text: ['What it was actually like growing up there.'],
  },
}
```

The photo sits to the left of the text on a laptop and stacks above it on a
phone. Panels that are closed never download their image, so add as many as
you like.

Roughly square images look best — anything from 600×600 up. Write a real
`alt`: it's what someone using a screen reader hears, and it's the only thing
that shows if the image fails.

---

## Adding a link to a panel

```ts
details: {
  clubs: {
    text: ['...'],
    link: { href: '/experience#gtsf', label: 'More on that' },
  },
}
```

---

## Marking something you haven't written yet

```ts
todo: 'Need the actual story here, not the Wikipedia version.'
```

Then:

```bash
npm run content:check
```

...lists everything still outstanding, with line numbers. While you're running
`npm run dev`, those spots also get a dashed **✎ DRAFT** badge right on the page
so you can see the gaps while you read.

Both the badge and the checklist are development-only. **Placeholder *text*
still ships** — `content:check` returning clean is what tells you the page is
finished.

---

## Two ways to actually work on it

### In your browser, no setup

1. Go to the repo and press <kbd>.</kbd> — GitHub opens a full VS Code editor.
2. Switch to the `claude/personal-website-redesign-gy3gl2` branch.
3. Edit `data/about.ts`, commit.
4. Vercel rebuilds the preview on the pull request in about a minute.

Good for writing copy on a laptop you don't own. You won't see the DRAFT badges
this way, since nothing is running locally.

### On your machine

```bash
git fetch origin
git checkout claude/personal-website-redesign-gy3gl2
npm install
npm run dev
```

Then open http://localhost:3000. Edits to `data/about.ts` show up the moment you
save. Before you push:

```bash
npm run content:check   # anything left to write?
npm run build           # catches broken keyword ids
```

---

## The rest of the site

| What | Where |
| --- | --- |
| Story on the home page | `data/about.ts` |
| Jobs on `/experience` | `data/experience.ts` |
| Projects on `/projects` | `data/projects.ts` |
| Name, tagline, avatar | `intro` at the top of `data/about.ts` |
| Email, GitHub, LinkedIn, résumé | `components/Elsewhere.tsx` |
| Colors and type | `styles/globals.css`, `tailwind.config.ts` |

`data/projects.ts` has three entries with no `year` — they render as `—` until
you fill them in. They're marked `TODO(elias)`.
