import { Locator, Page } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;
  readonly userButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userButton = page.getByRole("button", { name: "User", exact: true });
    this.logoutButton = page.getByRole("link", { name: "Logout", exact: true });
  }

  async clickButton(button: string) {
    await this.page.getByRole("button", { name: button }).click();
  }

  getByText(text: string, options?: { exact?: boolean }) {
    return this.page.getByText(text, options);
  }

  async logout() {
    await this.userButton.click();
    await this.logoutButton.click();
  }

  getLinkByName(text: string) {
    return this.page.getByRole("link", { name: text });
  }

  getButtonByName(text: string) {
    return this.page.getByRole("button", { name: text });
  }
}