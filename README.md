## READ ME INSTRUCTIONS
In our repo, there are five branches - each covering a particular aspect of this app.

1. "heroku-deployment": This branch includes all the code that has been deployed to Heroku. The app's link can be found here: https://good-samaritans.herokuapp.com/. This or "backend-tests-webapp" should be branch where you interact with our app.

2. "backend-tests-webapp": This branch includes all of our backend tests that exceed >60% code coverage as well as our webapp where the backend has been connected with frontend. Simply, go to the root directory, type "npm start" and go to your localhost:11000 to access and interact with the app. This branch also includes our Continuous Integration under .github/workflows/node-workflow.yml

3. "mobile-branch": This branch includes our mobile application and should cover all functionality as the webapp minus notifications as dictated by the rubric. Run in web view or iOS simulator.

4. "frontend-testing": This branch includes all of our frontend tests, excluding the functional testing, that exceeds >60% code coverage. 

5. "cypress": This branch includes all of our functional tests. Note: this app simply tests the logic behind our frontend UI, so does not have our most updated CSS. Please refer to "heroku-deployment" or "backend-tests-webapp" for that. For cypress registration, please change the username since we check for uniquiness, meaning that running the cypress tests twice will run into an error. 

### WIKI: 
The wiki includes our user stories, initial wireframes and prototypes, sequence diagrams of at least 2 routes, and our API documentation on SwaggerHub.

Thank you!
