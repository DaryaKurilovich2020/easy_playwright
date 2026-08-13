import {BasePage} from "./BasePage";
import {NodePanel} from "../components/NodePanel";
import {Table} from "../components/Table";
import {ConfirmationModal} from "../components/ConfirmationModal";
import {Page} from "@playwright/test";

export class BaseListPage extends BasePage {
    protected readonly table: Table;
    protected readonly confirmationModal: ConfirmationModal;
    constructor(page: Page) {
        super(page);
        this.table = new Table(page.locator(".MuiTable-stickyHeader"));
        this.confirmationModal = new ConfirmationModal(
            this.page.getByRole("dialog"),
        );
    }
    async clickCreateNewRecord() {
        await this.clickButton("Create New");
    }

    async deleteRecords() {
        await this.clickButton("Delete");
    }

    async searchByText(text: string) {
        await this.page.locator("input#search_field").fill(text);
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
}