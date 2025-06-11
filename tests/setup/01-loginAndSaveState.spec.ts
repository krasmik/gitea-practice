import { test } from '@playwright/test';
import SignInPage from '../../pom/SignInPage';
import { users } from '../../test-data/testUsers';


test.describe('Repository Creation', () => {
    let signInPage: SignInPage;

    test('Create user and save state', async ({ page }) => {
        signInPage = new SignInPage(page);
        await signInPage.openPage();
        await signInPage.signInWithCredentials(users.testUser1.userName, users.testUser1.password);

        await page.context().storageState({ path: `testUser1-state.json` });
    });

});
