import { BasePage } from "./BasePage";
import { Download, expect, Page } from "@playwright/test";
import { NodePanel } from "../components/NodePanel";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { Table } from "../components/Table";
import { NodePage } from "./NodePage";

export class NodesListPage extends BasePage {
  private readonly table: Table;
  private readonly confirmationModal: ConfirmationModal;
  private readonly nodePage: NodePage;

  constructor(page: Page) {
    super(page);
    this.table = new Table(page.locator(".MuiTable-stickyHeader"));
    this.confirmationModal = new ConfirmationModal(
      this.page.getByRole("dialog"),
    );
    this.nodePage = new NodePage(this.page);
  }

  async downloadAgentPackage(nodeName: string): Promise<Download> {
    await this.searchByText(nodeName);
    await this.table
      .getRowByColumnValue("Name", nodeName)
      .clickButton("Download node agent package");
    const downloadLink = this.getLinkByName(
      "Export complete. Click to download",
    );
    await expect(downloadLink).toBeVisible();
    const downloadPromise = this.page.waitForEvent("download");
    await downloadLink.click();

    return await downloadPromise;
  }

  async deleteRecordViaCheckbox(recordName: string): Promise<void> {
    await this.searchByText(recordName);
    await this.table.getRowByColumnValue("Name", recordName).select();
    await this.deleteRecords();
    await this.confirmationModal.clickButton("Delete");
  }

  async deleteRecordInline(recordName: string): Promise<void> {
    await this.searchByText(recordName);
    await this.table
      .getRowByColumnValue("Name", recordName)
      .clickButton("Delete");
    await this.confirmationModal.clickButton("Delete");
  }

  async openRecordByName(recordName: string) {
    await this.page.getByRole("link", { name: recordName }).click();
  }

  async createRecord(recordData: Record<string, string>) {
    await this.clickCreateNewRecord();
    const newNodeManagementPanel = new NodePanel(
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
}
