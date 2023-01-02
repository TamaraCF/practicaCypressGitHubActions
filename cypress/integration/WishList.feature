Feature: Wish List Page

    Validate Wish List Page Scenarios

    Background:
        Given I am in wish list page with a product 

    Scenario: We are in wish-list page and move a product to shopping bag
        When I move the item to the shopping bag
        Then I see the wish-list empty 
        And I should see the product on the shopping bag