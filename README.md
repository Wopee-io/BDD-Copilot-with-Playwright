# Build your own BDD Copilot with Playwright

## Initial setup

### Set up VS Code and Playwright

- Install Node.js: https://nodejs.org/en/download/
- Set up VS Code and Playwright: https://playwright.dev/docs/getting-started-vscode

Note: Users should have admin rights on their laptops, which will make it easier for us to install and access other tools & resources (like AI APIs we will use).

### Clone this repository

- Windows users: Ctrl+Shift+P -> Git: Clone -> link to this repository
- Mac users: Cmd+Shift+P -> Git: Clone -> link to this repository

### Install dependencies

```bash
npm i
```

### Set `.env` file

See `.env.example` file and set the following variables: `OPENAI_API_KEY` and (optionally) `OPENAI_MODEL`.

## Introduction (already covered - see slides)

- BDD Fundamentals
- Exploring Playwright
- AI-Augmented Playwright Testing

## Experiments

### 1. First Steps with BDD in Playwright

#### 1.1. Writing a new scenarios

- explore `features/E1-first-steps.feature` file
- implement 2 more scenarios in `features/E1-first-steps.feature`

  - `Scenario: Login with an empty password`
  - `Scenario: Login with an empty username`

  _Hint: Use step `I should NOT be logged in` to assert results where you have step prepared however we will implement it in the next step._

#### 1.2. Implementing `I should NOT be logged in` step definitions

- explore `src/steps/steps/login.ts` file
- implement the step definition for `I should NOT be logged in`

  ```typescript
  Then("I should NOT be logged in", async () => {
    // implement the step
  });
  ```

### 2. Prompting & OpenAI REST API

#### 2.1. Prompting

