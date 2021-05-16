## Integrantes
- Javier Vargas: ja.vargasl1@uniandes.edu.co
- Sebastian Noreña Marquez: s.norenam@uniandes.edu.co
- Zully Alarcon: z.alarcon@uniandes.edu.co
- Juan David Henao: j.henaoz@uniandes.edu.co 
## Como ejecutar el proyecto
IMPORTANTE: LA APLICACION DE GHOST LA DESPLEGAMOS EN HEROKU, ENTONCES A LA HORA DE EJECUTAR LAS PRUEBAS LA PRIMERA ITERACION SIEMPRE FALLA MIENTRAS LA APLICACION INICIA, YA QUE HEROKU SIEMPRE APAGA LOS SERVIDORES PARA LA CAPA GRATUITA

GRACIAS POR SU COMPRENSION 😁

Tambien pueden acceder a estas urls para estar seguros que heroku tiene la aplicacion arribar
https://ghost3-42-5.herokuapp.com/ghost/
https://ghost3-3-0.herokuapp.com/ghost/

# Visual Tests
```shell
  cd playwright
  npm run visualtestresemble

  # For backstop Tests
  npm run images-server
  npm run visualtestbackstop
```


Cypress:
```shell
  cd cypress
  npm i
  npx cypress open --config-file cypress3.3.0.json
  npx cypress open --config-file cypress3.42.5.json
```
Ejecutar las pruebas:
![image](https://user-images.githubusercontent.com/2055110/117755826-96766980-b1e2-11eb-9094-f1c71a17ad5e.png)

Playwright
```shell
  cd playwright
  npm i
  npm test
```


## Funcionalidades

- Login (juan)
```
Feature: Login Main Page

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


```
- Creacion de Posts (zully)
```
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
        When I create a post with title "Post Test" and body "Cuerpo texto"
        When I published a specific post with title "Post Test"
        Then The post "Post Test" should be published

    Scenario: Delete a post
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I create a post with title "Post Test" and body "Cuerpo texto"
        When I delete a "Post Test"
        Then The post "Post Test" should not be found

    Scenario: Change draft post to publish
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When  I create a post with title "Post Test" and body "Cuerpo texto"
        When I published a draft post with title "Post Test"
        Then The post "Post Test" should be published
```
- Creacion de Paginas (sebas)
```
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
```
- Creacion de Tags (sebas)
```
Feature: Ghost tags Page

    I want to open ghost app
    Scenario: Create an internal tag
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I create a new tag with the name "#internal tag"
        Then The internal tag "#internal tag" should be created

    Scenario: Delete a public tag
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I create a new tag with the name "test tag"
        When I delete a "test tag"
        Then The tag "test tag" should not be present

    Scenario: Create a public tag
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I create a new tag with the name "test tag"
        Then The tag "test tag" should be created

    Scenario: Delete an internal tag
        Given I open ghost page
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I create a new tag with the name "#internaltag"
        When I delete an internal tag "#internaltag"
        Then The internal tag "#internaltag" should not be present
```
- Agregar Staff/Colaboradores (javier)
```
Feature: Ghost staff Page

    I want to open ghost staff app

    Scenario: Invite people don't send emails
        Given I open ghost staff page to invite people
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I go to the staff page
        When I invite people with "pruebas@pruebas.com" and role "Administrator"
        Then I see "Error sending email!" in the page

    Scenario: Invite people with email in use
        Given I open ghost staff page to invite people with email in use
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I go to the staff page
        When I invite people with "pruebas@pruebas.com" and role "Administrator"
        Then I see "A user with that email address was already invited." in the page


    Scenario: Change staff password with incorrect old password
        Given I open ghost staff page in specific user
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I go to the staff page in specific user 
        When I change password with old password "Fakepassword1234" and new password "F@kenewp@ssw0rd.1234"
        Then I see "Your password is incorrect. Your password is incorrect." in the page

    Scenario: Change staff bio 
        Given I open ghost staff page in specific user
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I go to the staff page in specific user 
        When I go to the bio from specific user and write "Test BIO" 
        Then I see in the bio "Test BIO"

    Scenario: Delete unsent email
        Given I open ghost staff page in specific user
        When I login with "admin-user@mailsac.com" and password "Test4echo!"
        When I go to the staff page 
        When I delete unsent email with email
        Then I see "Invitation revoked" in the page
```
