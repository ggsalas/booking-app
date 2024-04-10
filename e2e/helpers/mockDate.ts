import { test } from "@playwright/test";

export default function mockDate() {
  test.beforeEach(async ({ page }) => {
    const fakeNow = new Date("Apr 11 2024 13:00:00").valueOf();

    await page.addInitScript(`{
    Date = class extends Date {
      constructor(...args) {
        if (args.length === 0) {
          super(${fakeNow});
        } else {
          super(...args);
        }
      }
    }

    const __DateNowOffset = ${fakeNow} - Date.now();
    const __DateNow = Date.now;
    Date.now = () => __DateNow() + __DateNowOffset;
  }`);
  });
}

