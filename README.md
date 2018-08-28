<div id='powerade'></div>

## First: Load the JS library

Choose one of this options

### Load this javascript in your DOM:

```html
<script src='https://cdn.jsdelivr.net/npm/powerade@0.2.0/dist/main.js'></script>
```

### Use a package manager

```sh
npm install powerade
```


## Second: Set a target

Add an element where to build the visualization:

```html
<div id='powerade'></div>
```

## Last: Initialize the visualization

Select the target, setup elements and init!

```javascript
const target = document.querySelector('div#powerade');

const elements = [{
  label: 'label',
  values: {
    'x-dimension': 1,
    'y-dimension': 2,
    'z-dimension': 3
  }
}];

Powerade.init(target, elements);
```

## Optional: Override defaults

You can change the default options using a third parameter. Note that as you change the label's dimensions, you have to update the element's dimensions.

```javascript
const options = {
  border: ['left', 'bottom'],
  dimensions: {
    x: { cardinality: 4, label: 'Power' },
    y: { cardinality: 4, label: 'Influence' },
    z: { cardinality: 4, label: 'Leadership' }
  },
  display: {
    label: false
  }
};

Powerade.init(target, elements, options);
```

Check [the javascript used]({{ "/assets/scripts/example.js" | relative_url }}) in the example above.

<script src='https://cdn.jsdelivr.net/npm/powerade@0.2.0/dist/main.js'></script>
<script src='{{ "/assets/scripts/example.js" | relative_url }}'></script>
