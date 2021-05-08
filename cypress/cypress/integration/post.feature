Feature: Google Post Page

    I want to open ghost app
  
    @focus
    Scenario: Created a post
        Given I open ghost post page to create one
        When I login with "z.alarcon@uniandes.edu.co" and password "m4d1zus42302"
        Then I go to the post page
        When I create a post with title "Post Test" and body "Cuerpo texto"
    
    @focus
    Scenario: Publish a post
        Given I open ghost post page in publish specific post
        When I login with "z.alarcon@uniandes.edu.co" and password "m4d1zus42302"
        Then I go to the post page in publish specific post 
        When I change title with old text "Post Test" and new text "Post Test 2"
        Then I see "Published" in the page

