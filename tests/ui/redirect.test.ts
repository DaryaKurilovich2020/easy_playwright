import { expect, test } from "../../ui/fixtures/auth.fixture";
import { HelpPage } from "../../ui/pages/HelpPage";

test.describe("Main page redirect test", () => {
  test('should redirect from main page to "Find out more"', async ({
    mainPage,
    page,
    context,
  }) => {
    const pagePromise = context.waitForEvent("page");
    await mainPage.redirectToFindOutMore();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    const helpPage = new HelpPage(newPage);
    await helpPage.search("Node Management");
    await expect(newPage).toHaveURL(
      /\/help\/docs\/Control-Server-User-Guide\/Node-Management/,
    );
    await expect(
      newPage.getByRole("heading", { name: "Node Management", exact: false }),
    ).toBeVisible();
  });
});
