import { APIRequestContext } from "@playwright/test";

export class UserController {
    constructor(private request: APIRequestContext) {
    }

    async getCurrentUser() {
        return await this.request.get("/api/v1/users/currentuser");
    }
}
