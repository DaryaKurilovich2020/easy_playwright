import {Locator} from '@playwright/test';

export class TableRow {
    constructor(public readonly rootLocator: Locator) {
    }

    async getCellValue(columnName: string): Promise<string> {
        const text = await this.rootLocator.locator(`td[data-label="${columnName}"]`).innerText();
        return text.trim();
    }
    async select() {
        await this.rootLocator.getByRole('checkbox').check();
    }
    async clickButton(buttonName: string) {
        const targetElement = this.rootLocator
            .locator('td')
            .last()
            .locator(`[aria-label*="${buttonName}" i]`);

        await targetElement.click();
    }


}
