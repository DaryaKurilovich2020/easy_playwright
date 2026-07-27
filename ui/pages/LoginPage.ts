import {Locator, Page} from "@playwright/test";

export class LoginPage {
    private readonly page: Page;
    private readonly loginInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    readonly errorBlock: Locator;

    async open() {
        this.page.goto('/authrpa/login');
    }

    constructor(page: Page) {
        this.page = page;
        this.loginInput = page.locator("input#input_username");
        this.passwordInput = page.locator("input#input_password");
        this.loginButton = page.locator("//button[@type='submit']");
        this.errorBlock = page.locator(("div#error_block"));
    }

    async login(username:string, password:string) {
        await this.loginInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}