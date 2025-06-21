import { expect, Locator } from "@playwright/test";
import BasePage from '../BasePage';

export default class RegisterPage extends BasePage {
    private readonly userNameField: Locator = this.page.locator('//input[@id="user_name"]');
    private readonly emailField: Locator = this.page.locator('//input[@id="email"]');
    private readonly passwordField: Locator = this.page.locator('//input[@id="password"]');
    private readonly confirmPasswordField: Locator = this.page.locator('//input[@id="retype"]');
    private readonly registerButton: Locator = this.page.locator('//button[contains(@class, "primary")]');

    async openPage() {
        await this.page.goto('/user/sign_up');
    }

    async registerUserWithCredentials(userName: string, email: string, password: string) {
        await this.userNameField.fill(userName);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.confirmPasswordField.fill(password);
        await this.registerButton.click();
        await expect(this.page.getByText('Account was successfully')).toBeVisible();
    }

}