import { test, expect } from "@playwright/test";
import mockDate from "./helpers/mockDate";

mockDate();

test.describe("Template Header", () => {
  test("should display header", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Booking App" })
    ).toBeVisible();
  });

  test("should display Back button", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "< Back" })).toBeHidden();

    page.getByRole('link', { name: 'Cozy Cottage Retreat Cozy' }).click()

    await expect(page.getByRole("link", { name: "< Back" })).toBeVisible();
  });

  test("should display Booked button if have bookings", async ({ page }) => {
    await page.goto("/properties/1");

    // Booked button should not exist
    await expect(page.getByRole("link", { name: "Booked" })).toBeHidden();

    // Create booking
    await page.getByTestId("date-range-input").getByRole("button").click();
    await page.getByLabel("17").click();
    await page.getByLabel("19").click();
    await expect(page.getByText('$396.00')).toBeVisible();
    await page.getByRole('button', { name: 'Book this property', exact: true }).click()

    await expect(page.getByText('Your booking is saved')).toBeVisible();
    await expect(page.getByText('Apr 17 to Apr 19 of')).toBeVisible();
    await expect(page.getByText('$396.00')).toBeVisible();

    // header link should appear after first booking
    await page.getByRole('link', { name: 'Booked' }).click()
    await page.waitForURL('/properties?filter=booked')
  });
});