Explore [Vercel AI SDK](https://sdk.vercel.ai/) to interact with LLM models.
Alternatively, you can use [HuggingChat](https://huggingface.co/chat/) to interact with LLM models.

1. Try the following prompt:

```text
Propose a test scenario using Playwright in TypeScript to login to the CRM application.
```

2. Try any other prompt that would help you with your daily tasks.

3. Discuss the following questions:

- What is the best LLM model for the given task?
- What are the parameters to consider when selecting the best LLM model?
- What are the limitations of the LLM models?

#### 2.2. OpenAI REST API

Explore:

- [OpenAI Chat API documentation](https://platform.openai.com/docs/api-reference/chat). Useful parameters for our experiments: `model`, `messages`, `temperature`.
- API management: [OpenAI API keys](https://platform.openai.com/api-keys)
- Marcel will provide API Key: `OPENAI_API_KEY=sk-...` now.

_Note: We will use OpenAI Chat API for very basic use cases. You are welcome for more experiments after this workshop._

### 3. LLM-Driven Test Design

Use [examples from chatGPT](https://chatgpt.com/share/ce4a398e-b15d-47e1-a2c3-b90f8ad7bcd6) and use them for further experiments.

Generate test scenarios for a given feature file (by using [Vercel AI SDK](https://sdk.vercel.ai/)), e.g. Login feature, Registration feature, Checkout feature, Create new order, etc. Improve the following prompt:

Example 1:

```text
I am senior QA engineer. I am responsible for testing the `login feature` of the CRM application.

I need to write test scenarios for the login feature. Use Gerkin syntax to write the test scenarios. Use the following test data:
- url of the application: `https://example.com`
- username: `admin`
- password: `admin123`
```

Example 2:

```text
I am senior QA engineer. I am responsible for testing the `registration feature` of the food delivery application.

I need to write test scenarios for the login feature. Use Gerkin syntax to write the test scenarios. Use the following test data:
- url of the application: `https://example.com`
- username: `admin`
- password: `admin123`

Also consider the following requirements:
- following fields are required: `name`, `email`, `password`, `phone number`
- following fields are optional: `address`, `city`, `state`, `zip code`
```

### 4. LLM-Driven Code Generation

#### 4.1. Basic prompts

Generate code snippets (Use [Vercel AI SDK](https://sdk.vercel.ai/)) for the following scenario step:

```text
Generate code snippet for Playwright Typescript test for the following scenario step:
Given I am on the login page
```

OR

```text
Generate code snippet for Playwright Typescript test for the following scenario step:
When I enter the username "admin" and password "admin123"
```

#### 4.2. More-advanced prompts

Replace placeholders `{{ placeHolder}}` with actual values:

````text
I'm a test engineer writing tests in Playwright using TypeScript and the BDD style.
I've opened a web page, followed the steps in a test scenario, and now I want to perform the next step on the website.

Step details:
- Step Description: {{ step }}
- Step Type: {{ stepType }}
- Current URL: {{ url }}
- HTML Code:

```html
{{ html }}
```

Propose none, a single step or more steps to accomplish it in JSON format to accomplish the described step.
Follow thoroughly the step instructions.

Each action should follow these guidelines:

1. Use the exact HTML code provided.
2. Use realistic test data.
3. Ensure actions are realistic and consider typical validations.
4. Use the most appropriate locator strategy.
5. Use the most appropriate action for the step type. Do not propose any action which is not necessary to accomplish the step.

Example JSON output:

```json
[
  { "step": 1, "action": "goto", "value": "https://example.com/login" },
  { "step": 2, "locator": "#name", "action": "fill", "value": "Marcel" },
  { "step": 3, "locator": "#pswd", "action": "fill", "value": "abc123" },
  { "step": 4, "locator": ".submit", "action": "click" }
]
```
````

#### 4.3. Generate code (instructions) on the fly

#### 4.3.1. Writing a new scenarios

- Explore `features/E4-copilot.feature` file
- Implement a few more (first) scenarios:

  - `Scenario: Navigate to the Gallery page`
  - `Scenario: Submit the order page for 2 drones`
  - `Scenario: Successful login with valid credentials`

Hints:

- Use `>>` prefix to generate steps on the fly, e.g. `Given >> "I am on the login page"` or `When >> "I enter the username 'admin' and password 'admin123'"`
- Assertions need to be done in the traditional way (not using AI). More prompt tuning is needed to generate proper assertions.
- When steps are faining you can try fine-tuning the prompt to generate the proper steps.

#### 4.3.2. Implementing step? Not needed

Implementing steps is not needed however you need to fine-tune the prompt to generate the code snippets for the given scenario steps in your particular case.

Remember:

- Context is important, so the more context you provide, the better instructions you will get
- This approach requires fine-tuning and adjustments to the prompts and step descriptions

### 5. Opportunities for Improvement (discussion - only if time allows)

- More assert types
  - More prompt tuning is needed to generate proper assertions + adjustment of the generic implementation of logic for steps
  - Combination with visual testing (try our visual testing solution at [Wopee.io](https://wopee.io/))
  - OpenAI vision model - assertions
- The generated code snippets are not always perfect, so
  - retry functionality would be useful
  - learning and testing mode would improve repeatability and stability (and save costs for the API calls)
- Implementing a crawler to generate feature files (test scenarios) would improve efficiency even more
- Caching the responses
- Cost optimization

#### Useful links

- [Open AI Models](https://platform.openai.com/docs/models)
- [Getting Started with Playwright Visual Testing](https://wopee.io/blog/getting-started-with-playwright-visual-testing)
- [Playwright Testing on Autopilot](https://youtu.be/GGNPv-6stCU?si=PpaSHTQf_i2Mpqzw)
- [Wopee.io](https://wopee.io) - Autonomous Testing Platform

## What's next?

- Try Wopee.io https://cmd.wopee.io/
- Connect with me https://www.linkedin.com/in/marcelveselka/
- Do you need to boost your skills or test automation practice? 🤩 Let's talk: https://wopee.io/marcel
