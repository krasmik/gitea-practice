import { test, expect, BrowserContext, Page } from '@playwright/test';
import CreateRepositoryPage from '../pom/CreateRepositoryPage';
import SignInPage from '../pom/SignInPage';
import RegisterPage from '../pom/RegisterPage';
import { users } from '../test-data/testUsers';


test.describe('Repository Creation', () => {

    let context: BrowserContext;
    let page: Page;

    let createRepoPage: CreateRepositoryPage;
    let signInPage: SignInPage;
    let registerPage: RegisterPage;

    test.use({ storageState: 'testUser1-state.json' })
    const randomPrefix = Date.now();
    const username = `QaAuto_user_${randomPrefix}`;
    const email = `krasmik+QaAuto_user${randomPrefix}@qamadness.com`
    const password = 'Password123!';

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        signInPage = new SignInPage(page);
        createRepoPage = new CreateRepositoryPage(page);
        registerPage = new RegisterPage(page);
        await createRepoPage.openPage();
        await context.close()
        await page.close();
        // await registerPage.openPage();
        // await registerPage.registerUserWithCredentials(username, email, password);
        // await expect(page.locator('//span[@class="text truncated-item-container"]//span[@class="truncated-item-name"]')).toHaveText(`QaAuto_user_${randomPrefix}`);
    })
    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        signInPage = new SignInPage(page);
        createRepoPage = new CreateRepositoryPage(page);
        registerPage = new RegisterPage(page);
        // await signInPage.openPage();
        // await signInPage.signInWithCredentials(username, password);
        // await expect(page.locator('//span[@class="text truncated-item-container"]//span[@class="truncated-item-name"]')).toHaveText(username);
        await createRepoPage.openPage();
    });

    test.afterAll(async () => {
        await context.close();
    })

    test.afterEach(async () => {
        await page.close();
    })

    test('1. Create basic public repository', async () => {
        await createRepoPage.enterRepositoryName('test-public');
        await createRepoPage.clickCreateButton();
        await createRepoPage.verifyRepositoryCreated();
    });

    test('2. Create private repository', async () => {
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

    test('6. Repo with gitignore - Node', async () => {
        await createRepoPage.openPage();
        await createRepoPage.enterRepositoryName('repo-node-ignore');
        await createRepoPage.selectGitignore('Node');
        await createRepoPage.clickCreateButton();
        await page.getByText('.gitignore').click();
        await expect(page.locator('(//code)[1]')).toHaveText('# ---> Node');
    });
});
