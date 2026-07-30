import {Locator} from "@playwright/test";
import {DetailsComponent} from "./DetailsComponent";

export class NodePanel {
    private readonly root: Locator;
    readonly details: DetailsComponent;

    constructor(root: Locator) {
        this.root = root;
        this.details = new DetailsComponent(root);
    }

    async getNodeButton(buttonName: string) {
        return this.root.getByText(buttonName);
    }

    async clickNodeButton(buttonName: string) {
        const button = this.root.getByText(buttonName);
        await button.waitFor({ state: 'visible' });
        await button.click();
    }

    async fillForm(data: Record<string, string>): Promise<void> {
        const entries = Object.entries(data);
        for (const [param, value] of entries) {
            await this.details.setParameter(param, value);
        }
    }

    async getFormDataAsArray(params: string[]){
        const actualData: [string, string][] = [];

        for (const param of params) {
            const inputValue = await this.details.getInput(param).inputValue();
            actualData.push([param, inputValue]);
        }

        return Object.fromEntries(actualData);
    }
}