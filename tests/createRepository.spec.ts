import { test, expect } from '@playwright/test';
import CreateRepositoryPage from '../pom/CreateRepositoryPage';
import SignInPage from '../pom/SignInPage';
import RegisterPage from '../pom/RegisterPage';
import { users } from '../test-data/testUsers';


test.describe('Repository Creation', () => {
    let createRepoPage: CreateRepositoryPage;
    let signInPage: SignInPage;
    let registerPage: RegisterPage;

    const randomPrefix = Date.now();
    const username = `QaAuto_user_${randomPrefix}`;
    const email = `krasmik+QaAuto_user${randomPrefix}@qamadness.com`
    const password = 'Password123!';

    test.beforeAll(async ({ page }) => {
        signInPage = new SignInPage(page);
        createRepoPage = new CreateRepositoryPage(page);
        registerPage = new RegisterPage(page);

        await registerPage.openPage();
        await registerPage.registerUserWithCredentials(username, email, password);
        await expect(page.locator('//span[@class="text truncated-item-container"]//span[@class="truncated-item-name"]')).toHaveText(`QaAuto_user_${randomPrefix}`);
    })
    test.beforeEach(async ({ page }) => {
        await signInPage.openPage();
        await signInPage.signInWithCredentials(username, password);
        await expect(page.locator('//span[@class="text truncated-item-container"]//span[@class="truncated-item-name"]')).toHaveText(username);
        await createRepoPage.openPage();
    });

    test('1. Create basic public repository', async () => {
        await createRepoPage.enterRepositoryName('test-public');
        await createRepoPage.clickCreateButton();
        await createRepoPage.verifyRepositoryCreated();
    });

    test('2. Create private repository', async ({ page }) => {
        await createRepoPage.openPage();
        await createRepoPage.enterRepositoryName('test-private');
        await createRepoPage.togglePrivateRepository(true);
        await createRepoPage.clickCreateButton();
        await createRepoPage.verifyRepositoryCreated();
    });

    test('3. Repository with description', async () => {
        await createRepoPage.openPage();
        await createRepoPage.enterRepositoryName('repo-with-desc');
        await createRepoPage.enterDescription('My test repo');
        await createRepoPage.clickCreateButton();
        await createRepoPage.verifyRepositoryCreated();
    });

    test('4. Repository with default label set', async () => {
        await createRepoPage.openPage();
        await createRepoPage.enterRepositoryName('repo-labels');
        await createRepoPage.selectIssueLabel('Default');
        await createRepoPage.clickCreateButton();
        await createRepoPage.verifyRepositoryCreated();
    });

    test('5. Repository with Advanced labels', async () => {
        await createRepoPage.openPage();
        await createRepoPage.enterRepositoryName('repo-adv-labels');
        await createRepoPage.selectIssueLabel('Advanced');
        await createRepoPage.clickCreateButton();
        await createRepoPage.verifyRepositoryCreated();
    });

    test('6. Repo with gitignore - Node', async ({ page }) => {
        await createRepoPage.openPage();
        await createRepoPage.enterRepositoryName('repo-node-ignore');
        await createRepoPage.selectGitignore('Node');
        await createRepoPage.clickCreateButton();
        await page.getByText('.gitignore').click();
        await expect(page.locator('(//code)[1]')).toHaveText('# ---> Node');
    });

    // test('7. Visibility toggle test', async () => {
    //     await createRepoPage.openPage();
    //     await createRepoPage.enterRepositoryName('toggle-visibility');
    //     await createRepoPage.togglePrivateRepository(false);
    //     await createRepoPage.togglePrivateRepository(true);
    //     await createRepoPage.togglePrivateRepository(false);
    //     await createRepoPage.clickCreateButton();
    //     await createRepoPage.verifyRepositoryCreated();
    // });

    // test('8. Long repository name validation', async ({ page }) => {
    //     await createRepoPage.openPage();
    //     const longName = 'a'.repeat(101);
    //     await createRepoPage.enterRepositoryName(longName);
    //     await expect(page.locator('input[name="repo_name"]')).toHaveAttribute('maxlength', '100');
    // });

    // test('9. Prevent creation without repo name', async ({ page }) => {
    //     await createRepoPage.openPage();
    //     await createRepoPage.clickCreateButton();
    //     await expect(page.locator('#create-repo-error-message')).toBeVisible();
    // });

    // test('10. Create multiple repositories sequentially', async () => {
    //     for (let i = 0; i < 3; i++) {
    //         await createRepoPage.openPage();
    //         await createRepoPage.enterRepositoryName(`batch-repo-${i}`);
    //         await createRepoPage.clickCreateButton();
    //         await createRepoPage.verifyRepositoryCreated();
    //     }
    // });

    // test('11. Repository with unique name each time', async () => {
    //     const name = `repo-${Date.now()}`;
    //     await createRepoPage.openPage();
    //     await createRepoPage.enterRepositoryName(name);
    //     await createRepoPage.clickCreateButton();
    //     await createRepoPage.verifyRepositoryCreated();
    // });

    // test('12. Check visibility checkbox interaction', async () => {
    //     await createRepoPage.openPage();
    //     await createRepoPage.enterRepositoryName('check-visibility');
    //     await createRepoPage.togglePrivateRepository(true);
    //     await expect(createRepoPage.visibilityCheckbox).toBeChecked();
    // });

    // test('13. Validate template dropdown behavior', async ({ page }) => {
    //     await createRepoPage.openPage();
    //     await createRepoPage.enterRepositoryName('check-template-ui');
    //     await page.locator('#repo_template_search').click();
    //     await expect(page.locator('#repo_template_search .menu')).toBeVisible();
    // });

    // test('14. Check error message on name conflict', async ({ page }) => {
    //     const name = 'conflict-repo';
    //     await createRepoPage.openPage();
    //     await createRepoPage.enterRepositoryName(name);
    //     await createRepoPage.clickCreateButton();
    //     await createRepoPage.verifyRepositoryCreated();

    //     await createRepoPage.openPage();
    //     await createRepoPage.enterRepositoryName(name);
    //     await createRepoPage.clickCreateButton();
    //     await expect(page.locator('#create-repo-error-message')).toBeVisible();
    // });

    // test('15. Verify UI components exist on load', async () => {
    //     await createRepoPage.openPage();
    //     await expect(createRepoPage.repoNameInput).toBeVisible();
    //     await expect(createRepoPage.createRepoButton).toBeVisible();
    // });
});
