import {test as base} from '@playwright/test';
import {LoginPage} from "../pages/LoginPage";
import {BasePage} from "../pages/BasePage";
import {VALID_LOGIN_DATA} from "../test-data/login.testdata";

type AuthFixture = {
    loginPage: LoginPage;
    mainPage: BasePage;
};

export const test = base.extend<AuthFixture>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await use(loginPage);
    },

    mainPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(VALID_LOGIN_DATA.username, VALID_LOGIN_DATA.password);
        const basePage = new BasePage(page);
        await use(basePage);
    },
});


export {expect} from '@playwright/test';