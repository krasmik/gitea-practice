import { test, expect } from '@playwright/test';
import SignInPage from '../pom/pages/SignInPage';
import { getTestUsers } from '../test-data/testUsers';

// Get the current test user for UI tests via getTestUsers()
// testUser1 contains all credentials, including apiKey, generated during setup
const users = getTestUsers();
const testUser1 = users.randomUser1; 


test.describe(('Sign In tests'), () => {

    let signInPage: SignInPage;
    test.beforeEach(async ({ page }) => {
        signInPage = new SignInPage(page);

        await signInPage.openPage();
    })

    test('C2 Success Sign in with userName', async ({ page }) => {

        test.step('Sign in as a test user', async () => {
            await signInPage.signInWithCredentials(testUser1.userName, testUser1.password);
        })

        await page.pause();
        await expect(page.locator('//span[@class="text truncated-item-container"]//span[@class="truncated-item-name"]')).toHaveText(testUser1.userName);
    })

    test('C1 Success Sign in with email', async ({ page }) => {
        await signInPage.signInWithCredentials(testUser1.email, testUser1.password);
        await expect(page.locator('//span[@class="text truncated-item-container"]//span[@class="truncated-item-name"]')).toHaveText(testUser1.userName);
    })

    test('Success Sign in with empty email', async () => {
        await signInPage.signInWithCredentials('', testUser1.password);
        await signInPage.verifyErrorMessageForFieldIsShown('userName')
    })

    test('Success Sign in with empty password', async () => {
        await signInPage.signInWithCredentials(testUser1.email, '');
        await signInPage.verifyErrorMessageForFieldIsShown('password')
    })

    test('Sign in with wrong email and password', async () => {
        await signInPage.signInWithCredentials('testUserName', 'testPassword');
        await signInPage.verifyWrongCredentialsMessageIsShown();
    })

    test('Redirection to Forgot Password', async ({ page }) => {
        await signInPage.clickForgotPasswordLink();
        await expect(page).toHaveURL('/user/forgot_password')
    })

    test('Redirection to Register', async ({ page }) => {
        await signInPage.clickRegisterNowLink();
        await expect(page).toHaveURL('/user/sign_up')
    })
})