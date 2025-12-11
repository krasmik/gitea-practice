import { faker } from "@faker-js/faker";
import * as path from 'path';
import { generateUniqueEmail } from "../../utils/data-generation/email";
import { test, expect } from '../../utils/fixtures/app';
import saveUserData from "../../utils/data-generation/saveUserData";

test('Register testUser1 and save storage state', async ({ app }) => {
    const testUserName = faker.internet.username();
    const testUserEmail = generateUniqueEmail();
    const testUserPassword = faker.internet.password({ length: 10 });

    await app.registerPage.navigateTo();
    await app.registerPage.register(
        testUserName,
        testUserEmail,
        testUserPassword,
        testUserPassword
    );
    await expect(app.dashboardPage.navBarUserName).toHaveText(testUserName);
    await app.page.context().storageState({ path: path.join(__dirname, '..', '..', '.states', 'testUser1.json') });

    // TODO: Create POM classes and methods for the following steps
    await app.page.locator('[aria-label="Profile and Settings…"]').click();
    await app.page.locator('[href="/user/settings"]').click();
    await app.page.locator('[href="/user/settings/applications"]').click();
    await app.page.locator('#name').fill('API-auto-token');

    const checkboxes = app.page.locator('[value*="write"]');
    for (const checkbox of await checkboxes.all()) {
        await checkbox.check();
    }
    await app.page.locator('button:has-text("Generate Token")').click();
    const token = await app.page.locator('div.info.message p').innerText();

    saveUserData({
        userName: testUserName,
        userEmail: testUserEmail,
        userPassword: testUserPassword,
        userToken: token
    }, path.join(__dirname, '..', '..', 'test-data', 'users', 'testUser1.json'));
});