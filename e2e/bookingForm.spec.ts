import { test, expect, Page } from "@playwright/test";
import mockDate from "./helpers/mockDate";

mockDate();

test.describe("Form actions", () => {
  const createBookingForProperty1 = async (page: Page) => {
    await page.goto("/properties/1");
    await page.getByTestId("date-range-input").getByRole("button").click();

    // Select days range
    await page.getByLabel('Wednesday, April 17,').click();
    await page.getByLabel('Friday, April 19,').click();

    await expect(page.getByText("$396.00")).toBeVisible();
    await page
      .getByRole("button", { name: "Book this property", exact: true })
      .click();

    // After submit
    await expect(page.getByText("Your booking is saved")).toBeVisible();
    await expect(page.getByText("Apr 17 to Apr 19 of")).toBeVisible();
    await expect(page.getByText("$396.00")).toBeVisible();
  };

  test("should create a booking with a range of days do a complete navigation", async ({
    page,
  }) => {
    await createBookingForProperty1(page);
  });

  test("should change booking dates", async ({ page }) => {
    await createBookingForProperty1(page);

    await page.getByRole("link", { name: "Change booking" }).click();

    // Select single day
    await page.getByTestId("date-range-input").getByRole("button").click();
    await page.getByLabel('Saturday, April 20,').click();
    await page.getByLabel('Saturday, April 20,').click();

    await expect(page.getByText("$132.00")).toBeVisible();
    await page
      .getByRole("button", { name: "Save your changes", exact: true })
      .click();

    // After submit
    await expect(page.getByText("Your booking is saved")).toBeVisible();
    await expect(page.getByText("Apr 20 of 2024")).toBeVisible();
    await expect(page.getByText("$132.00")).toBeVisible();
  });

  test("should remove booking", async ({ page }) => {
    await createBookingForProperty1(page);

    await page.getByRole("link", { name: "Change booking" }).click();

    await page.getByRole("button", { name: "Delete", exact: true }).click();

    // After submit
    await expect(
      page.getByRole("heading", { name: "Book this property" })
    ).toBeVisible();
    await expect(page.getByText("Your booking is saved")).toBeHidden();
    await expect(page.getByText("Apr 17 to Apr 19 of")).toBeHidden();
    await expect(page.getByText("$396.00")).toBeHidden();
  });

  test("should display error if wrong days are selected", async ({ page }) => {
    await page.goto("/properties/1");
    await page.getByTestId("date-range-input").getByRole("button").click();

    // Select days range
    await page.getByLabel('Wednesday, April 17,').click();
    await page.getByLabel('Friday, April 19,').click();

    await page.getByTestId('start-date').getByTestId('day').fill('2')


    await expect(page.getByTestId('error-message').nth(0)).toBeVisible();
    await expect(page.getByRole("button", { name: "Book this property", exact: true })).toBeDisabled()
  });
});
