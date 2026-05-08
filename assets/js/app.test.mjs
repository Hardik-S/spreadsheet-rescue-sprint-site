import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function createClassList() {
  const tokens = new Set();

  return {
    add(...values) {
      for (const value of values) {
        tokens.add(value);
      }
    },
    remove(...values) {
      for (const value of values) {
        tokens.delete(value);
      }
    },
    contains(value) {
      return tokens.has(value);
    }
  };
}

function createElement() {
  return {
    classList: createClassList()
  };
}

const revealElements = [createElement(), createElement(), createElement()];
const header = createElement();
const app = { dataset: {} };

globalThis.document = {
  querySelector(selector) {
    if (selector === '#app') {
      return app;
    }

    if (selector === '.site-header') {
      return header;
    }

    return null;
  },
  querySelectorAll(selector) {
    return selector === '.reveal' ? revealElements : [];
  }
};

globalThis.window = {
  matchMedia() {
    return { matches: false };
  },
  scrollY: 0,
  addEventListener() {}
};

delete globalThis.IntersectionObserver;

await import(`${pathToFileURL(path.resolve('automation-runs/meaningful-git-contribution-gardener/spreadsheet-rescue-sprint-site/assets/js/app.mjs')).href}?test=${Date.now()}`);

assert.ok(
  revealElements.every((element) => element.classList.contains('visible')),
  'reveal elements should be made visible when IntersectionObserver is unavailable'
);
assert.equal(app.dataset.enhanced, 'true');
