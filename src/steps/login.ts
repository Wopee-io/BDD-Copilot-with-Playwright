import { ICustomWorld } from "../support/custom-world";
import { Given, When, Then } from "@cucumber/cucumber";

import { expect } from "@playwright/test";

Given("I am on the Home page", async function (this: ICustomWorld) {
  const { page } = this;
  await page?.goto("https://dronjo.wopee.io");
  await page?.screenshot();
});

Given("I navigate to Login page", async function (this: ICustomWorld) {
  const { page } = this;

  await page?.click("#sign_in");
  await page?.screenshot();
});

When(
  "I fill username {string} and password {string}",
  async function (this: ICustomWorld, username: string, password: string) {
    const { page } = this;

    await page?.fill(`input[name="user"]`, username);
    await page?.fill(`input[name="password"]`, password);
  }
);

Then("I click the login button", async function (this: ICustomWorld) {
  const { page } = this;
  await page?.click("button >> text=sign in");
});

Then("I should be logged in", async function (this: ICustomWorld) {
  const { page } = this;

  if (!page) {
    throw new Error("Page object is not available");
  }

  const logOutButton = page.locator("text=Log out >> visible=true");
  await expect(logOutButton).toBeVisible();
  const image = await page?.screenshot();
  image && (await this.attach(image, "image/png"));
});

Then("I should NOT be logged in", async function (this: ICustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";

  // Posible solution
  // await expect(
  //   this.page!.locator("button >> text=Sign in >> visible=true")
  // ).toBeVisible();
});
