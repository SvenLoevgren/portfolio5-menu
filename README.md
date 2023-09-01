README Layout added! To be updated....

# MoreVegans
![image](https://github.com/SvenLoevgren/portfolio5-menu/assets/119969411/4a0d45c7-2245-4acc-90f3-170364fbd99e)


The __*Portfolio 5*__ project is a fullstack developed project that has an APP, for *restarurant bookings* - running on Heroku.
The APP provides a booking system with CRUD functionality for the "*End User /customer*" and an admin panel for the *staff* to handle full administration of the site... 
This APP - named **"fastfood"**, will improve the customers collaboration with the restaurant and their staff, by it's simplicity and it also provides a great way to stay in tuned with the digitalization in the near and far future ahead. The site (app) is easy to maintain and open for great future improvement's with *low cost*.

# Existing Features

The __*"Fastfood"*__ APP has:

* A landing page - to easy locate and get in touch with the restaurant - and at the same time it represent's what the restaurant is all *about*.
* A booking system, to book tables at the restaurant - and also full CRUD to manage their own bookings, *when loged_in*.
* A register and log-in page, needed to access bookings.
* A contact page . to easy get in touch with the staff and support.
* An admin page, to handle user-access and bookings.

## The Landing page


![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/c2abcfec-4fdb-4371-b5fc-57161ae3f841)

- **This is the first adverticement - with Company name, logo and the navigationbar... scrolling down, the user will get to the about section.**

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/14be11d3-c0b6-4ce5-97d3-7876ace07c01)
 
- **In the about section, there is also an added navigation button to the *booking* page... scrolling down, the user will reach the contact information.**

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/1713667a-e217-46f6-a9d7-3600d7dd2513)

- **In the contact section, there is also an added navigation button to the *contact* page.**
   1. The user can also see where the restaurant is located with a static map (which can be developed to a dynamic map, by creating an API with google maps).

## The navigation bar and the footer


![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/2eed3f63-b368-4eca-ba1b-0cb135ce4a0e)

- **The navigation bar has multiple functions:**
   1. It is mobile device responsive, with a toggle button -to expand or collape the navigation
   2. Once loged-in, the user will only see what is needed in the navigation-bar, to manage their provided services... and vice versa if not registered or loged-out.
   3. The footer is almost wide open for any customer needs changes - with only the water mark and social-media links present.

## The booking system


![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/259a6ad7-d593-46a1-9526-a9c085b0795b)

- **The app -only allows bookings when a user has registered and are loged-in.**

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/3e13e3a5-663b-4e72-a052-24a68757f7ef)

- **Once loged-in you can:**
   1. Reserv a table.
   2. View your bookings (reachable via the button or via the navigation bar).

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/ad171b68-cd8b-4595-8915-8a16552fc331)

- **The user will only see their own bookings (The admin panel is different... but we will walk trough the admin panel later in this read me file).**
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

## The contact-page


![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/e4a2d32a-05b4-47ff-8d2b-d583f28cdf74)
![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/8552be14-ef99-4b8a-8c27-a3fb065ce5d9)

- **Once navigation, via links, buttons or navbar - to the *contact* page, then there is an email form to fill in (and optional restaurant phone number information)**
- **The user needs to fill in ithe fields and press send and:**
 1. A confirmation alert is sent to the user - via the browser
 2. The email API is triggered 
 3. A confirmation email is sent to the users email
 4. An email is sent to the restaurant

## The registration and log-in /log-out


![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/3908a170-955f-4e47-83c8-29ed48b9d6cd)

- **The registration and log-in and log-out is kind of straight forwards... Note, that the social media sign in- is not wired up yet- so either we kepp them there as is and the user gets an error when trying to click on these links, remove them or wire them up, so that the log-in via social media works for the user.
I have set these on the todo list in my github project.**

## The admin page


![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/3b3bfdad-9ff6-45dd-a92e-02c9eacd0ace)
![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/f776696d-6f45-4dd1-9cbe-ce3909f582a8)
![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/26d76f47-b8db-405d-a81e-bf51ba03f88d)

- **The admin page is easy to manage (it is django standard templates), where the staff can view and manage all bookings made via the app.**
- **The staff can also generate own bookings, on the behalf of users... set up user accounts and access.**

# Release

## back_log and future improvements


![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/4f44de8e-2c2e-49cb-8b22-41174b3c44af)


- **I have created two projects in github... One for this first release, and one for future features:**

* Any *Back_log* items, will be transfered to the second project in github - with new milestones.
   1. User-points, will be attached to the remaining open Issues when starting the next project.
      - The reason for postponing these open Issues is because the back-log and future improvements goes hand in hand in this project (you cannot have one, without the other, and the best way to decide this is with the customer (What do they want for their restaurant customers?).

   2. there is one more open issue, for bugs - that will be detailed explained in the testing scetion below.
      - This, bug Issue will be transfered to the next project too, though it can be seen as future improvements (the site GUI works as designed by now.. for this first release).

# Testing

## Functional Testing

' **No errors shown in functional testing, where most testing where focused on back-end validation and authentication (security).**

## Validator Testing

' **Some errors were found when performing validator testing, but most of them can be ignored and quick fixes for those who needs attention.**

### Bugs -Solved

 - **HTML validator texting shows two errors, regarding the ID attribute on the landing page (id used twice, so it needs to be renamed or swished to a class attribute instead... (quick fix - to be implemented asap).**
- **Due to circular code Issues, the quick fix was to change urls. root in settings.py to point at APP urls, instead of the django project urls... this needs to be looked at further, but for now, everything is up and running.**

### Bugs -Remaining

 - **CSS shows many errors (25ea) when testing with W3C validator, but most of the errors points at the bootstrap 5.3 attributes... the site works fine and the css styling does what it suppose to do, so for now this issue will be postponed to the next release.**

# Deployment

## Steps

![image](https://github.com/SvenLoevgren/fullstack-portfolio4/assets/119969411/f9caad98-70b2-46bb-ab9d-2d018bf66337)

1. env.py created to hide sensetive data.
2. GitIgnore file - checked for the env.py to not be pushed to Github.
3. Repository pushed to Github.
4. **Heroku *"config vars"* updated with needed values... see picture! but *note* that the "DISABLE_COLLECTSTATIC = 1", is `only` nedded IF removing the "whitenoise" middleware and going for cloudinary instead.... since This APP (at the moment) is not allowing uploads of media, then whitenoise can be used, (and mentioned *"config vars"* could be removed).**
5. Build Packs checked in Heroku
   1. python
6. Link Heroku APP with Github repository
7. Deploy In Heroku (A manually deploy to main was used)

## Links
Heroku:
The __live__ link can be found here - https://fastfood.herokuapp.com/

Github:
Link for Code - https://github.com/SvenLoevgren/fullstack-portfolio4.

# Credits

Code Institute education in general coding with tutor assistance- including advice of where to find free content on the web to style the APP, plus many tools to use to validate the code.
Extra credit to my mentor given by Code Institute, for making it possible to understand the logic of coding and troubleshooting this APP.

## Content
For full list - see the requirements.txt file in github.
Django (project)
Heroku (deployment)
Email.JS (email 3rd party)
Elephant SQL (db)
whitenoise (webservice)
Cloudinary (whitenoise used instead).


## Media
All images (including logo and favicon) are self made.
Google fonts and bootrap 5.3, plus fontawsome (icons) are used for styling (see links in html head in the code).

**Over all -  The whole project was built and released with the assistance of Code Institute and alot of google.**

