import test, { expect } from "@playwright/test";
import testUser1Data from '../../test-data/users/testUser1.json';
import { faker } from "@faker-js/faker";
import RepositoryService from "../../api/services/RepositoryService";

test.describe('Repository API Tests', () => {
    let repositoryService: RepositoryService;

    test.beforeEach(async ({ request }) => {
        repositoryService = new RepositoryService(request);
    });

    test.describe('Creating a repository', () => {

        test('Create a repository with just a name', async () => {
            const repoName = `api-repo${faker.number.int()}`;

            const response = await repositoryService.createRepository(testUser1Data.userToken, repoName);

            const responseBody = await response.json();
            expect(response.status()).toBe(201);
            expect(responseBody.name).toBe(repoName);
            expect(responseBody.full_name).toBe(`${testUser1Data.userName}/${repoName}`);
        });

        test('Attempt to create a repository without a name', async () => {
            const response = await repositoryService.createRepository(testUser1Data.userToken, '');

            const responseBody = await response.json();
            expect(response.status()).toBe(422);
            expect(responseBody.message).toBe('[Name]: Required');
        });

        test('Create a repository with a description', async () => {
            const repoName = `api-repo${faker.number.int()}`;
            const repoDescription = faker.lorem.sentence();

            const response = await repositoryService.createRepository(testUser1Data.userToken, repoName, repoDescription);

            const responseBody = await response.json();
            expect(response.status()).toBe(201);
            expect(responseBody.name).toBe(repoName);
            expect(responseBody.description).toBe(repoDescription);
            expect(responseBody.full_name).toBe(`${testUser1Data.userName}/${repoName}`);
        });

        test('Create a repository with an invalid token', async () => {
            const repoName = `api-repo${faker.number.int()}`;
            const response = await repositoryService.createRepository('invalidToken', repoName);

            const responseBody = await response.json();
            expect(response.status()).toBe(401);
            expect(responseBody.message).toBe('user does not exist [uid: 0, name: ]');
        });
    });

    test('Delete a repository after creation', async () => {
        const repoName = `api-repo${faker.number.int()}`;
        const createResponse = await repositoryService.createRepository(testUser1Data.userToken, repoName);
        expect(createResponse.status()).toBe(201);

        const deleteResponse = await repositoryService.deleteRepository(testUser1Data.userToken, testUser1Data.userName, repoName);
        expect(deleteResponse.status()).toBe(204);

    });

});

test.afterAll(async ({ request }) => {
    const repositoryService = new RepositoryService(request);

    const response = await request.get('/api/v1/user/repos', {
        headers: {
            'Authorization': `token ${testUser1Data.userToken}`
        }
    });

    const reposList = await response.json();

    for (const repo of reposList) {
        const repoName: string = repo.name;
        const owner: string = repo.owner.login;
        const response = await repositoryService.deleteRepository(testUser1Data.userToken, owner, repoName);
        expect(response.status()).toBe(204);
    }
});