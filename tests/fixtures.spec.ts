import { chromium } from "@playwright/test";
import { test } from "../fixtures/fixtureBrowserSize";

test('Open page without fixture', async () => {
    const browser = await chromium.launch();

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto('/');

    await page.waitForTimeout(4000);

})

test.describe('Fixture tests', () => {
    test('Open page with fixture 1', async ({ pageSmall }) => {
        await pageSmall.goto('/');

    })

    test('Open page with fixture 2', async ({ pageMedium }) => {
        await pageMedium.goto('/');

    })

    test('Open page with fixture 3', async ({ page, pageBig }) => {
        await pageBig.goto('/');
    })

    test('Open page with fixture 4', async ({ pageSmall }) => {
        await pageSmall.goto('/');
    })
})
