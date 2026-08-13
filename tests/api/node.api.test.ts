import {apiTest, expect} from "../../fixtures/api.fixture";

import {NodeDataFactory} from "../../test-data/api/node.testdata";

apiTest.describe("API: Isolated Node CRUD Operations", () => {
    let activeNodeId: number;
    let nodeName = "Pre-created Autotest Node";
    let description = "Automated test node description";
    let workingDirectory = "/opt/nodes/workdir";

    apiTest.beforeEach(async ({nodeController}) => {
        const payload = NodeDataFactory.createValidNodePayload(nodeName, description, workingDirectory);
        const res = await nodeController.createNode(payload);

        const body = await res.json();
        activeNodeId = Number(body.id);
    });

    apiTest.afterEach(async ({nodeController}) => {
        if (activeNodeId) {
            await nodeController.deleteNode(activeNodeId);
        }
    });

    apiTest("should CREATE a new node @smoke", async ({nodeController}) => {
        const payload = NodeDataFactory.createValidNodePayload(
            "Brand New Isolated Node", description, workingDirectory
        );

        const response = await nodeController.createNode(payload);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toHaveProperty("id");
        expect(body.name).toBe(payload.name);
        await nodeController.deleteNode(Number(body.id));
    });

    apiTest("should READ node details by ID @smoke", async ({nodeController}) => {
        const response = await nodeController.getNode(activeNodeId);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.id).toBe(activeNodeId);
        expect(body.name).toBe(nodeName);
    });

    apiTest("should download node details by ID", async ({nodeController}) => {
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
        async ({nodeController}) => {
            const updatedPayload = NodeDataFactory.updateNodePayload(nodeName, description, workingDirectory);

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
        async ({nodeController}) => {
            const response = await nodeController.deleteNode(activeNodeId);
            expect(response.status()).toBe(200);

            const deletedId = activeNodeId;
            activeNodeId = 0;

            const verifyResponse = await nodeController.getNode(deletedId);
            expect(verifyResponse.status()).toBe(403);
        },
    );

    apiTest(
        "should return empty full logs for a newly created node by Id",
        async ({nodeController}) => {
            const response = await nodeController.getNodeFullLogs(activeNodeId);
            expect(response.status()).toBe(200);

            const textBody = (await response.text()).trim();
            expect(textBody).toHaveLength(0);
        }
    );

    apiTest(
        "should return features list for a node by Id",
        async ({nodeController}) => {
            const response = await nodeController.getNodeFeatures(activeNodeId);
            expect(response.status()).toBe(200);

            const body = await response.json();

            expect(Array.isArray(body)).toBe(true);
            expect(body.length).toBeGreaterThan(0);

            const firstFeature = body[0];

            expect(firstFeature).toHaveProperty('id');
            expect(typeof firstFeature.id).toBe('number');

            expect(firstFeature).toHaveProperty('type');
            expect(typeof firstFeature.type).toBe('string');

            expect(firstFeature).toHaveProperty('enabled');
            expect(typeof firstFeature.enabled).toBe('boolean');

            expect(firstFeature).toHaveProperty('uuid');
            expect(typeof firstFeature.uuid).toBe('string');
        }
    );
});