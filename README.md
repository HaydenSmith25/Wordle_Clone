# Wordle_Clone

ABOUT: Rough wordle clone that leverages two API's to fetch random words and a Word dictionary. Each time the user refreshes the page an API call is made to grab a random word. Upon each guess by the user, it checks the word dictionary to see if 1.( the word exists) and 2.(if any letters match up to the random word that is fetched from the start). This was great practice with DOM, API calls, and setting up API routes. Credit to Ania Kubow for sharing this wonderful tutorial.

TAKEWAYS: great practice for DOM and API's. I personally still struggle with DOM but found this tutorial as great practice to buffer out those weakpoints. I could also work on changing the fetch calls from promises to asnyc/await leveraging try/catch blocks to handle requests and catch errors. Anyways, hope you enjoy my clone and if you want to try out the site for yourself I will be publishing a Netlify link with the live site shortly. Side-note, API keys are not properly store in this project but for the sake of it being a practice project they are stored in a .env file that is added to node_modules.

LINK: https://fervent-chandrasekhar-024b93.netlify.app/
