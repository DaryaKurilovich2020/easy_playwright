import {apiTest} from "../../fixtures/api.fixture";
import {expect} from "@playwright/test";
import {AUTOMATION_PROCESS_DATA} from "../../test-data/api/automation.process.testdata";

apiTest.describe("API: Isolated Automation Process Create Operations", () => {
    let automationProcessId: number;
    apiTest.afterEach(async ({automationProcessController}) => {
        if (automationProcessId) {
            await automationProcessController.deleteAutomationProcess(automationProcessId);
        }
    });

    apiTest("should CREATE a new Automation Process @smoke", async ({automationProcessController}) => {
        const payload = AUTOMATION_PROCESS_DATA;
        const response = await automationProcessController.createAutomationProcess(payload);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty("id");
        expect(body.name).toBe(payload.name);

        automationProcessId = body.id;
    });

    apiTest("should not CREATE a new Automation Process with duplicate name @smoke", async ({automationProcessController}) => {
        const payload = AUTOMATION_PROCESS_DATA;
        const response = await automationProcessController.createAutomationProcess(payload);
        let body = await response.json();
        automationProcessId = body.id;
        expect(response.status()).toBe(200);

        const duplicateResponse = await automationProcessController.createAutomationProcess(payload);
        body = await duplicateResponse.json();
        expect(duplicateResponse.status()).toBe(400);
        expect(body.message).toBe("Automation process with the same name already exists! Please, choose another name");
    });
});