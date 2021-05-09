Feature: Ghots Post Page

    I want to open ghost app
    Scenario: Created a post
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I create a post with title "Post Test" and body "Cuerpo texto"
        Then The post "Post Test" should be created
    Scenario: Update a post
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I create a post with title "Post Test" and body "Cuerpo texto"
        When I change title with old text "Post Test" for new text "Post Test 2"
        Then The post "Post Test" should be updated
    Scenario: Publish a post
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I published a specific post with title "Post Test"
        Then The post "Post Test" should be published

    Scenario: Delete a post
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I delete a "Post Test"
        Then The post "Post Test" should not be found

    Scenario: Change draft post to publish 
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When  I create a post with title "Post Test" and body "Cuerpo texto"
        When I published a draft post with title "Post Test"
        Then The post "Post Test" should be published

