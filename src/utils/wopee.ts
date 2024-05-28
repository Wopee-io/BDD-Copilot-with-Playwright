import { Page, expect } from "@playwright/test";

import OpenAI from "openai";
import * as fs from "fs";

require("dotenv").config();

// Defaults
// https://platform.openai.com/docs/models/continuous-model-upgrades
const model = process.env["OPENAI_MODEL"] || "gpt-3.5-turbo";
console.log("Model:", model);

export class WopeeCopilot {
  private openai: OpenAI;
  private page: Page;

  constructor(page: Page) {
    this.openai = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"] });
    this.page = page;
  }

  async action(action: string) {
    // console.log("Action:", action);

    const templateFile = "./src/utils/prompts/steps.txt";
    const html = await this.page.content();

    const prompt = this.buildPrompt(templateFile, { html, action });
    console.log("Prompt:", prompt);
    const response = await this.chat(prompt);

    const steps = this.getSteps(response || "");

    console.log("Steps:", steps);

    await this.interact(steps);
  }

  async fillForm() {
    // console.log("Action: Fill form");

    const templateFile = "./src/utils/prompts/fill-form.txt";
    const html = await this.page.content();

    const prompt = this.buildPrompt(templateFile, { html });
    const response = await this.chat(prompt);
    const steps = this.getSteps(response || "");

    await this.interact(steps);
  }

  async Given(step: string) {
    await this.BDD(step, "Given");
  }

  async When(step: string) {
    await this.BDD(step, "When");
  }

  async Then(step: string) {
    await this.BDD(step, "Then");
  }

  async And(step: string) {
    await this.BDD(step, "And");
  }

  private async BDD(step: string, stepType: string) {
    // console.log("BDD Step: ", stepType, step);

    const templateFile = "./src/utils/prompts/bdd.txt";
    const html = await this.page.content();
    const url = this.page.url();

    const prompt = this.buildPrompt(templateFile, {
      html,
      step,
      stepType,
      url,
    });
    const response = await this.chat(prompt);
    const steps = this.getSteps(response || "");

    console.log("Steps:", steps);

    await this.interact(steps);
  }

  private getSteps(response: string | undefined) {
    return JSON.parse(response || "").steps?.map((stepData: any) => ({
      step: stepData.step,
      locator: stepData.locator,
      value: stepData.value,
      action: stepData.action,
    }));
  }

  private async interact(steps: Step[]) {
    if (!steps) return;

    for (const step of steps) {
      if (step.action === "goto") {
        await this.page.goto(step.value);
      } else if (step.action === "select") {
        await this.page.selectOption(step.locator, step.value);
      } else if (step.action === "click") {
        await this.page.click(step.locator);
      } else if (step.action === "fill") {
        await this.page.fill(step.locator, step.value);
      } else if (step.action === "isVisible") {
        await expect(this.page!.locator(step.locator)).toBeVisible();
      } else {
        console.log("Invalid action");
      }
    }
  }

  //   https://platform.openai.com/docs/api-reference/chat/create
  async chat(message: string) {
    // console.log("Chat:", message);
    const chatCompletion = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model,
      response_format: { type: "json_object" },
      temperature: 0.7, // default 1
    });

    return chatCompletion.choices[0].message.content;
  }

  private buildPrompt(templateFile: string, data: { [key: string]: any }) {
    const templateContent = fs.readFileSync(templateFile, "utf8") || "";
    const prompt = templateContent.replace(
      /{{\s*(\w+)\s*}}/g,
      (match, placeholder) => {
        return data[placeholder] || match; // Replace with data if available, otherwise keep the placeholder
      }
    );
    return prompt;
  }
}

type Step = {
  step: string;
  locator: string;
  value: string;
  action: string;
};
