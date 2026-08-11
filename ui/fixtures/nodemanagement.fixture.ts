import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { VALID_LOGIN_DATA } from "../../test-data/ui/login.testdata";
import { NodePanel } from "../components/NodePanel";
import { NODE_MANAGEMENT_DATA } from "../../test-data/ui/nodemanagement.testdata";
import { NodesListPage } from "../pages/NodesListPage";
import { MainPage } from "../pages/MainPage";

type NodeManagementFixture = {
  nodesListPage: NodesListPage;
  createdNode: {
    page: NodesListPage;
    nodeName: string;
  };
};

export const test = base.extend<NodeManagementFixture>({
  nodesListPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(VALID_LOGIN_DATA.username, VALID_LOGIN_DATA.password);
    const mainPage = new MainPage(page);
    await mainPage.navigateTo("Node Management");
    const nodePage = new NodesListPage(page);
    await use(nodePage);
  },

  createdNode: async ({ page, nodesListPage }, use) => {
    await nodesListPage.clickCreateNewRecord();
    const newNodeManagementPanel = new NodePanel(
      page.locator("#details_panel"),
    );
    const rawData = NODE_MANAGEMENT_DATA;
    const nodeName = rawData.Name;
    const nodeData = Object.entries(rawData);
    for (const [param, value] of nodeData) {
      await newNodeManagementPanel.details.setParameter(param, value);
    }
    await newNodeManagementPanel.clickNodeButton("Create");
    const nodePage = new NodesListPage(page);

    await nodePage.goBackToList();

    await use({
      page: nodePage,
      nodeName: nodeName,
    });
  },
});

export { expect } from "@playwright/test";
