import {test, expect} from '../ui/fixtures/auth.fixture'
import {INVALID_LOGIN_DATA, VALID_LOGIN_DATA} from '../ui/test-data/login.testdata';

test.describe('Login tests', () => {
    test.describe('Positive tests', () => {
        test('should login as basic user', async ({loginPage, page}) => {
            await loginPage.login(VALID_LOGIN_DATA.username, VALID_LOGIN_DATA.password);
            await expect(page.getByText("EasyRPA Control Server", {exact: false})).toBeVisible();
        });
    });

    test.describe('Negative tests', () => {
        INVALID_LOGIN_DATA.forEach((cred) => {
            test(`should return error on login attempt for user: "${cred.username || 'empty username'} and  "${cred.password || 'empty password'} "`, async ({loginPage}) => {
                await loginPage.login(cred.username, cred.password);
                await expect(loginPage.errorBlock).toContainText("Invalid credentials for user");
            });
        });
    });
});