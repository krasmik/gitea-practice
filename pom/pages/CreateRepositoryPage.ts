import { Locator, Page, expect } from '@playwright/test';
import BasePage from '../BasePage';

export default class CreateRepositoryPage extends BasePage {
    public readonly repoNameInput: Locator = this.page.locator('//input[@id="repo_name"]');
    public readonly visibilityCheckbox: Locator = this.page.locator('//input[@name="private"]');
    private readonly descriptionInput: Locator = this.page.locator('//textarea[@name="description"]');
    private readonly issueLabelDropdown: Locator = this.page.locator('//input[@name="issue_labels"]');
    private readonly gitignoreDropdown: Locator = this.page.locator('//input[@name="gitignores"]');
    public readonly createRepoButton: Locator = this.page.locator('//button[contains(@class, "primary")]');

    async openPage() {
        await this.page.goto('/repo/create');
    }

    async enterRepositoryName(name: string) {
        await this.repoNameInput.fill(name);
    }

    async togglePrivateRepository(enable: boolean) {
        const checked = await this.visibilityCheckbox.isChecked();
        if (checked !== enable) {
            await this.visibilityCheckbox.check();
        }
    }

    async enterDescription(desc: string) {
        await this.descriptionInput.fill(desc);
    }

    async selectIssueLabel(label: string) {
        await this.page.locator('//input[@name="issue_labels"]/..//input[@class="search"]').click();
        await this.page.locator(`//*[@data-value="${label}"]//i`).click();
    }

    async selectGitignore(name: string) {
        await this.page.getByText('Select .gitignore templates.').click();
        await this.page.locator(`//div[text()="Select .gitignore templates."]//..//input[@class="search"]`).fill(name);

        await this.page.locator(`//div[@class="item" and text() ="${name}"]`).click();
    }

    async clickCreateButton() {
        await this.createRepoButton.click();
    }

    async verifyRepositoryCreated() {
        await expect(this.page.getByText('Creating a new repository on the command line')).toBeVisible();
    }
}
