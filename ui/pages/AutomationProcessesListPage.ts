import {BaseListPage} from "./BaseListPage";
import {Page} from "@playwright/test";
import {ParamsPanel} from "../components/ParamsPanel";
import {AutomationProcessPage} from "./AutomationProcessPage";
import {NotificationComponent} from "../components/NotificationComponent";

export class AutomationProcessesListPage extends BaseListPage {
    private readonly notification: NotificationComponent;
    constructor(page: Page) {
        super(page);
        this.notification = new NotificationComponent(this.page.getByRole('alert'));
    }

    async createRecord(recordData: Record<string, string>) {
        await this.clickCreateNewRecord();
        const automationProcessPage = new AutomationProcessPage(this.page);

        const newNodeManagementPanel = new ParamsPanel(
            this.page.locator("#root"),
        );
        await newNodeManagementPanel.fillForm(recordData);
        await automationProcessPage.clickButton("Create New");
    }

    override async openRecordByName(recordName: string) {
        await super.openRecordByName(recordName);
    }

    getNotification() {
        return this.notification.getComponent();
    }
}