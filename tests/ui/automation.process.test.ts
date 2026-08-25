import {test, expect} from "../../fixtures/automationprocess.fixture";
import {UI_AUTOMATION_PROCESS_MANAGEMENT_DATA} from "../../test-data/ui/autonationprocess.testdata";

test.describe("Automation Process Management Tests", () => {
    test.describe("Create Automation Process tests", () => {
        test.describe("Positive tests", () => {
            let automationProcessNameToDelete: string | null = null;

            test.afterEach(async ({automationProcessListPage, automationProcessPage}) => {
                await automationProcessPage.goBackToList();
                if (automationProcessNameToDelete) {
                    await
                    await automationProcessListPage.searchByText(automationProcessNameToDelete);
                    const rowCount = await automationProcessListPage.getByText(automationProcessNameToDelete).count();
                    if (rowCount === 0) return;
                    await automationProcessListPage.deleteRecordInline(automationProcessNameToDelete);
                    automationProcessNameToDelete = null;
                }
            });

            test("should create new node @smoke", async ({automationProcessListPage, automationProcessPage}) => {
                const automationProcessData: Record<string, string> = UI_AUTOMATION_PROCESS_MANAGEMENT_DATA;
                await automationProcessListPage.createRecord(automationProcessData);
                const actualAutomationProcessData = await automationProcessPage.getNodeParamsValues(
                    Object.keys(UI_AUTOMATION_PROCESS_MANAGEMENT_DATA),
                );
                automationProcessNameToDelete = automationProcessData.Name;
                await expect(actualAutomationProcessData).toEqual(automationProcessData);
            });
        });

        test.describe("Negative tests", () => {
            test("should not create duplicate node", async ({
                                                                createdAutomationProcess,
                                                                automationProcessListPage,
                                                            }) => {
                const duplicateData = {
                    Name: createdAutomationProcess.automationProcessName,
                    "Version Id": "3.2.0",
                    "Artifact Id": "easy-rpa-invoiceplane-ap",
                    "Group Id": "eu.ibagroup.samples.ap"
                };

                await automationProcessListPage.createRecord(duplicateData);
                await expect(automationProcessListPage.getNotification()).toContainText('Automation process with the same name already exists! Please, choose another name');
            });
        });
    });

    test.describe("Update Automation Process tests", () => {
        test.afterEach(async ({automationProcessPage}) => {
            await automationProcessPage.goBackToList();
        })
        test("should not let update existing Automation Process if no changes made", async ({createdAutomationProcess, page, automationProcessPage}) => {
            const automationProcessesListPage = createdAutomationProcess.page;
            const automationProcessName = createdAutomationProcess.automationProcessName;

            await automationProcessesListPage.searchByText(automationProcessName);
            await automationProcessesListPage.openRecordByName(automationProcessName);
            await automationProcessPage.openSubSection("Details");
            await expect(page.getByRole("button", {name: "Update"})).toBeDisabled();
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
            await automationProcessListPage.clickButton("Refresh");

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