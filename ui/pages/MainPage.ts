import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NavigationBar } from "../components/NavigationBar";

export class MainPage extends BasePage {
  private readonly navigationBar: NavigationBar;

  constructor(page: Page) {
    super(page);
    this.navigationBar = new NavigationBar(page.locator("#sidebar_list"));
  }

  async redirectToFindOutMore() {
    await this.getLinkByName("Find out more").click();
  }

  async navigateTo(module: string) {
    await this.navigationBar.navigateTo(module);
  }
}
