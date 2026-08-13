import { test as base, expect, APIRequestContext } from "@playwright/test";
import { AuthController } from "../api/controllers/AuthController";
import { NodeController } from "../api/controllers/NodeController";
import {UserController} from "../api/controllers/UserController";
import {AutomationProcessController} from "../api/controllers/AutomationProcessController";

type ApiFixtures = {
  authorizedRequest: APIRequestContext;
  nodeController: NodeController;
  userController: UserController;
  automationProcessController: AutomationProcessController;
};

export const apiTest = base.extend<ApiFixtures>({
  authorizedRequest: async (
    { request, playwright }: { request: APIRequestContext; playwright: any },
    use,
  ) => {
    const authController = new AuthController(request);
    const token = await authController.login();

    const authContext = await playwright.request.newContext({
      extraHTTPHeaders: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    await use(authContext);
    await authContext.dispose();
  },

  nodeController: async ({ authorizedRequest }, use) => {
    await use(new NodeController(authorizedRequest));
  },

  userController: async ({ authorizedRequest }, use) => {
    await use(new UserController(authorizedRequest));
  },

  automationProcessController: async ({ authorizedRequest }, use) => {
    await use(new AutomationProcessController(authorizedRequest));
  },
});

export { expect };
