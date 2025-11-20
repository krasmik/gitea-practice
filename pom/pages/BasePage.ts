import { expect, Locator, Page } from "@playwright/test";
import { step } from "../../util/decorators/step";

export default class BasePage {
    page: Page;
    url: string;

    constructor(page: Page) {
        this.page = page;
        this.url = '';
    }

    @step('Navigate to page')
    async navigateTo() {
        await this.page.goto(this.url);
    }

    @step('Validate empty error message for field')
    async validateEmptyErrorMessage(locator: Locator) {
        await expect(locator).toHaveJSProperty('validity.valueMissing', true)
        const message = await locator.evaluate(el => (el as HTMLInputElement).validationMessage);
        expect(message).toMatch(/Please fill (in|out) this field\./);
    }
}