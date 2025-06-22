import { APIRequestContext } from "@playwright/test";

export default class RepositoryService {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getAllUserRepositories(token: string) {
        const response = await this.request.get('/api/v1/user/repos', {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        return await response.json();
    }

    async createNewRepo(token: string, name: string) {
        const response = await this.request.post('/api/v1/user/repos', {
            data: {
                name: `${name}`,
                description: 'Repo create by autotests'
            },
            headers: {
                'Authorization': `token ${token}`
            }
        });
        return response;
    }

    async deleteRepo(token: string, repoName: string, ownerName: string) {
        return await this.request.delete(`/api/v1/repos/${ownerName}/${repoName}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
    }
}