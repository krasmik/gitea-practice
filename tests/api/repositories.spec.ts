import test, { expect } from "@playwright/test";
import { getTestUsers } from '../../test-data/testUsers';
import RepositoryService from "../../api/services/RepositoryService";

const users = getTestUsers();
const testUser1 = users.randomUser1;

test.describe(('API tests for repos'), () => {
    let randomRepoName: string = `test-repo-${Date.now()}`
    let repositoryService: RepositoryService;


    test.beforeEach(async ({ request }) => {
        repositoryService = new RepositoryService(request);

    })

    test.beforeAll(async ({ request }) => {
        repositoryService = new RepositoryService(request);
        const response = await repositoryService.createNewRepo(testUser1.apiKey, randomRepoName);
        expect(response.status()).toBe(201);
    })

    test('Get all users repositories', async () => {
        const repos = await repositoryService.getAllUserRepositories(testUser1.apiKey);
        expect(Array.isArray(repos)).toBeTruthy();
    });


    test('Create new repository', async () => {
        const repoName = `test-repo-${Date.now()}`;
        const response = await repositoryService.createNewRepo(testUser1.apiKey, repoName);
        expect(response.status()).toBe(201);
    });

    test('Delete a repository', async () => {
        const owner = testUser1.userName;
        const repo = randomRepoName;
        const response = await repositoryService.deleteRepo(testUser1.apiKey, repo, owner);

        expect(response.status()).toBe(204);
    });

    test.afterAll(async ({ request }) => {
        repositoryService = new RepositoryService(request);

        const repos = await repositoryService.getAllUserRepositories(testUser1.apiKey);

        for (let i = 0; i < repos.length; i++) {
            let currentRepoName = repos[i].name;
            const owner = testUser1.userName;
            const response = await repositoryService.deleteRepo(testUser1.apiKey, currentRepoName, owner);

            expect(response.status()).toBe(204);
        }
    });
})
