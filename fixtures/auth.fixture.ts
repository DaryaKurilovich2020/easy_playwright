import { test as base } from "@playwright/test";
import { LoginPage } from "../ui/pages/LoginPage";
import { VALID_LOGIN_DATA } from "../test-data/ui/login.testdata";
import { MainPage } from "../ui/pages/MainPage";

type AuthFixture = {
  loginPage: LoginPage;
  mainPage: MainPage;
};

export const test = base.extend<AuthFixture>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await use(loginPage);
  },

  mainPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(VALID_LOGIN_DATA.username, VALID_LOGIN_DATA.password);
    const mainPage = new MainPage(page);
    await use(mainPage);
  },
});

export { expect } from "@playwright/test";
