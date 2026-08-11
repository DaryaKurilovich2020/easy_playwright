import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class DetailsComponent extends BaseComponent {
  constructor(root: Locator) {
    super(root);
  }

  getInput(name: string) {
    return this.root.getByRole("textbox", { name: name });
  }

  async setParameter(name: string, value: string) {
    await this.getInput(name).fill(value);
  }
}
