import {Locator, Page} from "@playwright/test";
import {Table} from "../components/Table";
import {NotificationComponent} from "../components/NotificationComponent";

export class BasePage {
    protected readonly page: Page;
    private readonly navigationBar: Locator;
    private readonly userIcon: Locator;
    private readonly createNewButton: Locator;
    readonly table: Table;
    // readonly notification: NotificationComponent;

    constructor(page: Page) {
        this.page = page;
        this.navigationBar = page.locator("#sidebar_list");
        this.userIcon = page.getByRole("button", {name: "User"});
        this.createNewButton = page.getByRole("button", {name: "Create New"});
        this.table = new Table(page.locator(".MuiTable-stickyHeader"));
        // this.notification = new NotificationComponent(page.getByRole('alert'));
    }

    async navigateToModule(module: string) {
        await this.navigationBar.getByRole("link", {name: module}).click();
    }

    async clickCreateNewRecord() {
        await this.createNewButton.click();
    }

    async deleteRecords() {
        await this.page.getByRole("button", {name: "Delete"}).click();
    }

    async goBackToList() {
        await this.page.getByText("Back to List").click();
    }

    async searchByText(text: string) {
        await this.page.locator("input#search_field").fill(text);
    }

    async clickButton(button: string) {
        await this.page.getByRole("button", {name: button}).click();
    }

    async redirectToFindOutMore() {
        await this.page.getByRole("link", {name: "Find out more"}).click();
    }
}