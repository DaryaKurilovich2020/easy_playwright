import { Locator } from "@playwright/test";

export class BaseComponent {
  protected readonly root: Locator;

  constructor(root: Locator) {
    this.root = root;
  }

  async clickByLocator(locator: Locator) {
    await locator.click();
  }

  async clickButton(buttonName: string) {
    await this.root.getByRole("button", { name: buttonName }).click();
  }

  async clickByText(text: string) {
    await this.root.getByText(text).click();
  }
}
