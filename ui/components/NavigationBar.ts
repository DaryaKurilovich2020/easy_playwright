import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class NavigationBar extends BaseComponent {
  constructor(root: Locator) {
    super(root);
  }

  async navigateTo(moduleName: string) {
    const module = this.root
      .locator(".MuiListItem-button")
      .and(this.root.locator(`[aria-label="${moduleName}"]`));

    await module.click();
  }
}