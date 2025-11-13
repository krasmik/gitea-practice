import BasePage from "./BasePage";

export default class RepositoryPage extends BasePage {
    public repositoryOwnerName = this.page.locator('.repo-header .flex-item-title a').first();
    public repositoryName = this.page.locator('.repo-header .flex-item-title a').nth(1);
    private settingsButton = this.page.locator('[href*=settings]').nth(1);

    async getRepositoryFullName(): Promise<string> {
        const owner = await this.repositoryOwnerName.textContent();
        const repoName = await this.repositoryName.textContent();
        return `${owner}/${repoName}`;
    }

    async navigateToSettings() {
        await this.settingsButton.click();
    }
}