Feature: Google Main Page

  I want to open ghost app

  Scenario: Login with valid credentials
    Given I open ghost page
    When I login with "admin-user@mailsac.com" and password "Test4echo!"
    Then I see "admin-user@mailsac.com" in the home page
  Scenario: Login as admin user
    Given I open ghost page
    When I login with "admin-user@mailsac.com" and password "Test4echo!"
    Then I see admin section in the home page
  Scenario: Login as editor user
    Given I open ghost page
    When I login with "staff-user@mailsac.com" and password "Test4echo!"
    Then I am not able to see admin section in the home page
