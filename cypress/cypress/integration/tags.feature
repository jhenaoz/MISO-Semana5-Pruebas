Feature: Google Main Page

  I want to open ghost app
#Given (precondiciones) usuario admin, tags page
#when accion (crear un tag)
#then assert (verificar que el tag este creado)
  Scenario: Create a public tag
    Given I open ghost page
    When I login with "admin-user@mailsac.com" and password "Test4echo!"
    When I create a new tag with the name "test tag"
    Then The tag "test tag" should be created
  Scenario: Create an internal tag
    Given I open ghost page
    When I login with "admin-user@mailsac.com" and password "Test4echo!"
    When I create a new tag with the name "#internal tag"
    Then The internal tag "#internal tag" should be created
  Scenario: Delete a tag
    Given I open ghost page
    When I login with "admin-user@mailsac.com" and password "Test4echo!"
    When I create a new tag with the name "test tag"
    When I delete a "test tag"
    Then The tag "test tag" should not be present
