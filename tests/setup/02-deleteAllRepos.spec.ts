import { test, expect } from '@playwright/test';
import { users } from '../../test-data/testUsers';
import RepositoryService from '../../api/services/RepositoryService';

let repositoryService: RepositoryService;

test.describe.skip('Delete repos for all users pre-conditions ', () => {

    test('Delete all User1 repos', async ({ request }) => {
        repositoryService = new RepositoryService(request);

        const repos = await repositoryService.getAllUserRepositories(users.testUser1.apiKey);

        for (let i = 0; i < repos.length; i++) {
            let currentRepoName = repos[i].name;
            const owner = users.testUser1.userName;
            const response = await repositoryService.deleteRepo(users.testUser1.apiKey, currentRepoName, owner);

            expect(response.status()).toBe(204);
        }
    });

});
