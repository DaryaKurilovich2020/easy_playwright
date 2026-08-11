import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";
import { NodePanel } from "../components/NodePanel";
import { ConfirmationModal } from "../components/ConfirmationModal";

export class NodePage extends BasePage {
  private readonly nodePanel: NodePanel;
  private readonly confirmationModal: ConfirmationModal;
  constructor(page: Page) {
    super(page);
    this.nodePanel = new NodePanel(this.page.locator("#root"));
    this.confirmationModal = new ConfirmationModal(
      this.page.getByRole("dialog"),
    );
  }

  async updateRecord(recordName: string, recordData: Record<string, string>) {
    await this.nodePanel.fillForm(recordData);
    await this.nodePanel.clickNodeButton("Update");

    await this.confirmationModal.clickButton("Update");
    await this.goBackToList();
  }
  //
  // async fillRecordData(recordName: string, recordData: Record<string, string>) {
  //     await this.nodePanel.fillForm(recordData);
  // }
  //
  async getNodeParamsValues(params: string[]) {
    return this.nodePanel.getFormDataAsArray(params);
  }
}
