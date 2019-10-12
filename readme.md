# Weather app

This app retieves the weather of a given location. It uses [Mapbox](https://www.mapbox.com) and [Darksky](https://darksky.net) APIs and is build in Node.js@12.10.0 and Express@4.17.1.

## Local installation

Fill the `/config/env.example` file and rename it to `env.local`. You will need to generate your API keys in [Mapbox](https://www.mapbox.com) and [Darksky](https://darksky.net) websites.

Run in your terminal

```
$ npm install
$ npm run-script debug
```

So your app will be running on `localhost:3000`.

## Deployment

The app can be deployed to Heroku using the next command in your terminal:

```
$ npm run-script deploy:prod
```

For this you will need a [Heroku](http://heroku.com) account and fill in their dashboard the env variables. But the deployment is agnostic and can be configured for any hosting provider.

## Dependencies

This app uses Node.js@12.10.0 and NPM. You can see the full list of dependencies in `package.json`.

## Usage

Provide a valid address in the home webpage and the app will retrieve the weather forecast from Darksky service.

## Example

Visit the example page [here](http://stark-beach-61249.herokuapp.com/).

## Acknowledge

This app was created and minimally modified from the Complete Node Course v.3. available in Udemy.

Chido.
