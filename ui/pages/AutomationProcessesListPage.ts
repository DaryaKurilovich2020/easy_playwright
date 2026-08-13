import {BaseListPage} from "./BaseListPage";
import {Page} from "@playwright/test";
import {NodePanel} from "../components/NodePanel";
import {AutomationProcessPage} from "./AutomationProcessPage";

export class AutomationProcessesListPage extends BaseListPage {
    constructor(page: Page) {
        super(page);
    }

    async createRecord(recordData: Record<string, string>) {
        await this.clickCreateNewRecord();
        const automationProcessPage = new AutomationProcessPage(this.page);

        const newNodeManagementPanel = new NodePanel(
            this.page.locator("#details_panel"),
        );
        await newNodeManagementPanel.fillForm(recordData);
        await automationProcessPage.clickButton("Create New");
    }

    override async openRecordByName(recordName: string) {
        await super.openRecordByName(recordName);
    }
}