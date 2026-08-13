import {apiTest, expect} from "../../fixtures/api.fixture";

apiTest.describe("API: User Operations", () => {
        apiTest("should GET current user info", async ({userController}) => {
            const response = await userController.getCurrentUser();
            expect(response.status()).toBe(200);
            const body = await response.json();

            expect(body).toHaveProperty('username');
            expect(typeof body.username).toBe('string');
            expect(body.username).toEqual(process.env.CLIENT_ID);

            expect(body).toHaveProperty('id');
            expect(typeof body.id).toBe('number');

            expect(body).toHaveProperty('firstName');
            expect(typeof body.firstName).toBe('string');

            expect(body).toHaveProperty('lastName');
            expect(typeof body.lastName).toBe('string');

            expect(body).toHaveProperty('email');
            expect(typeof body.email).toBe('string');

            expect(body).toHaveProperty('groups');
            expect(Array.isArray(body.groups)).toBe(true);
        });
    }
);