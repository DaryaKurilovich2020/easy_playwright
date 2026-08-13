import { Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class ConfirmationModal extends BaseComponent {
  constructor(root: Locator) {
    super(root);
  }
}
