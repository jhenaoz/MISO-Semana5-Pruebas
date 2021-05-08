Feature: Ghost staff Page

    I want to open ghost staff app

    @focus
    Scenario: Invite people don't send emails
        Given I open ghost staff page to invite people
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        Then I go to the staff page
        When I invite people with "pruebas@pruebas.com" and role "Administrator"
        Then I see "Error sending email!" in the page

    @focus
    Scenario: Invite people with email in use
        Given I open ghost staff page to invite people with email in use
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        Then I go to the staff page
        When I invite people with "pruebas@pruebas.com" and role "Administrator"
        Then I see "A user with that email address was already invited." in the page


    @focus
    Scenario: Change staff password with incorrect old password
        Given I open ghost staff page in specific user
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        Then I go to the staff page in specific user 
        When I change password with old password "Fakepassword1234" and new password "F@kenewp@ssw0rd.1234"
        Then I see "Your password is incorrect. Your password is incorrect." in the page


    @focus
    Scenario: Change staff password 
        Given I open ghost staff page in specific user
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        Then I go to the staff page in specific user 
        When I change password with old password "Test4echo!" and new password "F@kenewp@ssw0rd.1234"
        Then I see "Password updated." in the page
        When I reset password with old password "F@kenewp@ssw0rd.1234" and new password "Test4echo!"
        Then I see "Password updated." notification in the page