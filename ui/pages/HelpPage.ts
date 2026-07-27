import {Locator, Page} from "@playwright/test";

export class HelpPage {
    private readonly helpInput: Locator;
    constructor(private page: Page) {
        this.helpInput = page.getByRole('textbox', { name: 'Search' });
    }

    async search(query: string) {
        await this.helpInput.fill(query);
        await this.page.locator('[id^="searchBar_"]').getByText(query).first().click();
        await this.page.keyboard.press('Enter');
    }
}