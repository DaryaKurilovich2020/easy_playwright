import {test, expect} from '../ui/fixtures/nodemanagement.fixture'
import {NODE_MANAGEMENT_DATA, UPDATED_NODE_MANAGEMENT_DATA} from "../ui/test-data/nodemanagement.testdata";
import {NodePanel} from "../ui/components/NodePanel";
import {ConfirmationModal} from "../ui/components/ConfirmationModal";

test.describe('Node Management Tests', () => {
    test.describe('Create Node tests', () => {
        test.describe('Positive tests', () => {
            test('should create new node', async ({nodeManagementPage, page}) => {
                test.setTimeout(90000);
                await nodeManagementPage.clickCreateNewRecord();

                const newNodeManagementPanel = new NodePanel(page.locator("#details_panel"));

                const nodeData = Object.entries(NODE_MANAGEMENT_DATA);
                for (const [param, value] of nodeData) {
                    await newNodeManagementPanel.details.setParameter(param, value);
                }

                await newNodeManagementPanel.clickNodeButton("Create");

                const updateNodePanel = new NodePanel(page.locator("#root"));

                for (const [param, value] of nodeData) {
                    await expect(updateNodePanel.details.getInput(param)).toHaveValue(value);
                }
            });
        });

        test.describe('Negative tests', () => {
            test('should not create duplicate node', async ({createdNode, page, nodeManagementPage}) => {
                await nodeManagementPage.clickCreateNewRecord();

                const newNodeManagementPanel = new NodePanel(page.locator("#details_panel"));
                await newNodeManagementPanel.details.setParameter("Name", createdNode.nodeName);

                await newNodeManagementPanel.clickNodeButton("Create");
                //TODO Добавить работу с компонентом notification
                await expect(page.getByText("Node with the same name already exists! Please, choose another name")).toBeVisible();
            });
        });
    });

    test.describe('Update Node tests', () => {
        test('should update existing node', async ({createdNode, page}) => {
            test.setTimeout(90000);
            await createdNode.page.searchByText(createdNode.nodeName);
            await page.getByRole("link", {name: createdNode.nodeName}).click();

            const updateNodePanel = new NodePanel(page.locator("#root"));

            const nodeData = Object.entries(UPDATED_NODE_MANAGEMENT_DATA);
            for (const [param, value] of nodeData) {
                await updateNodePanel.details.setParameter(param, value);
            }

            await updateNodePanel.clickNodeButton("Update");

            const confirmationModal = new ConfirmationModal(page.getByRole("dialog"));
            await confirmationModal.clickButton("Update");

            await createdNode.page.goBackToList();
            await page.getByRole("link", {name: createdNode.nodeName}).click();

            for (const [param, value] of nodeData) {
                await expect(updateNodePanel.details.getInput(param)).toHaveValue(value);
            }

            await createdNode.page.goBackToList();
        });
    });

    test.describe('Delete Node tests', () => {
        test('should delete existing node by inline table button', async ({createdNode, page}) => {
            test.setTimeout(90000);
            const nodePage = createdNode.page;
            const nodeName = createdNode.nodeName;

            await nodePage.searchByText(nodeName);

            await createdNode.page.table.getRowByColumnValue("Name", createdNode.nodeName).clickButton("Delete");
            const confirmationModal = new ConfirmationModal(page.getByRole("dialog"));
            await confirmationModal.clickButton("Delete");

            await expect(page.getByText("No Results Found")).toBeVisible({timeout: 15000});
            await expect(page.getByText(nodeName)).not.toBeVisible({timeout: 15000});
        });

        test('should delete existing node by selecting the record in the table', async ({createdNode, page}) => {
            test.setTimeout(90000);
            const nodePage = createdNode.page;
            const nodeName = createdNode.nodeName;

            await nodePage.searchByText(nodeName);
            await createdNode.page.table.getRowByColumnValue("Name", createdNode.nodeName).select();
            await nodePage.deleteRecords();

            const confirmationModal = new ConfirmationModal(page.getByRole("dialog"));
            await confirmationModal.clickButton("Delete");

            await expect(page.getByText("No Results Found")).toBeVisible({timeout: 15000});
            await expect(page.getByText(nodeName)).not.toBeVisible({timeout: 15000});
        });
    });

    test.describe("Download node tests", () => {
        test('should download node package agent', async ({createdNode, page}) => {
            const nodePage = createdNode.page;
            const nodeName = createdNode.nodeName;

            await nodePage.searchByText(nodeName);
            await createdNode.page.table.getRowByColumnValue("Name", createdNode.nodeName).clickButton("Download node agent package");

            const downloadLink = page.getByRole("link", {name: "Export complete. Click to download"});
            await expect(downloadLink).toBeVisible();

            const downloadPromise = page.waitForEvent('download');
            await downloadLink.click();
            const download = await downloadPromise;
            await download.saveAs('./downloads/' + download.suggestedFilename());

            const fileName = download.suggestedFilename();
            expect(fileName).toContain('node');

            const failure = await download.failure();
            expect(failure).toBeNull();
        });
    });
});