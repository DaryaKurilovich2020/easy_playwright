import {Locator} from "@playwright/test";

export class BaseComponent {
    protected readonly root: Locator;

    constructor(root: Locator) {
        this.root = root;
    }

    async clickButton(buttonName: string) {
        await this.root.getByRole("button", {name: buttonName}).click();
    }

    getComponent() {
        return this.root;
    }
}
