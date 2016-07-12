# Bluegg-Tabs

Simple tabs

## Usage

```shell
# install
npm install --save bluegg/bluegg-tabs
```

```js
// import - common.js
var Tabs = require ('bluegg-tabs');

// Get your Tab elements
var alltabs = document.querySelectorAll('.js-tabs');

// Init the tabs
[].forEach.call(alltabs, function(item, i) {
	new Tabs(alltabs[i]);
});

```

[Example of markup and styling required](https://codepen.io/matthewbeta/pen/gMYKNx?editors=0010)

## Thanks
~~Forked~~ Stolen from [Matt '@stowball'  Stow](http://codepen.io/stowball/)'s Pen [Accessible Tabs](http://codepen.io/stowball/pen/xVWwWe/).
