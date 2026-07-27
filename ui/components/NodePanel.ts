import {Locator} from "@playwright/test";
import {DetailsComponent} from "./DetailsComponent";

export class NodePanel {
    private readonly root: Locator;
    readonly details: DetailsComponent;

    constructor(root: Locator) {
        this.root = root;
        this.details = new DetailsComponent(root);
    }

    async clickNodeButton(buttonName: string) {
        await this.root.getByText(buttonName).click();
    }
}