import {test, expect} from '../ui/fixtures/auth.fixture'
import {INVALID_LOGIN_DATA, VALID_LOGIN_DATA} from '../ui/test-data/login.testdata';
import {MainPage} from "../ui/pages/MainPage";

test.describe('Login tests', () => {
    test.describe('Positive tests', () => {
        test('should login as basic user', async ({loginPage, page}) => {
            await loginPage.login(VALID_LOGIN_DATA.username, VALID_LOGIN_DATA.password);
            const mainPage = new MainPage(page);
            await expect(mainPage.getByText("EasyRPA Control Server", {exact: false})).toBeVisible();
            await expect(mainPage.userButton).toBeVisible();
            await mainPage.logout();
            await expect(page).toHaveURL('/authrpa/login');
            await expect(loginPage.loginInput).toBeVisible();
            await expect(loginPage.passwordInput).toBeVisible();
        });
    });

    test.describe('Negative tests', () => {
        INVALID_LOGIN_DATA.forEach((cred) => {
            test(`should return error on login attempt for user: ${cred.description}"`, async ({loginPage}) => {
                await loginPage.login(cred.username, cred.password);
                await expect(loginPage.errorBlock).toContainText("Invalid credentials for user");
            });
        });
    });
});