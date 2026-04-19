# Playwright read-only audit setup

## Prerequisites
- Node.js 20+ installed

## Install
```bash
npm install
npx playwright install

Save login state

npm run save-auth

Launch read-only browser

npm run audit-readonly

Warning

auth.json must not be committed.

pw-profile/ must not be committed.
