import { APIRequestContext } from "@playwright/test";

export class AuthController {
  constructor(private request: APIRequestContext) {}

  async login() {
    const response = await this.request.post("/authrpa/oauth2/token", {
      form: {
        client_id: process.env.CLIENT_ID || "",
        client_secret: process.env.CLIENT_SECRET || "",
        grant_type: process.env.GRANT_TYPE || "client_credentials",
        scope: process.env.SCOPE || "",
      },
    });

    const responseText = await response.text();

    if (!response.ok()) {
      throw new Error(`Auth failed [${response.status()}]: ${responseText}`);
    }

    const body = JSON.parse(responseText);
    return body.access_token;
  }
}