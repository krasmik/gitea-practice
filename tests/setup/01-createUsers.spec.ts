import { expect, test } from '@playwright/test';
import { users } from '../../test-data/testUsers';
import RegisterPage from '../../pom/pages/RegisterPage';
import Header from '../../pom/modules/Header';
import UserSettingsMenu from '../../pom/modules/UserSettingsMenu';
import ApplicationsSettingsPage from '../../pom/pages/settings/ApplicationsSettingsPage';
test.describe('Repository Creation', () => {
    let registerPage: RegisterPage;
    let header: Header;
    let userSettingsMenu: UserSettingsMenu;
    let applicationsSettingsPage: ApplicationsSettingsPage;

    test('Register new user, set token and save state', async ({ page }) => {
        registerPage = new RegisterPage(page);
        header = new Header(page);
        userSettingsMenu = new UserSettingsMenu(page);
        applicationsSettingsPage = new ApplicationsSettingsPage(page);

        await registerPage.openPage();
        await registerPage.registerUserWithCredentials(users.randomUser1.userName, users.randomUser1.email, users.randomUser1.password);
        await page.context().storageState({ path: `/test-data/states/testUser1-state.json` });
        await header.clickUserAvatar();
        await header.clickSettingsMenuItem();
        await userSettingsMenu.clickApplicationsMenuItem();
        await applicationsSettingsPage.generateTokenWithAllPermissions('QaAuto Token');
        await applicationsSettingsPage.saveGeneratedTokenToUser(users.randomUser1)
    });

});
