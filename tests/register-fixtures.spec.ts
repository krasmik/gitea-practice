// import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { expect, test } from '../utils/fixtures/pages';
import { generateUniqueEmail } from '../utils/data-generation/email';
import { RegisterMessages } from '../test-data/messages/register-messages';

test.describe('Register Page Tests', () => {

    test('Successful register', async ({ registerPage, dashboardPage }) => {
        const randomUserName = faker.internet.username();
        const randomPassword = faker.internet.password({ length: 10 });

        await registerPage.register(randomUserName, generateUniqueEmail(), randomPassword, randomPassword);
        await expect(dashboardPage.successRegistrationMessage).toBeVisible();
        await expect(dashboardPage.navBarUserName).toHaveText(randomUserName);
    });

    test('Username is empty', async ({ registerPage }) => {
        const randomPassword = faker.internet.password({ length: 10 });

        await registerPage.register('', generateUniqueEmail(), randomPassword, randomPassword);
        await registerPage.validateEmptyErrorMessage(registerPage.userNameField);
        expect(registerPage.page.url()).toContain(registerPage.url);
    });

    test('Email is empty', async ({ registerPage }) => {
        const randomPassword = faker.internet.password({ length: 10 });

        await registerPage.register(faker.internet.username(), '', randomPassword, randomPassword);
        await registerPage.validateEmptyErrorMessage(registerPage.emailField);
        expect(registerPage.page.url()).toContain(registerPage.url);
    });

    test('Email is incorrect', async ({ registerPage }) => {
        const randomPassword = faker.internet.password({ length: 10 });

        await registerPage.register(faker.internet.username(), 'invalidEmail', randomPassword, randomPassword);
        await expect(registerPage.emailField).toHaveJSProperty('validity.typeMismatch', true);
        await expect(registerPage.emailField).toHaveJSProperty('validationMessage', RegisterMessages.EMAIL_INCORRECT_MESSAGE);
        expect(registerPage.page.url()).toContain(registerPage.url);
    });

    test('Password is empty', async ({ registerPage }) => {
        await registerPage.register(faker.internet.username(), generateUniqueEmail(), '', '');
        await registerPage.validateEmptyErrorMessage(registerPage.passwordField);
        expect(registerPage.page.url()).toContain(registerPage.url);
    });

    test('Confirm Password is empty', async ({ registerPage }) => {
        const randomPassword = faker.internet.password({ length: 10 });

        await registerPage.register(faker.internet.username(), generateUniqueEmail(), randomPassword, '');
        await registerPage.validateEmptyErrorMessage(registerPage.confirmPasswordField);
        expect(registerPage.page.url()).toContain(registerPage.url);
    });

    test('Confirm Password is different', async ({ registerPage }) => {
        const randomPassword = faker.internet.password({ length: 10 });

        await registerPage.register(faker.internet.username(), generateUniqueEmail(), randomPassword, randomPassword + 'diff');
        await expect(registerPage.passwordsDoNotMatchMessage).toBeVisible();
        expect(registerPage.page.url()).toContain(registerPage.url);
    });

});