import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";
import {ParamsPanel} from "../components/ParamsPanel";

export class AutomationProcessPage extends BasePage{
    private readonly nodePanel: ParamsPanel;
    constructor(page: Page) {
        super(page);
        this.nodePanel = new ParamsPanel(this.page.locator("#root"));
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