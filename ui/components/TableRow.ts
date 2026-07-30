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
    // async clickButton(buttonName: string) {
    //     const targetElement = this.rootLocator
    //         .locator('td')
    //         .last()
    //         .locator(`[aria-label*="${buttonName}" i]`);
    //
    //     await targetElement.click();
    // }

    async clickButton(buttonName: string): Promise<void> {
        // Ищем элемент с aria-label по всей строке, без привязки к .last()
        const targetElement = this.rootLocator.locator(`[aria-label*="${buttonName}" i]`);

        // Если кнопок с похожим aria-label вдруг несколько, берем первую для стабильности
        await targetElement.first().click();
    }



}
