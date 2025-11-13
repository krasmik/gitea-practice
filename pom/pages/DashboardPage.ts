import BasePage from "./BasePage";

export default class DashboardPage extends BasePage {
    public url: string = '/';

    public successRegistrationMessage = this.page.locator('.flash-success>p', { hasText: 'Account was successfully created. Welcome!' });
    public navBarUserName = this.page.locator('.gt-ellipsis').first();
    public newRepositoryButton = this.page.locator('a[data-tooltip-content="New Repository"]');

    async clickNewRepositoryButton() {
        await this.newRepositoryButton.click();
    }
}