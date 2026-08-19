import { test, expect } from "../../fixtures/nodemanagement.fixture";
import {
  NODE_MANAGEMENT_DATA,
  UPDATED_NODE_MANAGEMENT_DATA,
} from "../../test-data/ui/nodemanagement.testdata";

test.describe("Node Management Tests", () => {
  let nodeNameToDelete: string | null = null;

  test.afterEach(async ({ nodesListPage }) => {
    if (nodeNameToDelete) {
      await nodesListPage.searchByText(nodeNameToDelete);
      const rowCount = await nodesListPage.getByText(nodeNameToDelete).count();
      if (rowCount === 0) return;
      await nodesListPage.deleteRecordInline(nodeNameToDelete);
      nodeNameToDelete = null;
    }
  });

  test.describe("Create Node tests", () => {
    test.describe("Positive tests", () => {
      test("should create new node @smoke", async ({ nodesListPage, page, nodePage }) => {
        const nodeData: Record<string, string> = NODE_MANAGEMENT_DATA;
        await nodesListPage.createRecord(nodeData);
        const actualNodeData = await nodePage.getNodeParamsValues(
          Object.keys(NODE_MANAGEMENT_DATA),
        );
        await expect(actualNodeData).toEqual(nodeData);
      });
    });

    test.describe("Negative tests", () => {
      test("should not create duplicate node", async ({
        createdNode,
        page,
        nodesListPage,
      }) => {
        const duplicateData = {
          Name: createdNode.nodeName,
        };

        await nodesListPage.createRecord(duplicateData);

        await expect(nodesListPage.getNotification()).toBeVisible();
        await expect(nodesListPage.getNotification()).toHaveText('Node with the same name already exists! Please, choose another name');
      });
    });
  });

  test.describe("Update Node tests", () => {
    test("should update existing node", async ({ createdNode, page, nodePage }) => {
      const nodesListPage = createdNode.page;
      const nodeName = createdNode.nodeName;
      const nodeData = UPDATED_NODE_MANAGEMENT_DATA;

      await nodesListPage.updateRecord(nodeName, nodeData);
      await nodesListPage.openRecordByName(nodeName);

      const actualNodeData = await nodePage.getNodeParamsValues(
        Object.keys(UPDATED_NODE_MANAGEMENT_DATA),
      );

      await expect.soft(actualNodeData).toEqual(nodeData);
      await nodePage.goBackToList();
    });

    test("should not let update existing node if no changes made", async ({
      createdNode, page, nodePage
    }) => {
      const nodeListPage = createdNode.page;
      const nodeName = createdNode.nodeName;

      await nodeListPage.searchByText(nodeName);
      await nodeListPage.openRecordByName(nodeName);
      await expect
        .soft(page.getByRole("button", { name: "Update" }))
        .toBeDisabled();
      await nodePage.goBackToList();
    });
  });

  test.describe("Delete Node tests", () => {
    test("should delete existing node by inline table button", async ({
      createdNode,
      page,
    }) => {
      const nodePage = createdNode.page;
      const nodeName = createdNode.nodeName;

      await nodePage.deleteRecordInline(nodeName);

      await expect(page.getByText("No Results Found")).toBeVisible();
      await expect(page.getByText(nodeName)).not.toBeVisible();
    });

    test("should delete existing node by selecting the record in the table", async ({
      createdNode,
      page,
    }) => {
      const nodePage = createdNode.page;
      const nodeName = createdNode.nodeName;

      await nodePage.deleteRecordViaCheckbox(nodeName);

      await expect(page.getByText("No Results Found")).toBeVisible();
      await expect(page.getByText(nodeName)).not.toBeVisible();
    });
  });

  test.describe("Download node tests", () => {
    test("should download node package agent", async ({ createdNode }) => {
      const nodePage = createdNode.page;
      const nodeName = createdNode.nodeName;

      const download = await nodePage.downloadAgentPackage(nodeName);

      const fileName = download.suggestedFilename();
      await expect(fileName).toContain("node");

      const failure = await download.failure();
      await expect(failure).toBeNull();
    });
  });
});