# Resource-dashboard-client

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

* create `.env` and add the following
```
//For login
GOOGLE_API_KEY=YOUR_GOOGLE_API_CLIENT_ID
```

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

- Create Google oAuth token following https://developers.google.com/identity/protocols/OAuth2 (it's called Client ID and has format `<random-token>.apps.googleusercontent.com`).
- Set correct `config/environment.js` production variables
- Install [Heroku Toolbelt](https://toolbelt.heroku.com/) and log in to your account.

Follow steps below to deploy:
```
$ heroku git:remote -a <heroku-app-name>
$ heroku config:set GOOGLE_API_KEY=<your-token>
$ heroku buildpacks:set https://github.com/tonycoco/heroku-buildpack-ember-cli.git
$ git push heroku master
$ heroku ps:scale web=1
$ heroku open
```

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
