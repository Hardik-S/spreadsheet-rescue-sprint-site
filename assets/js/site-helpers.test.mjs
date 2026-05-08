import assert from 'node:assert/strict';

import { resolveSecondaryAction } from './site-helpers.mjs';

const primaryHref =
  'mailto:primary@example.com?subject=Spreadsheet%20Rescue%20Sprint%20inquiry&body=Line%201';

const action = resolveSecondaryAction(
  {
    secondaryEmail: 'secondary@example.com',
    secondaryLabel: 'Email the workflow'
  },
  {},
  primaryHref
);

assert.equal(
  action.href,
  'mailto:secondary@example.com?subject=Spreadsheet%20Rescue%20Sprint%20inquiry&body=Line%201'
);
assert.equal(action.label, 'Email the workflow');
assert.equal(action.isExternal, false);
