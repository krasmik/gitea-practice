import * as fs from 'fs';
import * as path from 'path';
import { expect, test } from '@playwright/test';
import RegisterPage from '../../pom/pages/RegisterPage';
import Header from '../../pom/modules/Header';
import UserSettingsMenu from '../../pom/modules/UserSettingsMenu';
import ApplicationsSettingsPage from '../../pom/pages/settings/ApplicationsSettingsPage';
test.describe('Repository Creation', () => {
    let registerPage: RegisterPage;
    let header: Header;
    let userSettingsMenu: UserSettingsMenu;
    let applicationsSettingsPage: ApplicationsSettingsPage;

    test('Register new user1, set token and save state', async ({ page }) => {
        registerPage = new RegisterPage(page);
        header = new Header(page);
        userSettingsMenu = new UserSettingsMenu(page);
        applicationsSettingsPage = new ApplicationsSettingsPage(page);

        const randomUser1 = {
            userName: `QaAutoUser1-${Date.now()}`,
            email: `krasmik+QaAutoUser1-${Date.now()}@qamadness.com`,
            password: 'Test1234',
            apiKey: ''
        };

        await registerPage.openPage();
        await registerPage.registerUserWithCredentials(randomUser1.userName, randomUser1.email, randomUser1.password);
        await page.context().storageState({ path: `test-data/states/testUser1-state.json` });
        await header.clickUserAvatar();
        await header.clickSettingsMenuItem();
        await userSettingsMenu.clickApplicationsMenuItem();
        await applicationsSettingsPage.generateTokenWithAllPermissions('QaAuto Token');
        await applicationsSettingsPage.saveGeneratedTokenToUser(randomUser1);

        const usersFilePath = path.resolve(__dirname, '../../test-data/generatedUsers.json');
        fs.writeFileSync(usersFilePath, JSON.stringify({ randomUser1 }, null, 2), 'utf-8');
    });

});
