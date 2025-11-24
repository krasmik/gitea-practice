import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';


type ScreenSizes = {
    smallPage: Page,
    mediumPage: Page,
    largePage: Page;
};

export const test = base.extend<ScreenSizes>({
    smallPage: async ({ page }, use) => {
        await page.setViewportSize({ width: 300, height: 300 });
        await use(page);
        console.log('AFTER USE');
    },
    mediumPage: async ({ page }, use) => {
        await page.setViewportSize({ width: 700, height: 700 });
        await use(page);
        console.log('AFTER USE');
    },
    largePage: async ({ page }, use) => {
        await page.setViewportSize({ width: 1200, height: 1200 });
        await use(page);
        console.log('AFTER USE');
    },

});
export { expect } from '@playwright/test';