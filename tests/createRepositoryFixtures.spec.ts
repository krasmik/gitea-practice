import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';

test.describe('Repository Creation', () => {
    test.use({ storageState: 'test-data/states/testUser1-state.json' })

    test('1. Create basic public repository', async ({ createRepoPage, pageSmall }) => {
        await createRepoPage.enterRepositoryName('test-public2');
        await createRepoPage.clickCreateButton();
        await createRepoPage.verifyRepositoryCreated();
    });

    test('2. Create private repository', async ({ createRepoPage, pageBig }) => {
        await createRepoPage.openPage();
        await createRepoPage.enterRepositoryName('test-private2');
        await createRepoPage.togglePrivateRepository(true);
        await createRepoPage.clickCreateButton();
        await createRepoPage.verifyRepositoryCreated();
    });

    test('3. Repository with description', async ({ createRepoPage }) => {
        await createRepoPage.openPage();
        await createRepoPage.enterRepositoryName('repo-with-desc2');
        await createRepoPage.enterDescription('My test repo');
        await createRepoPage.clickCreateButton();
        await createRepoPage.verifyRepositoryCreated();
    });

    test('4. Repository with default label set', async ({ createRepoPage }) => {
        await createRepoPage.openPage();
        await createRepoPage.enterRepositoryName('repo-labels2');
        await createRepoPage.selectIssueLabel('Default');
        await createRepoPage.clickCreateButton();
        await createRepoPage.verifyRepositoryCreated();
    });

    test('5. Repository with Advanced labels', async ({ createRepoPage }) => {
        await createRepoPage.openPage();
        await createRepoPage.enterRepositoryName('repo-adv-labels2');
        await createRepoPage.selectIssueLabel('Advanced');
        await createRepoPage.clickCreateButton();
        await createRepoPage.verifyRepositoryCreated();
    });

    test('6. Repo with gitignore - Node', async ({ createRepoPage, page }) => {
        await createRepoPage.openPage();
        await createRepoPage.enterRepositoryName('repo-node-ignore2');
        await createRepoPage.selectGitignore('Node');
        await createRepoPage.clickCreateButton();
        await page.getByText('.gitignore').click();
        await expect(page.locator('(//code)[1]')).toHaveText('# ---> Node');
    });
});
