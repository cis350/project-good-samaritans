## READ ME INSTRUCTIONS
In our repo, there are five branches - each covering a particular aspect of this app.

1. "heroku-deployment": This branch includes all the code that has been deployed to Heroku. The app's link can be found here: https://good-samaritans.herokuapp.com/. This should be the branch where you interact with our full app.

2. "backend-tests-webapp": This branch includes all of our backend tests that exceed >60% code coverage as well as our webapp where the backend has been connected with frontend. Simply, go to the root directory, type "npm start" and go to your localhost:11000 to access and interact with the app. This branch also includes our Continuous Integration under .github/workflows/node-workflow.yml. To see our code coverage, please navigate to Actions and check our latest push "minor fixes" for this branch; code coverage can be found under "npm test".

3. "mobile-branch": This branch includes our mobile application and should cover all functionality as the webapp minus notifications as dictated by the rubric. Run in web view or iOS simulator.

4. "frontend-testing": This branch includes all of our frontend tests, excluding the functional testing, that is at least 60% code coverage. This branch also includes our Continuous Integration under .github/workflows/workflows.yml. Note: this branch simply tests the components, logic, and content behind our frontend, but does not have the most updated CSS. To see our code coverage, please navigate to Actions and check our latest push "removed comments and console statements" for this branch; code coverage can be found under "run frontend tests".

5. "cypress": This branch includes all of our functional tests. Note: like "frontend-testing" this app simply tests the logic and end-to-end interaction behind our frontend UI, but does not have our most updated CSS. Please refer to "heroku-deployment" or "backend-tests-webapp" for that. When you test for cypress registration, please change the username since we check for uniqueness, meaning that running the cypress tests twice will run into an error. 

### WIKI: 
The wiki includes our user stories, initial wireframes and prototypes, sequence diagrams of at least 2 routes, and our API documentation on SwaggerHub.

Thank you!
