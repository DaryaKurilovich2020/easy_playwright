import { apiTest, expect } from "../../api/fixtures/api.fixture";

import { NodeDataFactory } from "../../test-data/api/node.testdata";

apiTest.describe("API: Isolated Node CRUD Operations", () => {
  let activeNodeId: number;
  let nodeName = "Pre-created Autotest Node";

  apiTest.beforeEach(async ({ nodeController }) => {
    const payload = NodeDataFactory.createValidNodePayload(nodeName);
    const res = await nodeController.createNode(payload);

    const body = await res.json();
    activeNodeId = Number(body.id);
  });

  apiTest.afterEach(async ({ nodeController }) => {
    if (activeNodeId) {
      await nodeController.deleteNode(activeNodeId);
    }
  });

  apiTest("should CREATE a new node @smoke", async ({ nodeController }) => {
    const payload = NodeDataFactory.createValidNodePayload(
      "Brand New Isolated Node",
    );

    const response = await nodeController.createNode(payload);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("id");
    expect(body.name).toBe(payload.name);
    await nodeController.deleteNode(Number(body.id));
  });

  apiTest("should READ node details by ID @smoke", async ({ nodeController }) => {
    const response = await nodeController.getNode(activeNodeId);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(activeNodeId);
    expect(body.name).toBe(nodeName);
  });

  apiTest("should download node details by ID", async ({ nodeController }) => {
    const response = await nodeController.downloadNode(activeNodeId);
    expect(response.status()).toBe(200);

    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("text/csv");

    const fileBuffer = await response.body();
    expect(fileBuffer.length).toBeGreaterThan(0);

    const csvText = fileBuffer.toString("utf-8");
    expect(csvText).toContain("key,value");
  });

  apiTest(
    "should UPDATE node fields successfully @smoke",
    async ({ nodeController }) => {
      const updatedPayload = NodeDataFactory.updateNodePayload(nodeName);

      const response = await nodeController.updateNode(
        activeNodeId,
        updatedPayload,
      );
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.description).toBe(updatedPayload.description);
      expect(body.workDir).toBe(updatedPayload.workDir);
    },
  );

  apiTest(
    "should DELETE the node and return 403 on next read @smoke",
    async ({ nodeController }) => {
      const response = await nodeController.deleteNode(activeNodeId);
      expect(response.status()).toBe(200);

      const deletedId = activeNodeId;
      activeNodeId = 0;

      const verifyResponse = await nodeController.getNode(deletedId);
      expect(verifyResponse.status()).toBe(403);
    },
  );
});
