Feature: Customer Service Page

    Validate Customer Service Page Scenarios

    Background:
        Given I am in customer service page 

    Scenario Outline: We are in customer service page and see the size guide
        When I click the size guide link 
        And I click the '<opcionPrenda>' button 
        Then I should see the '<opcionPrenda>' content as expected 
    
        Examples: 
        | opcionPrenda  | 
        | sujetadores   | 
        | braguitas     | 
        | ropa          | 
        | banadores     | 
        | hombre        | 
        | calzado       | 