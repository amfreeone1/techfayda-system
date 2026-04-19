const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  if (!fs.existsSync('auth.json')) {
    console.error('auth.json tapılmadı. Əvvəl npm run save-auth işlə.');
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    storageState: 'auth.json',
  });

  const allowedMethods = new Set(['GET', 'HEAD', 'OPTIONS']);
  await context.route('**/*', async route => {
    const method = route.request().method();
    if (!allowedMethods.has(method)) {
      await route.abort();
      return;
    }
    await route.continue();
  });

  const page = await context.newPage();
  await page.goto('https://cloud.activepieces.com');
  await page.waitForLoadState('networkidle');

  console.log('Activepieces loginli açıldı. Read-only audit üçün hazırdır.');
  console.log('Mutasiya sorğuları bloklanır; yalnız GET/HEAD/OPTIONS icazəlidir.');
  console.log('Brauzer açıq qalacaq. Çıxmaq üçün terminalda Ctrl+C bas.');

  process.stdin.resume();
  await new Promise(() => {});
})();
