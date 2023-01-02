Feature: Home Page
    Validate Home Page Scenarios

    Background:
        Given I am in the home page

    # Scenario: We come from spain market and go to france in english
    #     When I click the "ESPAÑA" button
    #     And I select "France English" in the dropdown menu
    #     And I click the "Go" button
    #     Then I should see the web for that market

    # Scenario: We are in home page and go to contact info page
    #     When I click on the custom service button
    #     Then I should see the contact info

    # Scenario: We are in home page and go to new in section
    #     When I click on the menu button
    #     And I click on New In
    #     Then I should see New in section

    # Scenario: We are in home page and search a product on search box
    #     When I fill the search box with “Pantalones crochet”
    #     And I click on the search button
    #     Then I should see products with the specified criteria

    # Scenario Outline: We are in home page and change market
    #     When I click the "ESPAÑA" button
    #     And I select '<market>' in the dropdown menu
    #     And I click the "Go" button
    #     Then I should see the '<marketURL>' URL
    #     Examples:
    #         | market                   | marketURL                    |
    #         | United Kingdom (English) | https://www.oysho.com/gb/    |
    #         | Deutschland (English)    | https://www.oysho.com/de/en/ |
    #         | Italia (Italiano)        | https://www.oysho.com/it/    |

    # Scenario: We are in home page and go to shopping guide
    #     When I click on “Shopping guide” button
    #     Then I should see the how to buy page

    # Scenario: We are in home page and we subscribe to newsletter
    #     When I type a valid email in the "Escribe tu e-mail" field
    #     And I click the arrow button
    #     Then I should see the "Newsletter" page

    Scenario: We are in home page and go to sport section
        When I click on the menu button
        And I click on Sport
        Then I should see Sport section