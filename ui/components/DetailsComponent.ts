import {Locator} from "@playwright/test";

export class DetailsComponent {
    private readonly root: Locator;

    constructor(root: Locator) {
        this.root = root;
    }

    getInput(name: string) {
        return this.root.getByRole('textbox', {name: name});
    }

    async setParameter(name: string, value: string) {
        await this.getInput(name).fill(value);
    }
}