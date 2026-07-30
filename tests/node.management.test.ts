import {test, expect} from '../ui/fixtures/nodemanagement.fixture'
import {NODE_MANAGEMENT_DATA, UPDATED_NODE_MANAGEMENT_DATA} from "../ui/test-data/nodemanagement.testdata";

test.describe('Node Management Tests', () => {
    let nodeNameToDelete: string | null = null;

    test.afterEach(async ({nodeManagementPage}) => {
        if (nodeNameToDelete) {
            await nodeManagementPage.searchByText(nodeNameToDelete);
            const rowCount = await nodeManagementPage.getByText(nodeNameToDelete).count();
            if (rowCount === 0) return;
            await nodeManagementPage.deleteRecordInline(nodeNameToDelete);
            nodeNameToDelete = null;
        }
    });

    test.describe('Create Node tests', () => {
        test.describe('Positive tests', () => {
            test('should create new node', async ({nodeManagementPage, page}) => {
                test.setTimeout(180000);
                const nodeData: Record<string, string> = NODE_MANAGEMENT_DATA;
                await nodeManagementPage.createRecord(nodeData);
                const actualNodeData = await nodeManagementPage.getNodeParamsValues(Object.keys(NODE_MANAGEMENT_DATA));
                expect(actualNodeData).toEqual(nodeData);
            });
        });

        test.describe('Negative tests', () => {
            test('should not create duplicate node', async ({createdNode, page, nodeManagementPage}) => {
                const duplicateData = {
                    "Name": createdNode.nodeName
                };

                await nodeManagementPage.createRecord(duplicateData);
                //TODO Добавить работу с компонентом notification
                await expect(page.getByText("Node with the same name already exists! Please, choose another name")).toBeVisible();
            });
        });
    });

    test.describe('Update Node tests', () => {
        test('should update existing node', async ({createdNode, page}) => {
            test.setTimeout(180000);
            const nodePage = createdNode.page;
            const nodeName = createdNode.nodeName;
            const nodeData = UPDATED_NODE_MANAGEMENT_DATA;

            await nodePage.updateRecord(nodeName, nodeData);
            await nodePage.openRecordByName(nodeName);

            const actualNodeData = await nodePage.getNodeParamsValues(Object.keys(UPDATED_NODE_MANAGEMENT_DATA));

            expect(actualNodeData).toEqual(nodeData);
            await nodePage.goBackToList();
        });

        test('should not let update existing node if no changes made', async ({createdNode, page}) => {
            test.setTimeout(360000);
            const nodePage = createdNode.page;
            const nodeName = createdNode.nodeName;
            const initialData = await nodePage.getNodeParamsValues(Object.keys(UPDATED_NODE_MANAGEMENT_DATA));
            const newNodeData = UPDATED_NODE_MANAGEMENT_DATA;

            await nodePage.searchByText(nodeName);
            await nodePage.openRecordByName(nodeName);

            await nodePage.fillRecordData(nodeName, newNodeData);
            await nodePage.fillRecordData(nodeName, initialData);

            await expect(nodePage.updateButton).toBeDisabled(true);

            await nodePage.goBackToList();
        });
    });

    test.describe('Delete Node tests', () => {
        test('should delete existing node by inline table button', async ({createdNode, page}) => {
            test.setTimeout(180000);
            const nodePage = createdNode.page;
            const nodeName = createdNode.nodeName;

            await nodePage.deleteRecordInline(nodeName);

            await expect(page.getByText("No Results Found")).toBeVisible({timeout: 15000});
            await expect(page.getByText(nodeName)).not.toBeVisible({timeout: 15000});
        });

        test('should delete existing node by selecting the record in the table', async ({createdNode, page}) => {
            test.setTimeout(180000);
            const nodePage = createdNode.page;
            const nodeName = createdNode.nodeName;

            await nodePage.deleteRecordViaCheckbox(nodeName);

            await expect(page.getByText("No Results Found")).toBeVisible({timeout: 15000});
            await expect(page.getByText(nodeName)).not.toBeVisible({timeout: 15000});
        });
    });

    test.describe("Download node tests", () => {
        test('should download node package agent', async ({createdNode}) => {
            test.setTimeout(180000);
            const nodePage = createdNode.page;
            const nodeName = createdNode.nodeName;

            const download = await nodePage.downloadAgentPackage(nodeName);

            const fileName = download.suggestedFilename();
            expect(fileName).toContain('node');

            const failure = await download.failure();
            expect(failure).toBeNull();
        });
    });
});