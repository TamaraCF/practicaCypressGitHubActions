Feature: SignIn and Checkout
    Validate SignIn and Checkout Scenarios

    Scenario: We sign in and go to my account page
        Given I am in the Sign In page
        When I enter a valid email
        And I complete the formulary correctly
        Then I should see my account page

    Scenario: We log in and checkout
        Given As a logged user I am in the shopping cart with one item 
        When I click proceed to checkout
        And I complete checkout process
        Then I should see the order confirmation page 

    Scenario: Checkout without log in
        Given As a not logged user I am in the shopping cart with a item 
        When I click proceed to checkout 
        And I log with valid credentials 
        And I complete checkout process 
        Then I should see the order confirmation page 