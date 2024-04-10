import { test, expect } from "@playwright/test";
import mockedProperties from "../src/utils/mockedProperties";
import mockDate from "./helpers/mockDate";

mockDate();

test.describe("Property list", () => {
  test("should display all properties", async ({ page }) => {
    await page.goto("/");

    const propertiesItems = page.getByTestId("properties-grid-item");
    await expect(propertiesItems).toHaveCount(10);

    const checkItems = mockedProperties.properties.map(async (prop) => {
      await expect(
        page.getByRole("heading", { name: prop.title })
      ).toBeVisible();
    });

    await Promise.all(checkItems);
  });

  test("should go to the single property page and display the booking form", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "< Back" })).toBeHidden();
    await page
      .getByRole("link", { name: mockedProperties.properties[0].title })
      .click();

    await expect(
      page.getByRole("heading", { name: "Book this property" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "< Back" })).toBeVisible();
    await expect(page.getByTestId("date-range-input")).toBeVisible();
  });

  test("should display only booked properties", async ({ page }) => {
    await page.goto("/properties/1");

    // Booked button should not exist
    await expect(page.getByRole("link", { name: "Booked" })).toBeHidden();

    // Create booking
    await page.getByTestId("date-range-input").getByRole("button").click();
    await page.getByLabel("17").click();
    await page.getByLabel("19").click();
    await expect(page.getByText("$396.00")).toBeVisible();
    await page
      .getByRole("button", { name: "Book this property", exact: true })
      .click();

    await expect(page.getByText("Your booking is saved")).toBeVisible();
    await expect(page.getByText("Apr 17 to Apr 19 of")).toBeVisible();
    await expect(page.getByText("$396.00")).toBeVisible();

    // header link should appear after first booking
    await page.getByRole("link", { name: "Booked" }).click();
    await page.waitForURL("/properties?filter=booked");

    await expect(page.getByText("Apr 17 to Apr 19 of")).toBeVisible();
    const propertiesItems = page.getByTestId("properties-grid-item");
    await expect(propertiesItems).toHaveCount(1);
  });

  test("should display empty view if no properties", async ({ page }) => {
    await page.goto("/properties?filter=booked");

    await expect(page.getByText("No properties found")).toBeVisible();
  });
});
