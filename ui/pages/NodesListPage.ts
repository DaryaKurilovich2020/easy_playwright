import {Download, expect, Page} from "@playwright/test";
import {ParamsPanel} from "../components/ParamsPanel";
import {NodePage} from "./NodePage";
import {BaseListPage} from "./BaseListPage";
import {NotificationComponent} from "../components/NotificationComponent";

export class NodesListPage extends BaseListPage {
    private readonly nodePage: NodePage;
    private readonly notification: NotificationComponent;

    constructor(page: Page) {
        super(page);
        this.nodePage = new NodePage(this.page);
        this.notification = new NotificationComponent(this.page.getByRole('alert'));
    }

    async downloadAgentPackage(nodeName: string): Promise<Download> {
        await this.searchByText(nodeName);
        await this.table.getRowByColumnValue("Name", nodeName)
            .clickButton("Download node agent package");
        const downloadLink = this.getLinkByName(
            "Export complete. Click to download",
        );
        await expect(downloadLink).toBeVisible();
        const downloadPromise = this.page.waitForEvent("download");
        await downloadLink.click();

        return await downloadPromise;
    }

    async createRecord(recordData: Record<string, string>) {
        await this.clickCreateNewRecord();
        const newNodeManagementPanel = new ParamsPanel(
            this.page.locator("#details_panel"),
        );
        await newNodeManagementPanel.fillForm(recordData);
        await newNodeManagementPanel.clickNodeButton("Create");
    }

    async updateRecord(recordName: string, recordData: Record<string, string>) {
        await this.searchByText(recordName);
        await this.openRecordByName(recordName);
        await this.nodePage.updateRecord(recordName, recordData);
    }

    getNotification() {
        return this.notification.getComponent();
    }
}