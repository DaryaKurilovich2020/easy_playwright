import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class TableRow extends BaseComponent {
  constructor(root: Locator) {
    super(root);
  }

  async getCellValue(columnName: string): Promise<string> {
    const text = await this.root
      .locator(`td[data-label="${columnName}"]`)
      .innerText();
    return text.trim();
  }

  async select() {
    await this.root.getByRole("checkbox").check();
  }

  // async clickButton(buttonName: string) {
  //     const targetElement = this.root
  //         .locator('td')
  //         .last()
  //         .locator(`[aria-label*="${buttonName}" i]`);
  //
  //     await targetElement.click();
  // }

  async clickButton(buttonName: string): Promise<void> {
    const targetElement = this.root.locator(`[aria-label*="${buttonName}" i]`);
    await targetElement.first().click();
  }
}
