import {APIRequestContext} from "@playwright/test";

export class AutomationProcessController {
    constructor(private request: APIRequestContext) {}

    async createAutomationProcess(automationProcessData: object) {
        return await this.request.post("/api/v1/automation_processes", {
            data: automationProcessData,
        });
    }

    async deleteAutomationProcess(id: number) {
        return await this.request.delete(`/api/v1/automation_processes/${id}`);
    }
}