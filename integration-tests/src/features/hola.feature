Feature:
    In order to add a book to my collection
    as a User of MyReads
    I want to make sure that everything works as expected

Scenario: Search for Android books
    Given I open the url "http://localhost:3000"
    When I click on the element ".open-search a"
    And I set "android" to the inputfield ".search-books-input-wrapper input"
    And I press "Enter"
    Then I expect that the title is "MyReads"
    And I expect that element ".books-grid" does appear exactly "1" times

Scenario: When I enter a bad search no books should appear
    Given I open the url "http://localhost:3000/search"
    And I set "aaaa" to the inputfield ".search-books-input-wrapper input"
    And I press "Enter"
    Then I expect that element ".books-grid book" does not exist
