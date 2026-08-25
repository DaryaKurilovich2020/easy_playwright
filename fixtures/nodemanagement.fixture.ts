import {test as base} from "@playwright/test";
import {LoginPage} from "../ui/pages/LoginPage";
import {VALID_LOGIN_DATA} from "../test-data/ui/login.testdata";
import {NODE_MANAGEMENT_DATA} from "../test-data/ui/nodemanagement.testdata";
import {NodesListPage} from "../ui/pages/NodesListPage";
import {MainPage} from "../ui/pages/MainPage";
import {NodeController} from "../api/controllers/NodeController";
import {AuthController} from "../api/controllers/AuthController";
import {NodeDataFactory} from "../test-data/api/node.testdata";
import {NodePage} from "../ui/pages/NodePage";

type NodeManagementFixture = {
    nodesListPage: NodesListPage;
    nodePage: NodePage;
    createdNode: {
        page: NodesListPage;
        nodeName: string;
    };
};

export const test = base.extend<NodeManagementFixture>({
    nodesListPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(VALID_LOGIN_DATA.username, VALID_LOGIN_DATA.password);
        const mainPage = new MainPage(page);
        await mainPage.navigateTo("Node Management");
        const nodePage = new NodesListPage(page);
        await use(nodePage);
    },

    nodePage: async ({page}, use) => {
        const nodePage = new NodePage(page);
        await use(nodePage);
    },

    createdNode: async ({page, nodesListPage, request, playwright}, use) => {
        const authController = new AuthController(request);
        const token = await authController.login();

        const authContext = await playwright.request.newContext({
            extraHTTPHeaders: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });

        const nodeController = new NodeController(authContext);
        const validNode = NODE_MANAGEMENT_DATA;
        const payload = NodeDataFactory.createValidNodePayload(validNode.Name, validNode.Description, validNode["Working Directory"]);
        let response = await nodeController.createNode(payload);
        let body = await response.json();
        const nodeId = Number(body.id);

        await nodesListPage.openRecordByName(validNode.Name);
        const nodePage = new NodePage(page);

        await nodePage.goBackToList();

        await use({
            page: nodesListPage,
            nodeName: validNode.Name,
        });

        await nodeController.deleteNode(nodeId);
    },
});

export {expect} from "@playwright/test";