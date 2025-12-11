import { test, expect } from '../utils/fixtures/app';
import { faker } from '@faker-js/faker';
import * as path from 'path';

test.describe('Create Repository Tests with fixture and storage state', () => {

    test.use({ storageState: path.resolve(__dirname, '../.states/testUser1.json') });

    let testUserName: string;

    test.beforeAll(() => {
        const testUser1Data = require('../test-data/users/testUser1.json');
        testUserName = testUser1Data.userName;
    });

    test.beforeEach(async ({ app }) => {
        await app.dashboardPage.navigateTo();
        await app.dashboardPage.clickNewRepositoryButton();
    });

    test('Successful repository creation with minimal required fields', async ({ app }) => {
        const repoName = `AQA-repo-${faker.number.int()}`;
        const expectedFullRepoName = `${testUserName}/${repoName}`;

        await app.createRepositoryPage.createRepository(repoName);
        expect(expectedFullRepoName).toBe(await app.repositoryPage.getRepositoryFullName());
        expect(app.repositoryPage.page.url()).toContain(expectedFullRepoName);
    });

    test('Repository name is empty', async ({ app }) => {
        await app.createRepositoryPage.createRepository('');
        await app.createRepositoryPage.validateEmptyErrorMessage(app.createRepositoryPage.repositoryNameField);
        expect(app.createRepositoryPage.page.url()).toContain(app.createRepositoryPage.url);
    });

    test('Repository with description provided', async ({ app }) => {
        const repoName = `AQA-repo-${faker.number.int()}`;
        const repoDescription = faker.lorem.sentence();
        await app.createRepositoryPage.createRepository(repoName, { description: repoDescription });
        await expect(app.repositoryPage.repositoryName).toHaveText(repoName);
        await app.repositoryPage.navigateToSettings();
        await expect(app.repositorySettingsPage.descriptionField).toHaveValue(repoDescription);
    });
})
