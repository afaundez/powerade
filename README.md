# Powerade

Stakeholder visualization.

## Usage

Load this javascript, for example:

```html
<script src="https://cdn.jsdelivr.net/npm/powerade@0.2.0/dist/main.js"></script>
```

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

### Develop

```sh
yarn watch
```

Check the generated files at `dist/`.

### Test

```sh
yarn lint
yarn test
```
