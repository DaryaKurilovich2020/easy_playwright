import {BasePage} from "./BasePage";
import {Download, expect, Locator, Page} from "@playwright/test";
import {NODE_MANAGEMENT_DATA, UPDATED_NODE_MANAGEMENT_DATA} from "../test-data/nodemanagement.testdata";
import {NodePanel} from "../components/NodePanel";
import {ConfirmationModal} from "../components/ConfirmationModal";

export class NodePage extends BasePage {
    readonly page: Page;
    readonly updateButton: Locator

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.updateButton = this.page
    }

    async downloadAgentPackage(nodeName: string): Promise<Download> {
        await this.searchByText(nodeName);
        await this.table.getRowByColumnValue("Name", nodeName).clickButton("Download node agent package");
        const downloadLink = this.page.getByRole("link", {name: "Export complete. Click to download"});
        await expect(downloadLink).toBeVisible();
        const downloadPromise = this.page.waitForEvent('download');
        await downloadLink.click();

        return await downloadPromise;
    }

    async updateRecord(recordName: string, recordData: Record<string, string>) {
        await this.searchByText(recordName);
        await this.openRecordByName(recordName);

        const updateNodePanel = new NodePanel(this.page.locator("#root"));

        await updateNodePanel.fillForm(recordData);
        // const nodeData = Object.entries(UPDATED_NODE_MANAGEMENT_DATA);
        // for (const [param, value] of nodeData) {
        //     await updateNodePanel.details.setParameter(param, value);
        // }

        await updateNodePanel.clickNodeButton("Update");

        const confirmationModal = new ConfirmationModal(this.page.getByRole("dialog"));
        await confirmationModal.clickButton("Update");

        await this.goBackToList();
    }

    async fillRecordData(recordName: string, recordData: Record<string, string>) {
        const updateNodePanel = new NodePanel(this.page.locator("#root"));
        await updateNodePanel.fillForm(recordData);
    }

    async createRecord(recordData: Record<string, string>) {
        await this.clickCreateNewRecord();
        const newNodeManagementPanel = new NodePanel(this.page.locator("#details_panel"));
        await newNodeManagementPanel.fillForm(recordData);
        await newNodeManagementPanel.clickNodeButton("Create");
    }

    async getNodeParamsValues(params: string[]) {
        const detailPanel = new NodePanel(this.page.locator("#root"));
        return detailPanel.getFormDataAsArray(params);
    }
}