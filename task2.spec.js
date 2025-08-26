const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.describe.configure({ mode: 'serial' });

const USERNAME = process.env.LOGIN_USER;
const PASSWORD = process.env.LOGIN_PASS;
const WRONG_PASSWORD = process.env.LOGIN_WRONG_PASS;

if (!PASSWORD) throw new Error('LOGIN_PASS is not set');

async function performLogin(page, username, password) {
    await page.fill('[formcontrolname="email"], [ng-model="email"]', username);
    await page.fill('[formcontrolname="password"], [ng-model="password"]', password);
    await page.click('[type="submit"], [ng-click="login()"]');
}

test.describe('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://angular.realworld.io/login');
    });

    test('Successful login', async ({ page }) => {
        await performLogin(page, USERNAME, PASSWORD);
        await expect(page).toHaveURL('https://angular.realworld.io/logged-in-successfully/');
        await expect(page.locator('h1, [ng-bind="loginMessage"]')).toHaveText('Logged In Successfully');
    });

    test('Invalid password shows error', async ({ page }) => {
        await performLogin(page, USERNAME, WRONG_PASSWORD);

        const errorMessage = page.locator('[id="error"], [ng-show="loginError"], [ng-bind="errorMessage"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Your password is invalid!');
    });

});