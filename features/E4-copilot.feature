Feature: Login to the application

    Background:
        Given I am on the Home page

    Scenario: Successful login
        Given >> "I am on the Login page"
        When I fill username "wopee@tesena.com" and password "admin124"
        And I click the login button
        Then I should be logged in


# 
# Solution
# 

    # Scenario: Successful login
    #     Given >> "I am on the Login page"
    #     When >> "Fill username 'wopee@tesena.com' and password 'admin124'"
    #     And >> "I click the login button"
    #     Then >> "I should be logged in (logout button should be visible)"

    # Scenario: Navigate to the Gallery page
    #     Given >> "I click the Gallery link"
    #     Then >> "I should see Gallery page"
    #     And >> "I should see embedded youtube video"

    # Scenario: Submit the order page for 2 drones
    #     Given >> "I am on the Order page"
    #     When >> "I select '2' drones"
    #     And >> "I fill the card details (use some valid stripe testing card number)"
    #     And >> "I click the submit button"

    #     Then >> "I should see a confirmation message with 'Thank you for your order!'"
    #     Then >> "I should see a link to Home page"

