// import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
// import { expect, test } from '../utils/fixtures/pages';
import { test, expect } from '../../utils/fixtures/app';
import { generateUniqueEmail } from '../../utils/data-generation/email';
import { RegisterMessages } from '../../test-data/messages/register-messages';

test.describe('Register Page Tests', () => {

    test.beforeEach(async ({ app }) => {
        await app.registerPage.navigateTo();
    });

    test('Successful register', async ({ app }) => {
        const randomUserName = faker.internet.username();
        const randomPassword = faker.internet.password({ length: 10 });

        await app.registerPage.register(randomUserName, generateUniqueEmail(), randomPassword, randomPassword);
        await expect(app.dashboardPage.successRegistrationMessage).toBeVisible();
        await expect(app.dashboardPage.navBarUserName).toHaveText(randomUserName);
    });

    test('Username is empty', async ({ app }) => {
        const randomPassword = faker.internet.password({ length: 10 });

        await app.registerPage.register('', generateUniqueEmail(), randomPassword, randomPassword);
        await app.registerPage.validateEmptyErrorMessage(app.registerPage.userNameField);
        expect(app.registerPage.page.url()).toContain(app.registerPage.url);
    });

    test('Email is empty', async ({ app }) => {
        const randomPassword = faker.internet.password({ length: 10 });

        await app.registerPage.register(faker.internet.username(), '', randomPassword, randomPassword);
        await app.registerPage.validateEmptyErrorMessage(app.registerPage.emailField);
        expect(app.registerPage.page.url()).toContain(app.registerPage.url);
    });

    test('Email is incorrect', async ({ app }) => {
        const randomPassword = faker.internet.password({ length: 10 });

        await app.registerPage.register(faker.internet.username(), 'invalidEmail', randomPassword, randomPassword);
        await expect(app.registerPage.emailField).toHaveJSProperty('validity.typeMismatch', true);
        await expect(app.registerPage.emailField).toHaveJSProperty('validationMessage', RegisterMessages.EMAIL_INCORRECT_MESSAGE);
        expect(app.registerPage.page.url()).toContain(app.registerPage.url);
    });

    test('Password is empty', async ({ app }) => {
        await app.registerPage.register(faker.internet.username(), generateUniqueEmail(), '', '');
        await app.registerPage.validateEmptyErrorMessage(app.registerPage.passwordField);
        expect(app.registerPage.page.url()).toContain(app.registerPage.url);
    });

    test('Confirm Password is empty', async ({ app }) => {
        const randomPassword = faker.internet.password({ length: 10 });

        await app.registerPage.register(faker.internet.username(), generateUniqueEmail(), randomPassword, '');
        await app.registerPage.validateEmptyErrorMessage(app.registerPage.confirmPasswordField);
        expect(app.registerPage.page.url()).toContain(app.registerPage.url);
    });

    test('Confirm Password is different', async ({ app }) => {
        const randomPassword = faker.internet.password({ length: 10 });

        await app.registerPage.register(faker.internet.username(), generateUniqueEmail(), randomPassword, randomPassword + 'diff');
        await expect(app.registerPage.passwordsDoNotMatchMessage).toBeVisible();
        expect(app.registerPage.page.url()).toContain(app.registerPage.url);
    });

});