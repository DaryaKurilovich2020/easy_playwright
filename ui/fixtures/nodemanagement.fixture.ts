import {test as base} from '@playwright/test';
import {LoginPage} from "../pages/LoginPage";
import {VALID_LOGIN_DATA} from "../test-data/login.testdata";
import {BasePage} from "../pages/BasePage";
import {NodePanel} from "../components/NodePanel";
import {NODE_MANAGEMENT_DATA} from "../test-data/nodemanagement.testdata";
import {ConfirmationModal} from "../components/ConfirmationModal";

type NodeManagementFixture = {
    nodeManagementPage: BasePage;
    createdNode: {
        page: BasePage;
        nodeName: string;
    };
};

export const test = base.extend<NodeManagementFixture>({
    nodeManagementPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(VALID_LOGIN_DATA.username, VALID_LOGIN_DATA.password);
        const basePage = new BasePage(page);
        await basePage.navigateToModule("Node Management")
        await use(basePage);
    },

    createdNode: async ({page, nodeManagementPage}, use) => {
        await nodeManagementPage.clickCreateNewRecord();
        const newNodeManagementPanel = new NodePanel(page.locator("#details_panel"));
        const rawData = NODE_MANAGEMENT_DATA;
        const nodeName = rawData.Name;
        const nodeData = Object.entries(rawData);
        for (const [param, value] of nodeData) {
            await newNodeManagementPanel.details.setParameter(param, value);
        }
        await newNodeManagementPanel.clickNodeButton("Create");

        const basePage = new BasePage(page);
        await basePage.goBackToList();

        await use({
            page: basePage,
            nodeName: nodeName,
        });

        // await basePage.goBackToList();
        await basePage.searchByText(nodeName);
        const rowCount = await page.getByText(nodeName).count();
        if (rowCount === 0) return;
        await basePage.table.getRowByColumnValue("Name", nodeName).clickButton("Delete");
        const confirmationModal = new ConfirmationModal(page.getByRole("dialog"));
        await confirmationModal.clickButton("Delete");
    },

});


export {expect} from '@playwright/test';