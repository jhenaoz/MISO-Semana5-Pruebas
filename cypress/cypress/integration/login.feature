Feature: Google Main Page

  I want to open ghost app
  
  @focus
  Scenario: Login with no registered user
    Given I open ghost page
    When I login with "fakemail2@fakemail.com" and password "fakepassword"
    Then I see "There is no user with that email address." in the page

  @focus
  Scenario: Login invalid credentials
    Given I open ghost page
    When I login with "admin-user@mailsac.com" and password "fakepassword"
    Then I see "Your password is incorrect." in the page
     