import {Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class MainPage extends BasePage{
    readonly page: Page;
    constructor(page:Page) {
        super(page);
        this.page = page;
    }
    async redirectToFindOutMore() {
        await this.page.getByRole("link", {name: "Find out more"}).click();
    }
}