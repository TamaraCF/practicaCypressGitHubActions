Feature: Product Page

    Validate Product Page Scenarios

    Background:
        Given I am in a product page

    Scenario: We are in product page and add a product to shopping cart
        When I add the product to the shopping cart 
        And I go to the shopping cart 
        Then I should see the product in the shopping cart 

    Scenario: We are in product page and add a product to wish-list
        When I add a product to Wish-List 
        And I navigate to wish-list 
        Then I should see the product on the wish-list