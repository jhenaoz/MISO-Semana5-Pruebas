Feature: Google Post Page

    I want to open ghost app
  
    @focus
    Scenario: Created a post
        Given I open ghost post page to create one
        When I login with "z.alarcon@uniandes.edu.co" and password "m4d1zus42302"
        Then I go to the post page
