import {AutomationProcessesListPage} from "../ui/pages/AutomationProcessesListPage";
import {test as base} from "@playwright/test";
import {LoginPage} from "../ui/pages/LoginPage";
import {VALID_LOGIN_DATA} from "../test-data/ui/login.testdata";
import {MainPage} from "../ui/pages/MainPage";
import {AuthController} from "../api/controllers/AuthController";
import {AutomationProcessController} from "../api/controllers/AutomationProcessController";
import {AUTOMATION_PROCESS_DATA} from "../test-data/api/automation.process.testdata";
import {AutomationProcessPage} from "../ui/pages/AutomationProcessPage";

type AutomationProcessData = {
    automationProcessListPage: AutomationProcessesListPage;
    automationProcessPage: AutomationProcessPage;
    createdAutomationProcess: {
        page: AutomationProcessesListPage;
        automationProcessName: string;
    };
};

export const test = base.extend<AutomationProcessData>({
    automationProcessListPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(VALID_LOGIN_DATA.username, VALID_LOGIN_DATA.password);
        const mainPage = new MainPage(page);
        await mainPage.navigateTo("Automation Processes");
        const automationProcessListPage = new AutomationProcessesListPage(page);
        await use(automationProcessListPage);
    },

    automationProcessPage: async ({ page }, use) => {
        const automationProcessPage = new AutomationProcessPage(page);
        await use(automationProcessPage);
    },

    createdAutomationProcess: async ({ page, automationProcessListPage, request, playwright }, use) => {
        const authController = new AuthController(request);
        const token = await authController.login();

        const authContext = await playwright.request.newContext({
            extraHTTPHeaders: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });

        const automationProcessController = new AutomationProcessController(authContext);
        const automationProcessData = AUTOMATION_PROCESS_DATA;
        await automationProcessController.createAutomationProcess(automationProcessData);

        await use({
            page: automationProcessListPage,
            automationProcessName: automationProcessData.name,
        });
    },
});

export { expect } from "@playwright/test";