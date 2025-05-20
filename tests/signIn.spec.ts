import { test, expect } from '@playwright/test';
import SignInPage from '../pom/SignInPage';
import { users } from '../test-data/testUsers';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


// Sign In tests:
// Success Sign in with userName
// Success Sign in with email
// Sign in with empty email
// Sign in with empty password
// Sign in with wrong email and password
// Redirection to Forgot Password
// Redirection to Register


test.describe(('Sign In tests'), () => {

    let signInPage: SignInPage;
    test.beforeEach(async ({ page }) => {
        signInPage = new SignInPage(page);

        await signInPage.openPage();
    })

    test('Success Sign in with userName', async ({ page }) => {
        await signInPage.signInWithCredentials(users.testUser1.userName, users.testUser1.password);
        await page.pause();
        await expect(page.locator('//span[@class="text truncated-item-container"]//span[@class="truncated-item-name"]')).toHaveText(users.testUser1.userName);
    })

    test('Success Sign in with email', async ({ page }) => {
        await signInPage.signInWithCredentials(users.testUser1.email, users.testUser1.password);
        await expect(page.locator('//span[@class="text truncated-item-container"]//span[@class="truncated-item-name"]')).toHaveText(users.testUser1.userName);
    })

    test('Success Sign in with empty email', async () => {
        await signInPage.signInWithCredentials('', users.testUser1.password);
        await signInPage.verifyErrorMessageForFieldIsShown('userName')
    })

    test('Success Sign in with empty password', async () => {
        await signInPage.signInWithCredentials(users.testUser1.email, '');
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