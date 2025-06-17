import test, { expect } from "@playwright/test"

test('Install Gitea with basic settings', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('');
    await page.getByText('Install Gitea').click();
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible({ timeout: 50000 });
})