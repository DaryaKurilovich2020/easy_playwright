import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class TableRow extends BaseComponent {
  constructor(root: Locator) {
    super(root);
  }
  async select() {
    await this.root.getByRole("checkbox").check();
  }

  async clickButton(buttonName: string): Promise<void> {
    const targetElement = this.root.locator(`[aria-label*="${buttonName}" i]`);
    await targetElement.first().click();
  }
}
