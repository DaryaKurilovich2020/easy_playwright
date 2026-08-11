import { Locator, Page } from "@playwright/test";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { NodePanel } from "../components/NodePanel";

export class BasePage {
  protected readonly page: Page;
  private readonly createNewButton: Locator;
  readonly userButton: Locator;
  readonly backToListButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createNewButton = page.getByRole("button", { name: "Create New" });
    this.userButton = page.getByRole("button", { name: "User", exact: true });
    this.logoutButton = page.getByRole("link", { name: "Logout", exact: true });
    this.backToListButton = page.getByText("Back to List");
  }

  async clickCreateNewRecord() {
    await this.createNewButton.click({ force: true });
  }

  async deleteRecords() {
    await this.page.getByRole("button", { name: "Delete" }).click();
  }

  async goBackToList() {
    await this.page.waitForLoadState("networkidle");
    await this.backToListButton.waitFor({ state: "visible", timeout: 160000 });
    await this.backToListButton.click();
  }

  async searchByText(text: string) {
    await this.page.locator("input#search_field").fill(text);
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
}
