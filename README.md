Project Goals:

Install Playwright and create tests
Automate adding 3 todos, mark 1 as completed, delete
Generate Playwright HTML report and open it
Add assertions and check failure in report
Take screenshots and video on failure and attach to report
Run with interactive ui, debug mode, and trace on
Scenario Details

Demo App: https://todomvc.com/examples/react/dist/

Scenario: Automate core Todo actions (add, complete, delete) on the TodoMVC app.

Key Learnings: Setup, locators, assertions, interactions, and advanced reporting configurations.

Tools: Node.js, Playwright (use latest if possible), VS Code (or any editor).

End Result: A working Playwright Test that runs locally, produces an HTML report, and captures debugging assets on failure.

Step-by-Step Implementation and Commands
-
Step 1 - Create a new project folder and open in VS Code (or any IDE)
Step 2 - On terminal goto project folder location and check if node is installed -  node -v   npm -v
Step 3 - Create project folder and initialize npm -  npm init -y   npm init -y creates package.json.
Step 4 - Install Playwright Test (dev dependency) and install browsers:
npm init playwright@latest
npx playwright install
npx playwright install downloads Chromium/Firefox/WebKit used by Playwright.
Step 5 - Create tests/todo.spec.ts (TypeScript)  or  tests/todo.spec.js (JavaScript)
-
Step 6 - Add test script
Can also record  - npx playwright codegen https://todomvc.com/examples/react/dist/

Perform the following actions:
Add a new To-Do: “Buy Groceries”
Add another: “Pay Bills”
Mark “Buy Groceries” as complete
Delete “Pay Bills”
Add assertions for visibility and text
-
Step 7 - Run all tests (headless) -   npx playwright test
Step 8 - Run in headed mode -    npx playwright test --headed
        npx playwright test --headed --project=chromium
Try  npx playwright test --ui
Can use tags for running, Can do playback in slow motion
Step 9 - Generate and view HTML report - npx playwright test --headed --reporter=html
npx playwright show-report 
Step 10 - Add Assertion - 
await expect(page.locator('.todo-list li')).toHaveCount(2);
Re-run and verify both tasks appear before one is completed
-

Step 11 - In config file add scripts to take screenshot on failure
Make some assertions fail, run and check report
-

// playwright.config.js
import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir: './tests',
 reporter: [['html', { open: 'never' }]],
 use: {
   browserName: 'chromium',
   headless: false,
   screenshot: 'only-on-failure',   // Take screenshot only when test fails
   trace: 'retain-on-failure',      // Optional: keeps trace for debugging
   video: 'retain-on-failure'       // (Optional) Record video if test fails
 },
});


TIPS
How to always run on chrome browser in headed mode config file headless: false
How to run in debug mode - npx playwright test --debug
How to run with interactive ui -  npx playwright test --ui 
How to run with Trace -   npx playwright test --trace on
You can then open the HTML report and click on the trace icon to open the trace.
'on-first-retry' - Record a trace only when retrying a test for the first time.
'on-all-retries' - Record traces for all test retries.
'off' - Do not record a trace.
'on' - Record a trace for each test. (not recommended as it's performance heavy)
'retain-on-failure' - Record a trace for each test, but remove it from successful test runs.
How to add tags and run specific tagged tests - test.describe('Todo Tests @smoke', () =＞ { ... });
npx playwright test --grep @smoke
