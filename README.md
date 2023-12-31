# MoreVegans
![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/94c6b2c2-cae5-4931-bd83-4b0af93ba8f8)

The __*MoreVegans*__ is a site built on a fullstack django project that has an APP for bookings AND then an integrated react APP to handle the menu for the restaurant booking system... both APP's are running on Heroku.
The benefit, if understanding this whole set up - is that you could use this technique in other situations too...
Example: Find a site that is based on django... add the restframework if not installed yet... Create your react app and integrate it with the existing site... Since (in my opinion), react gets the APP up and running quickly (from start to deployed code)- then you could slowly replace all the existing django site front end with only using react components (to handle the front end) and remove all the backend templates. To summarize... react could either work as a compliment in an existing site for the front end or replace all the existing sites front end, or work as only front end itself if you are creating a whole own site from scratch.
drf is a powerful backend framework, so that should stay as it is.
1. Let's view how this project is built up, **starting with the drf backend and APP.**
2. Then walk through the integration with react.
3. **Then look at how to build the react APP for the restaurants menu.**

_____________________________________________________________________________________________________________________________________________

# DRF Back-end

The drf APP provides a booking system with CRUD functionality for the "*End User /customer*" and an admin panel for the *staff* to handle full administration of the site (The APP data is hosted by an Elephant sql database)... 
This drf APP - named **"fastfood-drf"**, will improve the customers collaboration with the restaurant and their staff, by it's simplicity and it also provides a great way to stay in tuned with the digitalization in the near and far future ahead. The site (app) is easy to maintain and open for great future improvement's with *low cost*.

# DRF -Existing Features

The __*"Fastfood-drf"*__ APP has:

* A landing page - to easy locate and get in touch with the restaurant - and at the same time it represent's what the restaurant is all *about*.
* A booking system, to book tables at the restaurant - and also full CRUD to manage their own bookings, *when loged_in*.
* A register and log-in page, needed to access bookings.
* A contact page . to easy get in touch with the staff and support.
* An admin page, to handle user-access and bookings.

## DRF *Landing page*


![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/c2abcfec-4fdb-4371-b5fc-57161ae3f841)

- **This is the first adverticement - with Company name, logo and the navigationbar... scrolling down, the user will get to the about section.**

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/14be11d3-c0b6-4ce5-97d3-7876ace07c01)
 
- **In the about section, there is also an added navigation button to the *booking* page... scrolling down, the user will reach the contact information.**

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/1713667a-e217-46f6-a9d7-3600d7dd2513)

- **In the contact section, there is also an added navigation button to the *contact* page.**
   1. The user can also see where the restaurant is located with a static map (which can be developed to a dynamic map, by creating an API with google maps).

## DRF *navigation bar and the footer*


![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/2eed3f63-b368-4eca-ba1b-0cb135ce4a0e)

- **The navigation bar has multiple functions:**
   1. It is mobile device responsive, with a toggle button -to expand or collape the navigation
   2. Once signed-in, the user will only see what is needed in the navigation-bar, to manage their provided services... and vice versa if not registered or loged-out.
   3. The footer is almost wide open for any customer needs changes - with only the water mark and social-media links present.

## DRF *booking system*


![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/259a6ad7-d593-46a1-9526-a9c085b0795b)

- **The app -only allows bookings when a user has registered and are signed-in.**

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/3e13e3a5-663b-4e72-a052-24a68757f7ef)

- **Once signed-in you can:**
   1. Reserv a table.
   2. View your bookings (reachable via the button or via the navigation bar).

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/ad171b68-cd8b-4595-8915-8a16552fc331)

- **The user will only see their own bookings (The admin panel is different... but we will walk trough the admin panel later in this README file).**
   1. By clicking on the booking the user want's to edit - they will get navigated to the detailed view.

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/4ba6c858-082d-4a0c-89e3-3e46099467aa)

- **In the detailed view, the user can see all details of the specific booking number they clicked on in the previous view.**

* In this view... all fields are readable only (**and the user can only view their own booking details**)
* So the user needs to provide the site with one of these three actions:
 1. update (to change their booking - on the next page)
 2. View bookings (to toggle back to the list of bookings)
 3. delete (toggle to a delete confirmation page)...
 
![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/62733a01-049c-4057-bae7-ec7b420c2850)

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/f7b51234-2078-4161-b4e8-b9231aa145e8)

- **If clicking on delete, then a confirmation workflow will get triggered, and once the booking is changed, the user will get navigated back to the booking list.**

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/d8a9ad77-ffd8-4016-8436-24537f63e8fb)

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/23acac90-c5db-4f72-9c23-7cd592e1551e)

