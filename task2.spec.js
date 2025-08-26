const { test, expect } = require('@playwright/test');
require('dotenv').config();

const USERNAME = process.env.LOGIN_USER;
const PASSWORD = process.env.LOGIN_PASS;
const WRONG_PASSWORD = process.env.LOGIN_WRONG_PASS;

if (!PASSWORD) throw new Error('LOGIN_PASS is not set');

async function performLogin(page, username, password) {
    await page.fill('[formcontrolname="username"], [ng-model="username"]', username);
    await page.fill('[formcontrolname="password"], [ng-model="password"]', password);
    await page.click('[type="submit"], [ng-click="login()"]');
}

test.describe('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://angular.realworld.io/');
        const signInLink = page.locator('a[routerlink="/login"], text=Sign in');
        await signInLink.click();
    });

    test('Successful login', async ({ page }) => {
        await performLogin(page, USERNAME, PASSWORD);
        await expect(page).toHaveURL('https://angular.realworld.io/logged-in-successfully/');
        await expect(page.locator('h1, [ng-bind="loginMessage"]')).toHaveText('Logged In Successfully');
    });

    test('Invalid password error', async ({ page }) => {
        await performLogin(page, USERNAME, WRONG_PASSWORD);
        const errorMessage = page.locator('#error, [ng-show="loginError"], [ng-bind="errorMessage"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Your password is invalid!');
    });

});
