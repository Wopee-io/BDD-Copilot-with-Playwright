import { ICustomWorld } from "../support/custom-world";
import { WopeeCopilot } from "../utils/wopee";
import { Then } from "@cucumber/cucumber";

Then(">> {string}", async function (this: ICustomWorld, step: string) {
  const { page } = this;

  if (!page) {
    throw new Error("Page object is not available");
  }
  const wopeeCopilot = new WopeeCopilot(page);
  await wopeeCopilot.Then(step);

  await page.screenshot({ path: `screenshots/${step}.png` });
  // IDEA: Implement visual regression testing here?
});
