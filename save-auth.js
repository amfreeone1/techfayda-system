const { chromium } = require('playwright');
const readline = require('readline');

(async () => {
  const context = await chromium.launchPersistentContext('./pw-profile', {
    headless: false,
  });

  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://cloud.activepieces.com/sign-in');

  console.log('');
  console.log('Browser açıldı.');
  console.log('Activepieces-ə login ol.');
  console.log('Workspace tam açıldıqdan sonra bu terminala qayıdıb Enter bas.');
  console.log('');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  await new Promise(resolve => rl.question('Login tamamdırsa Enter bas: ', resolve));
  rl.close();

  await context.storageState({ path: 'auth.json' });
  console.log('auth.json yaradıldı.');

  await context.close();
})();
