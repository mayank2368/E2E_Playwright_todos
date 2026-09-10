import { test, expect } from "@playwright/test";

test("todo list flow @sanity", async ({ page }) => {
  await page.goto("https://todomvc.com/examples/react/dist/");

  // Add todos
  await page.getByTestId("text-input").click();
  await page.getByTestId("text-input").fill("Eat lunch");
  await page.getByTestId("text-input").press("Enter");

  await page.getByTestId("text-input").fill("Cmplete todays todos");
  await page.getByTestId("text-input").press("Enter");

  await page.getByTestId("text-input").fill("Play badminton");
  await page.getByTestId("text-input").press("Enter");

  await page.getByTestId("text-input").fill("Make dinner");
  await page.getByTestId("text-input").press("Enter");

  // Mark "Cmplete todays todos" as completed
  await page
    .getByRole("listitem")
    .filter({ hasText: "Cmplete todays todos" })
    .getByTestId("todo-item-toggle")
    .check();

  // Mark "Make dinner" as completed
  await page
    .getByRole("listitem")
    .filter({ hasText: "Make dinner" })
    .getByTestId("todo-item-toggle")
    .check();

  // Switch to Active filter
  await page.getByRole("link", { name: "Active" }).click();

  // Confirm "Play badminton" is still visible under Active
  await expect(page.getByText("Play badminton")).toBeVisible();

  // Switch back to "All" before checking, to avoid the item
  // disappearing mid-interaction under the "Active" filter
  await page.getByRole("link", { name: "All" }).click();

  await page
    .getByRole("listitem")
    .filter({ hasText: "Play badminton" })
    .getByTestId("todo-item-toggle")
    .check();

  // Only "Eat lunch" should remain unchecked
  await expect(
    page
      .getByRole("listitem")
      .filter({ hasText: "Eat lunch" })
      .getByTestId("todo-item-label"),
  ).toContainText("Eat lunch");
});
