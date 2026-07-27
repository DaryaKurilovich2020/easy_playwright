import {Locator, Page} from "@playwright/test";

export class ConfirmationModal {
    private readonly root: Locator

    constructor(root: Locator) {
        this.root = root;
    }

    async clickButton(buttonName: string) {
        await this.root.getByRole("button", {name: buttonName}).click();
    }
}