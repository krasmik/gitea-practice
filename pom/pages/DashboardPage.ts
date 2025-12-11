import BasePage from "./BasePage";
import { step } from "../../utils/decorators/step";

export default class DashboardPage extends BasePage {
    public url: string = '/';

    public successRegistrationMessage = this.page.locator('.flash-success>p', { hasText: 'Account was successfully created. Welcome!' });
    public navBarUserName = this.page.locator('.gt-ellipsis').first();
    public newRepositoryButton = this.page.locator('a[data-tooltip-content="New Repository"]');

    @step('Click new repository button')
    async clickNewRepositoryButton() {
        await this.newRepositoryButton.click();
    }
}