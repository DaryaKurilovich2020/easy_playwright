import {Locator, Page} from "@playwright/test";
import {Table} from "../components/Table";
import {ConfirmationModal} from "../components/ConfirmationModal";
import {NodePanel} from "../components/NodePanel";
import {NODE_MANAGEMENT_DATA} from "../test-data/nodemanagement.testdata";

export class BasePage {
    protected readonly page: Page;
    private readonly navigationBar: Locator;
    private readonly createNewButton: Locator;
    readonly table: Table;
    readonly userButton: Locator;
    readonly backToListButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navigationBar = page.locator("#sidebar_list");
        this.createNewButton = page.getByRole("button", {name: "Create New"});
        this.table = new Table(page.locator(".MuiTable-stickyHeader"));
        this.userButton = page.getByRole('button', {name: 'User', exact: true});
        this.logoutButton = page.getByRole('link', {name: 'Logout', exact: true});
        this.backToListButton = page.getByText("Back to List");
    }

    async navigateToModule(module: string) {
        await this.navigationBar.getByRole("link", {name: module}).click();
    }

    async clickCreateNewRecord() {
        await this.createNewButton.click({force: true});
    }

    async deleteRecords() {
        await this.page.getByRole("button", {name: "Delete"}).click();
    }

    async goBackToList() {
        await this.page.waitForLoadState('networkidle');
        await this.backToListButton.waitFor({ state: 'visible', timeout: 160000 });
        await this.backToListButton.click();
    }

    async searchByText(text: string) {
        await this.page.locator("input#search_field").fill(text);
    }

    async clickButton(button: string) {
        await this.page.getByRole("button", {name: button}).click();
    }

    getByText(text: string, options?: { exact?: boolean }) {
        return this.page.getByText(text, options);
    }

    async deleteRecordViaCheckbox(recordName: string): Promise<void> {
        await this.searchByText(recordName);
        await this.table.getRowByColumnValue("Name", recordName).select();
        await this.deleteRecords();
        const confirmationModal = new ConfirmationModal(this.page.getByRole("dialog"));
        await confirmationModal.clickButton("Delete");
    }

    async deleteRecordInline(recordName: string): Promise<void> {
        await this.searchByText(recordName);
        await this.table.getRowByColumnValue("Name", recordName).clickButton("Delete");
        const confirmationModal = new ConfirmationModal(this.page.getByRole("dialog"));
        await confirmationModal.clickButton("Delete");
    }

    async openRecordByName(recordName: string) {
        await this.page.getByRole("link", {name: recordName}).click();
    }

    async logout() {
       await this.userButton.click();
       await this.logoutButton.click();
    }
}