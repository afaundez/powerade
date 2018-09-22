# Powerade

Powerade is a JavaScript library that creates a stakeholders analysis visualization of your data.

## Use

### Install

Choose one of this options:

#### Loading this javascript in your DOM:

```html
<script src='https://cdn.jsdelivr.net/npm/powerade@0.3.0/dist/main.js'></script>
```

#### Use a package manager

```sh
npm install powerade
```

The main library should be in `node_modules/powerade/dist/main.js`.

If your are using Rails you need to add this to your `application.js`:

```javascript
//= require powerade/dist/main
```

### Initialize the visualization

Then, call the init function to load the visualization within a target div:

```javascript
const target = document.querySelector('div#powerade');
const elements = [{
  label: 'some label',
  values: {
    'x-dimension': 1,
    'y-dimension': 2,
    'z-dimension': 3
  }
}];
Powerade.init(target, elements);
```

## Develop

```sh
yarn watch
```

Check the generated files at `dist/`.

## Test

```sh
yarn lint
yarn test
```
