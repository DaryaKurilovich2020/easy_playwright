import {Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class HelpPage extends BasePage {
    private readonly helpInput: Locator;
    private readonly dropDownList: Locator;

    constructor(page: Page) {
        super(page);
        this.helpInput = page.getByRole("textbox", {name: "Search"});
        this.dropDownList = this.page.locator('[id^="searchBar_"]');
    }

    async search(query: string) {
        await this.helpInput.fill(query);
        await this.dropDownList.getByText(query).first().click();
        await this.page.keyboard.press("Enter");
    }
}