import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";
import {NodePanel} from "../components/NodePanel";
import {ConfirmationModal} from "../components/ConfirmationModal";
import {NotificationComponent} from "../components/NotificationComponent";

export class NodePage extends BasePage {
    private readonly nodePanel: NodePanel;
    private readonly notification: NotificationComponent;
    private readonly confirmationModal: ConfirmationModal;

    constructor(page: Page) {
        super(page);
        this.nodePanel = new NodePanel(this.page.locator("#root"));
        this.confirmationModal = new ConfirmationModal(
            this.page.getByRole("dialog"),
        );
        this.notification = new NotificationComponent(this.page.getByRole('alert'));
    }

    async updateRecord(recordName: string, recordData: Record<string, string>) {
        await this.nodePanel.fillForm(recordData);
        await this.nodePanel.clickNodeButton("Update");

        await this.confirmationModal.clickButton("Update");
        await this.goBackToList();
    }

    async getNodeParamsValues(params: string[]) {
        return this.nodePanel.getFormDataAsArray(params);
    }

    async goBackToList() {
        await this.page.waitForLoadState("networkidle");
        const backToListButton = this.getByText("Back to List");
        await backToListButton.waitFor({state: "visible", timeout: 160000});
        await backToListButton.click();
    }

    getNotification() {
        return this.notification.getComponent();
    }
}