- **If clicking on update, then a confirmation workflow will get triggered, and once the booking is changed, the user will get navigated back to the booking list.**
   1. Note that all fields are validated, when updating a booking (the user will get guided to fill in the fields with correct values).

## DRF *contact-page*


![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/e4a2d32a-05b4-47ff-8d2b-d583f28cdf74)

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/8552be14-ef99-4b8a-8c27-a3fb065ce5d9)

- **Once navigation, via links, buttons or navbar - to the *contact* page, then there is an email form to fill in (and optional restaurant phone number information)**
- **The user needs to fill in ithe fields and press send and:**
 1. A confirmation alert is sent to the user - via the browser
 2. The email API is triggered 
 3. A confirmation email is sent to the users email
 4. An email is sent to the restaurant

## DRF *registration and sign-in /log-out*


![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/3908a170-955f-4e47-83c8-29ed48b9d6cd)

- **The registration and sign-in and log-out is kind of straight forwards... Note, that the social media links- is removed in the actual code and templates styled (a notification about this is added in the "Integrate-drf-react" section below in this README file (more details can also be found in Userstory no 9, in my advanced front end project in github))**

## DRF *admin page*


![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/3b3bfdad-9ff6-45dd-a92e-02c9eacd0ace)

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/f776696d-6f45-4dd1-9cbe-ce3909f582a8)

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/26d76f47-b8db-405d-a81e-bf51ba03f88d)

- **The admin page is easy to manage (it is django standard templates), where the staff can view and manage all bookings made via the app.**
- **The staff can also generate own bookings, on the behalf of users... set up user accounts and access.**

_____________________________________________________________________________________________________________________________________________

# Integrate-drf-react

