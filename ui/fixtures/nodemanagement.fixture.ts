import {test as base} from '@playwright/test';
import {LoginPage} from "../pages/LoginPage";
import {VALID_LOGIN_DATA} from "../test-data/login.testdata";
import {NodePanel} from "../components/NodePanel";
import {NODE_MANAGEMENT_DATA} from "../test-data/nodemanagement.testdata";
import {NodePage} from "../pages/NodePage";

type NodeManagementFixture = {
    nodeManagementPage: NodePage;
    createdNode: {
        page: NodePage;
        nodeName: string;
    };
};

export const test = base.extend<NodeManagementFixture>({
    nodeManagementPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(VALID_LOGIN_DATA.username, VALID_LOGIN_DATA.password);
        const nodePage = new NodePage(page);
        await nodePage.navigateToModule("Node Management")
        await use(nodePage);
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
        const nodePage = new NodePage(page);

        await nodePage.goBackToList();

        await use({
            page: nodePage,
            nodeName: nodeName,
        });
    },

});


export {expect} from '@playwright/test';