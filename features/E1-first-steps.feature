# https://github.com/Wopee-io/BDD-Copilot-with-Playwright?tab=readme-ov-file#1-first-steps-with-bdd-in-playwright

Feature: Login to the application
    Background:
        Given I am on the Home page

    Scenario: Successful login
        Given I navigate to Login page
        When I fill username "wopee@tesena.com" and password "admin124"
        And I click the login button
        Then I should be logged in


# 
# Solution: Option 1
# 

    # Scenario: Login with an empty password
    #     Given I navigate to Login page
    #     When I fill username "" and password ""
    #     And I click the login button
    #     Then I should NOT be logged in

    # Scenario: Login with an empty username
    #     Given I navigate to Login page
    #     When I fill username "" and password "admin124"
    #     And I click the login button
    #     Then I should NOT be logged in

# 
# Solution: Option 2
# 

    # Scenario: Login with an <name>
    #     Given I navigate to Login page
    #     When I fill username <username> and password <password>
    #     And I click the login button
    #     Then I should NOT be logged in

    #     Examples:
    #         | name | username | password |
    #         | empty password | "wopee@tesena.com" | "" |
    #         | empty username | "" | "admin124" |
