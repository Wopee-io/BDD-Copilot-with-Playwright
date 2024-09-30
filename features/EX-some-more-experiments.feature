# https://github.com/Wopee-io/BDD-Copilot-with-Playwright?tab=readme-ov-file#4-llm-driven-code-generation

# Here are a few more examples to play with the idea of BDD Copilot
# 
# Remember: 
# 
# - Context is important, so the more context you provide, the better instructions you will get 
# - This approach require fine-tuning and adjustments to the prompts and step descriptions

Feature: Login to the application
    Background:
        Given I am on the Home page

    Scenario: Successful login
        Given I navigate to Login page
        When I fill username "wopee@tesena.com" and password "password"
        And I click the login button
        Then I should be logged in

    Scenario: Unsuccessful login
        Given I navigate to Login page
        When I click the login button
        # TODO: Fix the following step - step description or fine-tune prompt
        Then >> "I should see an error message"

    Scenario: Forgotten password
        Given >> "I am on the login page"
        When >> "I click the forgotten password link"
        # TODO: Fix the following step - step description or fine-tune prompt
        Then >> "I should be redirected to the Contact page"

# ----
# TODO: Implement the following scenarios using BDD Copilot `>>` prompt
# ----
    @high
    Scenario: User signs in with valid credentials
        Given I am on the Login page
        When I fill username "user@example.com" and password "correctpassword"
        And I click the login button
        Then I should be redirected to the Home page with Logout button visible

    @high
    Scenario: User signs in with an invalid password
        Given I am on the sign-in page
        When I fill username "user@example.com" and an invalid password "wrongpassword"
        And I click the login button
        Then I should see an error message "Incorrect email or password"
        And I should remain on the sign-in page

    @medium
    Scenario: User attempts to sign in with an invalid email format
        Given I am on the sign-in page
        When I enter an invalid email format "userexample.com" and a password "anyPassword"
        And I click the "Sign In" button
        Then I should see an error message "Please enter a valid email address"
        And I should remain on the sign-in page

    @high
    Scenario: User attempts to sign in with empty fields
        Given I am on the sign-in page
        When I leave the email field empty
        And I leave the password field empty
        And I click the "Sign In" button
        Then I should see error messages "Email is required" and "Password is required"
        And I should remain on the sign-in page

    @medium
    Scenario: User uses the password recovery link
        Given I am on the sign-in page
        When I click the "Forgot Password?" link
        Then I should be redirected to the password recovery page
        And I should see a form to enter my email for password recovery
