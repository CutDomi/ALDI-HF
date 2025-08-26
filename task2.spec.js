const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

test.describe('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://practicetestautomation.com/practice-test-login');
    });

    test('Successful login', async ({ page }) => {
        await page.fill('#username', 'student');
        await page.fill('#password', 'Password123');
        await page.click('#submit');

        await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
        await expect(page.locator('h1')).toHaveText('Logged In Successfully');
    });

    test('Invalid Password', async ({ page }) => {
        await page.fill('#username', 'student');
        await page.fill('#password', 'wrongPassword');
        await page.click('#submit');

        const errorMessage = page.locator('#error');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Your password is invalid!');
    });
});
