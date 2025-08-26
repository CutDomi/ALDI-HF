const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.describe.configure({ mode: 'serial' });

async function performLogin(page, username, password) {
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('#submit');
}

if (!PASSWORD) throw new Error('LOGIN_PASS is not set');

test.describe('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://practicetestautomation.com/practice-test-login');
    });

    test('Successful login', async ({ page }) => {
        await performLogin(page, USERNAME, PASSWORD);
        await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
        await expect(page.locator('h1')).toHaveText('Logged In Successfully');
    });

    test('Invalid password error', async ({ page }) => {
        await performLogin(page, USERNAME, WRONG_PASSWORD);
        const errorMessage = page.locator('#error');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Your password is invalid!');
    });

});
