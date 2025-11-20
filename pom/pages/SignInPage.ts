import BasePage from './BasePage';
import { step } from "../../util/decorators/step";

export default class SignInPage extends BasePage {
    public readonly url: string = '/user/login';
    public readonly emailField = this.page.locator('#user_name');
    public readonly passwordField = this.page.locator('#password');
    public readonly signInButton = this.page.locator('button.primary', { hasText: 'Sign in' });

    @step('Sign in with email: {email}')
    async signIn(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.signInButton.click();
    }
}