To set up the react app with the drf booking site I created a menu model in django, then the views and serializers... After this I created the api_urls and tested the endpoints with curl and postman, and actually some serious testing with axios also, to ensure that the crud was working... and then I added the JWT tokens (set the valid times in drf settings and used react to fetch the accept and refresh tokens via api endpoints.
In react I am using *AuthProvider* and I am storing the tokens in local storage, which is set up in my AuthContext.js file, where I pass a prop *useauth()* which handles my users authentication in the whole react app configuration (So all components in react can use the *useauth()* prop to handle authentication...
This was a little complex to handle and I actually got a bug reported in my project during my UAT (Testcase no 19 in my repository's advanced front end project).
But the app's are up and running and workaround exists.. So I am happy. 

# Integrate-drf-react -Existing Features

The __*"Integration"*__ has:

* Full crud for menu items, so that the user can handle the their menus and store data in the back end.
* Authentication via drf allauth library and handled in react with AuthProvider.
* Navigation toggles for the sigtes apps to cooperate with one and another, whithin the same db.
* sign-up in allauth for both apps, so that the users can use thesame register forms when signing up.
* JWT tokens to handle authentication via allauth, so no matter if the user are visiting the react menu app or the drf booking app(signin in, creating a booking or menu items), the authentication has the same source.


## Integrate-drf-react *Navbar-toggle*


![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/e9f9e01f-f86e-4d82-9781-15b3b77d4fd0)

![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/9f2edea4-0b03-4763-89fd-c8561aee35a6)

- **The navigation between drf and react is straight forward:**
   1. If on the react menu page, then press on the *booking-site* link to get to drf... Else, if on the drf booking site page then press on the *Food Menu* link in that navbar - to get to the react menu page.

## Integrate-drf-react *signup-toggle*


![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/ef4740c1-786b-4915-974f-79a6ce9b0620)

![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/c08e9da5-1dde-4d4d-89c0-6e4a932b1e5c)

- **The sign-up toggle is straight forwards:**
   1. Whenever you want or need to sign up via the react app, just press on the *"create new account"* button, and you will get navigated to allauths signup template in drf (as allauth handles the registered users in my set-up)...
   2. If you are in the drf booking site page, then just use the *register* link to get to the allauths signup template.

_____________________________________________________________________________________________________________________________________________

# REACT_APP

The react app handles the MoreVegans websites menu items (eg. A user wants to see the restaurants menu and get the price and the total cost to plan their visit)... 
This react APP is named **"our-menu"**, and will improve the customers collaboration with the restaurant and their staff, by it's simplicity and it also provides a great way to stay in tuned with the digitalization in the near and far future ahead. The site (app) is easy to maintain and open for great future improvement's with *low cost*.

# REACT_APP -Existing Features

The __*"our-menu"*__ APP has:

* A Welcome page with a navbar where the user can sign in and out, register new account and navigate to the table booking system (drf app).
* Once signed in the user will be able to navigate to the Menu (where the user can se all dishes, that the restaurant has).
* Once the user has signed in and navigated to the menu, then the user can select items and add these to their cart to get the total price.
* When the user has added menu items to their cart, then the user can navigate to the summary page, where the total cost is displayed.
* In the summary page, the user can update and delete items, that they have added - and get a quick feedback of the new summary.
* The summary page can be navigated to both via the welcome page (Cart -link), and automatically after adding items to the cart via the menu item page.
* In the Menu item page, there is also a link to menu details - where the dishes image, name, description and price is presented to the user via the UI. 

## REACT_APP *Welcome page*


![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/2eb3ed60-1425-46bf-bc48-1c3bbd62ee95)

- **The welcome page is restricted to user sign in:**
   1. If the user is not signed in, then the only link that is active is the navigation, to the booking-site.
      - All other links will render the signin form.
         * The sign in form will generate error messages (if not authenticated) or confirmation messages or give the oportunity to register.
   2. If the user is signed in, then the user can navigate to their cart to see their menu, or add items to their cart by chosing the items to add in the dropdown.
      - The items in the dropdown will navigate the user to menu items where more details is displayed and more options is granted - for a user friendly experience.

## REACT_APP *menu*


![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/c5638809-850d-48e4-b381-5b1dc15a1750)

- **The menu page, is where the user creates their menu:**
   1. Here the user can chose to select items to add to their cart- or cancel to navigate back to the welcome page and start over.
      - The items in the list has a vertical scroll option if there are more items, with the guided text as in the image above, in this README file, and there is also a mouse hover message to tell the user to srcoll, if there are more items in the list.
   3. There is also and option to view details about each specific menu item, which will navigate the user to a *details page*.
   4. If the user choses to add items to their cart, then the user will get navigated to the summary page, to see their whole menu that they have created.
   5. Note! That all selections, except the navigation back or the link to the details page- will trigger web-dialogs, to guide the user and confirm or throw errors messsages depending on the choise they chosen in the web-dialogs.
   6. Access to this page is if the user is authenticated, so if the user logs out - then the user will get navigated back home and if the user enters the url directly in the web-browser, then a sing-in web-dialog will get triggered for the user to sign in again.

## REACT_APP *Details*


![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/f1e0739a-0392-4875-9a8f-ba2da3a1e918)

- **The Details page will show menu details:**
   1. If the user has pressed on the details page in the menu page, then the details will show as in the image above- in this README file.
   2. The only option in this page is to close the window, which will navigate the user back to the menu page again.

## REACT_APP *Summary*


![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/16365947-e2f0-45b2-914d-33c92a14d4c5)

- **The Summary is where the user can view their whole menu that they have selected:**
   1. Here the user can chose to select items to update or delete- or press the accept button to navigate back to the welcome page and start over.
      - The items in the list has a vertical scroll option if there are more items, with the guided text as in the image above, in this README file, and there is also a mouse hover message to tell the user to srcoll, if there are more items in the list.
   5. Note! That all selections on this page- will trigger web-dialogs, to guide the user and confirm or throw errors messsages depending on the choise they have chosen in the web-dialogs.
   6. Access to this page is if the user is authenticated, so if the user logs out - then the user will get navigated back home and if the user enters the url directly in the web-browser, then a sing-in web-dialog will get triggered for the user to sign in again.

## REACT_APP *Page-not-found*


![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/753e44d1-a763-4255-9997-0c4e253862af)

- **The page-not-found is what it says it is:**
   1. if an url, not in this domain is entered (trying to get rendered)- then the user will get the page not found message.

_____________________________________________________________________________________________________________________________________________

# Release

## Bugs and future improvements (agile development)


![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/dd79feee-7c86-470b-b4be-71fe797ba068)

- **I have created a project in the react app repository, to handle all Issues for both the front and back-end repositories:**
- **In the drf repository I have referenced to this specific project, both in the README file and in an empty projects description and that projects README file (that is created in the drf repository).. impossible to miss this reference, so let's continue to use this project for this repository - to handle both back and front-end**

* **Projects description:**
   1. There are 3 milestones added in this project that handles both repositories (as mentioned above).
      - First milestone Is for the first release.
      - Second milestone is for the UAT.
      - Third milestone is for future improvements
   2. Any test performed in the UAT that did not pass the tested outcome have been moved to a **status** = *Future Features*.
   3. All future improvements has automatically also been moved to the **status** = *Future Features*.
   4. This way, any one can start a new project with all the opened Issues and add them to the "todo, in progress and done" **statuses**.
   5. The labels stays as they are.. bug, must have, etc.... so that you know what the Issue is all about- for any future project actions.
   6. The Issues titles tells you where the issues came from (eg. userstory, testcase, etc.)
   7. Now you can add user-points to each Issue and drag the Issue that comes first into a new status in the project (to do, in progress, done).
   8. Now let's go into release notes (heads -up's).

 * **Heads -up's:**
   1. In my _**react app**_, I have not removed the installation of "cloudinary-react", even if it is not used.
      - The cloudinary-react package can be used to manage the images that comes from cloudinary, to make them responsive etc., so that you can manage the images locally and secure them with variables and so on.
      - Due to the timeframe I had, I managed all images with react-bootstrap and css and relyed on cloudinaries own security.
      - The package is still installed and can be used if someone decides to use "cloudinary-react" to manage the images locally and wants to use .env to hide the key's for this.
   2. In my _**drf app**_, I have created a **"rest_framework" folder** in my "templates" folder, **don't remove that!**
      - The reason why I created that folder, is because of that I bumped in to problems with the restful API.... Normally you create a react app for the front-end and use only drf for the back-end, but in this (repository's) case there is a drf back-end with templates for the drf front end. And when I added the api endpoints for the react app front end- then I got alot of db errors, where drf were looking for html templates... these errors started as soon as I added the api_urls for react (the react app were looking for json data in the api endpoints, but drf were used to deliver html data via templates)...
      - This problem got solved, by adding the empty "rest_framework" folder in my templates root (drf got saticfied by this folder... so just keep it and the settings for this folder in settings.py (no harm done).
   3. There are 3 bugs reported in from my UAT (testcase no 17, 18 and 19), which you can read about in my Issues in this repository's project... Handle these Issues first, when starting developing future features - as they are of high importance (see details in the Issue testcases, and you would probably want to start with no 19).

_____________________________________________________________________________________________________________________________________________

# Testing

## Functional Testing

 - **Four important testcases are saved in my project's Issues.. number one (case 20) were solved and the three others (case 17, 18 and 19) are opened with workaounds**.

## Validator Testing


![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/c9a32cb8-17fa-4636-a9b8-3cef223e6da2)

![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/0c5b1e93-3b98-41f5-ae7b-ba3424ef5e6d)

![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/56103d11-2508-411f-a4c4-2d3b254274ec)

![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/1dd1e297-f1d2-48b2-a014-d444e06358c6)

 - **Some errors were found when performing validator testing, and I solved all of them except the "line too long" errors from "Linter"**.

### Bugs -Solved

 - **W3C errors, eslint and pep8 errors, and most functional testcases**.

### Bugs -Remaining

 - **linter "line too long" errors, and the manual testcases with numbers 17, 18 and 19**.

_____________________________________________________________________________________________________________________________________________

# Deployment


![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/027781dd-dbb6-467a-90b7-24e1909ae218)

## Steps

1. Page not found checked, in both front and back-end repositories.
2. Imports checked on all files for removement of unnecessary imports, in both front and back-end repositories.
3. Console logs checked and removed on all files, in both front and back-end repositories.
4. Indention and comments checked and updated, in both front and back-end repositories.
5. Index.html checked for correct title, in both front and back-end repositories.
6. All eslint errors cleared in react front-end (npm up to date with the newest version at the time of deployment).
7. Package.json script and Procfile checked, before final deployment.
8. env.py checked to hide sensetive data and Heroku VARS updated at the time of final deployment.
9. Strictmode checked to not exist in index.js (in react front-end).
1o. Repositories pushed to Github and deployed in Heroku.

## Links -drf
Heroku:
The __live__ link can be found here - https://fastfood-drf-dfd5756f86e9.herokuapp.com/ 

Github:
Link for Code - https://github.com/SvenLoevgren/portfolio5-drf

## Links -react
Heroku:
The __live__ link can be found here - https://our-menu-d0e32a53de6f.herokuapp.com/

Github:
Link for Code - https://github.com/SvenLoevgren/portfolio5-menu

# Credits

Code Institute education in general coding with tutor assistance- including advice of where to find free content on the web to style the APP's, plus many tools to use to validate the code.
Extra credit to my mentors given by Code Institute, for making it possible to understand the logic of coding and troubleshooting etc.

## Content
For complete lists - see the requirements.txt in drf repository and the dependencies in package.json in the react repository.
Django Rest Framework,
Heroku (deployment),
Email.JS (drf- email 3rd party),
Elephant SQL (db),
whitenoise (webservice),
react-router-dom,
axios,
react-icons,
react-bootstrap,
bootstrap,
jsdelivr,
fontawsome,
Google fonts,

## Media
Cloudinary (media storage- drf and react),
Pexels.com for menu images.

**Over all -  The whole project was built and released with the assistance of Code Institute and alot of google.**

