Feature: Ghost page

I want to open ghost app
    Scenario: Created a page
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I create a page with title "Page Test" and body "Cuerpo texto"
        Then The page "Page Test" should be created
    Scenario: Update a page
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I create a page with title "Page Test" and body "Cuerpo texto"
        When I change title with old text "Page Test" for new text "Page Test 2"
        Then The page "Page Test" should be updated
    Scenario: Publish a page
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I create a page with title "Post Test" and body "Cuerpo texto"
        When I published a specific page with title "Post Test"
        Then The page "Post Test" should be published

    Scenario: Delete a page
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I create a page with title "Post Test" and body "Cuerpo texto"
        When I delete a "Post Test"
        Then The page "Post Test" should not be found