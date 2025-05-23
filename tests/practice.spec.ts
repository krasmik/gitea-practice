import test, { expect } from "@playwright/test";

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByRole('textbox', { name: 'Username or Email Address *' }).fill('QaAutoUser1');
    await page.getByRole('textbox', { name: 'Password *' }).fill('Test1234');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('span').filter({ hasText: 'QaAutoUser1' }).nth(3)).toBeVisible();
});


test('test 2', async ({ context, page }) => {
    await page.goto('https://practice.expandtesting.com/windows');
    const pagePromise = context.waitForEvent('page');
    await page.getByText('Click Here').click();
    const newPage = await pagePromise;
    // Interact with the new page normally.
    await expect(newPage.locator('h1')).toHaveText('Example of a new window page for Automation Testing Practice');
    await expect(page.locator('h1')).toHaveText('Opening a new window page for Automation Testing Practice');
});



