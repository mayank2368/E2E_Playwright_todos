import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://todomvc.com/examples/react/dist/");
  await page.getByTestId("text-input").click();
  await page.getByTestId("text-input").fill("Eat lunch");
  await page.getByTestId("text-input").press("Enter");
  await page.getByTestId("text-input").click();
  await page.getByTestId("text-input").fill("Cmplete todays todos");
  await page.getByTestId("text-input").press("Enter");
  await page.getByTestId("text-input").fill("Play badminton");
  await page.getByTestId("text-input").press("Enter");
  await page.getByTestId("text-input").fill("Make dinner");
  await page.getByTestId("text-input").press("Enter");
  await page
    .getByRole("listitem")
    .filter({ hasText: "Cmplete todays todos" })
    .getByTestId("todo-item-toggle")
    .check();
  await page
    .getByRole("listitem")
    .filter({ hasText: "Make dinner" })
    .getByTestId("todo-item-toggle")
    .check();
  await page.getByRole("link", { name: "Active" }).click();
  await expect(page.getByText("Play badminton")).toBeVisible();
  await page
    .getByRole("listitem")
    .filter({ hasText: "Play badminton" })
    .getByTestId("todo-item-toggle")
    .check();
  await expect(page.getByTestId("todo-item-label")).toContainText(
    "Eat lunch...",
  );
});
