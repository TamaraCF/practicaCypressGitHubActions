Feature: Shopping Cart Page

    Validate Shopping Cart Page Scenarios

    Background:
        Given As a not logged used I am in the shopping cart with one item 

    Scenario: We are in shopping cart page and delete a product
        When I remove the item from the shopping cart  
		Then I should see the shopping cart empty 

    Scenario: We are in shopping cart page and move to checkout without login
        When I click on "Continue" button
    	Then I should see the checkout page with a login request