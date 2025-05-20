import { expect, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class SignInPage extends BasePage {
    private readonly userNameField: Locator = this.page.locator('//input[@id="user_name"]');
    private readonly passwordField: Locator = this.page.locator('//input[@id="password"]');
    private readonly signInButton: Locator = this.page.locator('//button[contains(@class, "primary")]');
    private readonly forgotPasswordLink: Locator = this.page.locator('//a[@href="/user/forgot_password"]');
    private readonly registerNowLink: Locator = this.page.locator('//div[@class="field"]//a[@href="/user/sign_up"]');
    private readonly wrongCredentialsMessage: Locator = this.page.locator('//div[contains(@class, "flash-error")]//p');

    async openPage() {
        await this.page.goto('/user/login');
    }

    async enterUserName(userName: string) {
        await this.userNameField.fill(userName);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async signInWithCredentials(userName: string, password: string) {
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickSignInButton();
    }

    async clickForgotPasswordLink() {
        await this.forgotPasswordLink.click();
    }

    async clickRegisterNowLink() {
        await this.registerNowLink.click();
    }

    async verifyErrorMessageForFieldIsShown(fieldName: string) {
        let elementToCheck: Locator;
        if (fieldName === 'userName') {
            elementToCheck = this.userNameField;
        } else {
            elementToCheck = this.passwordField;
        }

        await expect(elementToCheck).toHaveJSProperty('validationMessage', 'Please fill out this field.');
    }

    async verifyWrongCredentialsMessageIsShown() {
        await expect(this.wrongCredentialsMessage).toBeVisible();
    }
}