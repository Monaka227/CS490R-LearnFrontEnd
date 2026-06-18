# Reflection

## What did you ask the AI to do?
- Because my learning plan had already covered user signup, login, adn editing. I asked AI what features I should add next, and I implemented a feature that allows user to view a list of reviews they've posted.

## What did it do well?
- AI proposed me seveal ways to retrive and display reviews. This time, I implemented a method where I first retrieve all reviews and then display only those that match the ID of the currently logged in user.

## What did it get wrong or what did you have to fix?
- At first, I tried to make it myself but it didn't work due to 400 bad request. The cause was that a vallidation rule which should have been applied only to POST requests on the backend. It was also being applied to GET requests.

## What did you learn from working with it?
- I learned how to fileter elements. I was also happy when based on the error message, I hypothesized thatt it might be a backend issue, and when I actually had the AI analyze it my prediction turned out to be correct.