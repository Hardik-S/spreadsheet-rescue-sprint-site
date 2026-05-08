import assert from 'node:assert/strict';

import { renderDocument } from './render-site.mjs';

const html = renderDocument({
  meta: {
    title: 'Spreadsheet Rescue Sprint | 72-Hour Workflow Rescue',
    description:
      'Turn one brittle spreadsheet workflow into a cleaner, safer system with light automation for owner-operated teams using Google Sheets or Excel.',
    url: 'https://hardik-s.github.io/spreadsheet-rescue-sprint-site/',
    ogImage: './assets/images/hero-workflow.png',
    ogImageAlt:
      'Stylized spreadsheet workflow cleanup view with highlighted status columns and automation cues.',
    ogImageWidth: 1600,
    ogImageHeight: 1680
  },
  brand: { name: 'Spreadsheet Rescue Sprint', label: '72-hour spreadsheet workflow rescue', navigation: [] },
  offer: {
    headline: 'Headline',
    supportingText: 'Supporting text',
    proofLine: 'Proof line',
    emphasis: [],
    fitExamples: [],
    pricingNote: 'Pricing',
    scopeNote: 'Scope note'
  },
  cta: {
    primaryLabel: 'Send a redacted screenshot',
    primarySubject: 'Spreadsheet Rescue Sprint inquiry',
    primaryBodyLines: [],
    secondaryLabel: 'See the process'
  },
  contact: {
    email: 'hshrestha.hba2026@ivey.ca',
    note: 'A redacted screenshot is enough to start.',
    responseTime: 'Usually answered within one business day.'
  },
  images: {
    hero: './assets/images/hero-workflow.png'
  },
  sections: {
    problems: { eyebrow: 'Problems', title: 'Problems', intro: 'Intro', items: [] },
    includes: { eyebrow: 'Includes', title: 'Includes', intro: 'Intro', items: [], note: 'Note' },
    process: { eyebrow: 'Process', title: 'Process', steps: [] },
    audience: { eyebrow: 'Audience', title: 'Audience', intro: 'Intro', profiles: [], caution: 'Caution' },
    difference: { eyebrow: 'Difference', title: 'Difference', rows: [] },
    offerCta: { eyebrow: 'Offer', title: 'Offer', intro: 'Intro', bullets: [] },
    contact: { eyebrow: 'Contact', title: 'Contact', intro: 'Intro' }
  }
});

assert.match(
  html,
  /<meta property="og:image:alt" content="Stylized spreadsheet workflow cleanup view with highlighted status columns and automation cues\." \/>/,
  'renderDocument should expose Open Graph image alt text'
);
assert.match(
  html,
  /<meta property="og:image:width" content="1600" \/>/,
  'renderDocument should expose the Open Graph image width'
);
assert.match(
  html,
  /<meta property="og:image:height" content="1680" \/>/,
  'renderDocument should expose the Open Graph image height'
);
assert.match(
  html,
  /<meta name="twitter:image:alt" content="Stylized spreadsheet workflow cleanup view with highlighted status columns and automation cues\." \/>/,
  'renderDocument should mirror image alt text for Twitter cards'
);
