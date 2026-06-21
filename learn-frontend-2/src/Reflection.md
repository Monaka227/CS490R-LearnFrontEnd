# Reflection

## What did you ask the AI to do?
- I created the game's edit form myself, so I had AI generate the CSS for it. I also had AI correct some errors.

## What did it do well?
- It provided clean and well structured CSS. 

## What did it get wrong or what did you have to fix?
- When GameDetails.js was initially fetched the API endpoint pointed to a review rather than the game, so the publisher and designer data were displayed as N/A. To resolve this issue, I needed to specify the endpoint.

## What did you learn from working with it?
- I learned how to better trace network request errors between frontend and backend, and the importance of separating styling from logic to keep React components maintainable.