# Singing cowsay
Written to practise with Node.js. cowsay randomly chooses a song from a list of files containing lyrics, and animatedly sings it for you.

The backend produces the frames of an ASCII animation featuring cowsay, and the frontend consumes them.

## Deployment
- Dump text files containing lyrics in the backend/lyrics directory. Filenames don't matter. 
- Deploy the backend on your platform of choice. Just run "npm install" + "node animated-cowsay-backend.js" to test on your local machine.
- Copy/paste the base URL of the backend service to the "apiUrl" variable in config.js.
- Deploy the frontend on your platform of choice. Just open index.html to test on your local machine.
