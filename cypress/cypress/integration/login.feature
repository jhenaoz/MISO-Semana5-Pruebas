Feature: Google Main Page

  I want to open ghost app
  
  @focus
  Scenario: Login with invalid credentials
    Given I open ghost page
    When I login with "fakemail2@fakemail.com" and password "fakepassword"
    Then I see "Access denied." in the page