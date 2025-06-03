import { test, expect } from '@playwright/test';
import CreateRepositoryPage from '../../pom/CreateRepositoryPage';
import SignInPage from '../../pom/SignInPage';
import RegisterPage from '../../pom/RegisterPage';
import { users } from '../../test-data/testUsers';


test.describe('Repository Creation', () => {
    let createRepoPage: CreateRepositoryPage;
    let signInPage: SignInPage;
    let registerPage: RegisterPage;



    // test.beforeAll(async ({ page }) => {

    // })
    // test.beforeEach(async ({ page }) => {
    //     await signInPage.openPage();
    //     await signInPage.signInWithCredentials(username, password);
    //     await expect(page.locator('//span[@class="text truncated-item-container"]//span[@class="truncated-item-name"]')).toHaveText(username);
    //     await createRepoPage.openPage();
    // });

    test('Create user and save state', async ({ page }) => {
        const randomPrefix = Date.now();
        const username = `QaAuto_user_${randomPrefix}`;
        const email = `krasmik+QaAuto_user${randomPrefix}@qamadness.com`
        const password = 'Password123!';
        signInPage = new SignInPage(page);
        createRepoPage = new CreateRepositoryPage(page);
        registerPage = new RegisterPage(page);

        await registerPage.openPage();
        await registerPage.registerUserWithCredentials(username, email, password);
        await expect(page.locator('//span[@class="text truncated-item-container"]//span[@class="truncated-item-name"]')).toHaveText(`QaAuto_user_${randomPrefix}`);

        await page.context().storageState({ path: `testUser1-state.json` });
    });

});
