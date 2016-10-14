# Lima-Bravo 🍋
Lima Bravo is a Pug/SASS/ES6 ready boilerplate to quickly build static websites.

## Setup
Run the `install` commands for npm and bower to install dependencies.
```
npm install && bower install
```

## Development
Run the `dev` task to build and start watching files with Browsersync.
```
npm run dev
```

## FTP Deploy
Create a `.env` file with your FTP credentials
```
FTP_HOST=mysite.com
FTP_USER=my_user
FTP_PASS=your_strong_password
```
Then run the `deploy` task to upload your files
```
npm run deploy
```
