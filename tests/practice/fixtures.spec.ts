// import test, { chromium } from "@playwright/test";

// test('open wikipedia without fixtures', async () => {
//     const browser = await chromium.launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto('https://wikipedia.org');
//     await page.waitForTimeout(3000);
//     await browser.close();
// });

import { test } from "../../utils/fixtures/screenSize";

test.describe('Fixture tests', () => {
    test('Open wikipedia in small page', async ({ smallPage }) => {
        smallPage.goto('https://wikipedia.org');
        await smallPage.waitForTimeout(4000);
    })

    test('Open wikipedia in medium page', async ({ smallPage }) => {
        smallPage.goto('https://wikipedia.org');
        await smallPage.waitForTimeout(4000);
    })

    test('Open wikipedia in large page', async ({ largePage }) => {
        largePage.goto('https://wikipedia.org');
        await largePage.waitForTimeout(4000);
    })
})

