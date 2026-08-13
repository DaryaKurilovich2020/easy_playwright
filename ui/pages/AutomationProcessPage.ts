import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";
import {NodePanel} from "../components/NodePanel";

export class AutomationProcessPage extends BasePage{
    private readonly nodePanel: NodePanel;
    constructor(page: Page) {
        super(page);
        this.nodePanel = new NodePanel(this.page.locator("#root"));
    }

    async goBackToList() {
        await this.page.waitForLoadState("networkidle");
        const backToListButton = this.getByText("Back to List");
        await backToListButton.waitFor({ state: "visible", timeout: 160000 });
        await backToListButton.click();
    }

    async getNodeParamsValues(params: string[]) {
        return this.nodePanel.getFormDataAsArray(params);
    }

}