import { test, expect } from "../../fixtures/automationprocess.fixture";
import {AutomationProcessPage} from "../../ui/pages/AutomationProcessPage";
import {UI_AUTOMATION_PROCESS_MANAGEMENT_DATA} from "../../test-data/ui/autonationprocess.testdata";

test.describe("Automation Process Management Tests", () => {
    let automationProcessNameToDelete: string | null = null;

    test.afterEach(async ({ automationProcessListPage }) => {
        if (automationProcessNameToDelete) {
            await automationProcessListPage.searchByText(automationProcessNameToDelete);
            const rowCount = await automationProcessListPage.getByText(automationProcessNameToDelete).count();
            if (rowCount === 0) return;
            await automationProcessListPage.deleteRecordInline(automationProcessNameToDelete);
            automationProcessNameToDelete = null;
        }
    });

    test.describe("Create Automation Process tests", () => {
        test.describe("Positive tests", () => {
            test("should create new node @smoke", async ({ automationProcessListPage, page }) => {
                const automationProcessData: Record<string, string> = UI_AUTOMATION_PROCESS_MANAGEMENT_DATA;
                await automationProcessListPage.createRecord(automationProcessData);
                const automationProcessPage = new AutomationProcessPage(page);
                const actualAutomationProcessData = await automationProcessPage.getNodeParamsValues(
                    Object.keys(UI_AUTOMATION_PROCESS_MANAGEMENT_DATA),
                );
                await expect(actualAutomationProcessData).toEqual(automationProcessData);
            });
        });

        test.describe("Negative tests", () => {
            test("should not create duplicate node", async ({
                                                                createdAutomationProcess,
                                                                page,
                                                                automationProcessListPage,
                                                            }) => {
                const duplicateData = {
                    Name: createdAutomationProcess.automationProcessName,
                };

                await automationProcessListPage.createRecord(duplicateData);
                const snackbar = page.getByRole('alert').filter({ hasText: 'Node with the same name already exists! Please, choose another name' });
                await expect(snackbar).toBeVisible();
            });
        });
    });

    test.describe("Update Automation Process tests", () => {
        test("should not let update existing Automation Process if no changes made", async ({
                                                                                  createdAutomationProcess,
                                                                                  page,
                                                                              }) => {
            const nodeListPage = createdAutomationProcess.page;
            const automationProcessName = createdAutomationProcess.automationProcessName;

            await nodeListPage.searchByText(automationProcessName);
            await nodeListPage.openRecordByName(automationProcessName);
            await expect
                .soft(page.getByRole("button", { name: "Update" }))
                .toBeDisabled();
            const automationProcessPage = new AutomationProcessPage(page);
            await automationProcessPage.goBackToList();
        });
    });

    test.describe("Delete Node tests", () => {
        test("should delete existing Automation Process by inline table button", async ({
                                                                              createdAutomationProcess,
                                                                              page,
                                                                          }) => {
            const automationProcessListPage = createdAutomationProcess.page;
            const automationProcessName = createdAutomationProcess.automationProcessName;

            await automationProcessListPage.deleteRecordInline(automationProcessName);

            await expect(page.getByText("No Results Found")).toBeVisible();
            await expect(page.getByText(automationProcessName)).not.toBeVisible();
        });

        test("should delete existing Automation Process by selecting the record in the table", async ({
                                                                                            createdAutomationProcess,
                                                                                            page,
                                                                                        }) => {
            const automationProcessListPage = createdAutomationProcess.page;
            const automationProcessName = createdAutomationProcess.automationProcessName;

            await automationProcessListPage.deleteRecordViaCheckbox(automationProcessName);

            await expect(page.getByText("No Results Found")).toBeVisible();
            await expect(page.getByText(automationProcessName)).not.toBeVisible();
        });
    });
});