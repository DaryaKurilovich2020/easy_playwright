export class NodeDataFactory {
    static createValidNodePayload(nodeName: string = `Autotest-Node-${Date.now()}`) {
        return {
            name: nodeName,
            description: 'Automated test node description',
            status: 'AVAILABLE',
            workDir: '/opt/nodes/workdir',
            dedicated: true,
            capabilities: ['test-capability'],
            details: {
                address: ['127.0.0.1'],
                totalMemory: 16384,
                freeMemory: 8192,
                cpu: 4,
                version: {},
                features: [
                    {
                        type: 'AP_RUN',
                        enabled: true,
                        status: 'ACTIVE',
                        healthy: true,
                        details: {
                            additionalProp1: 'value1'
                        }
                    }
                ]
            },
            healthy: true,
            last_seen: new Date().toISOString()
        };
    }

    static updateValidNodePayload(nodeName: string) {
        return {
            name: nodeName,
            description: 'Updated Automated test node description',
            status: 'AVAILABLE',
            workDir: 'Updated /opt/nodes/workdir',
            dedicated: true,
            capabilities: ['test-capability'],
            details: {
                address: ['127.0.0.1'],
                totalMemory: 16384,
                freeMemory: 8192,
                cpu: 4,
                version: {},
                features: [
                    {
                        type: 'AP_RUN',
                        enabled: true,
                        status: 'ACTIVE',
                        healthy: true,
                        details: {
                            additionalProp1: 'value1'
                        }
                    }
                ]
            },
            healthy: true,
            last_seen: new Date().toISOString()
        };
    }


    static createNodePayload(updatedName: string) {
        return this.createValidNodePayload(updatedName);
    }

    static updateNodePayload(updatedName: string) {
        return this.createValidNodePayload(updatedName);
    }
}
