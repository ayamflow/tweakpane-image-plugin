# Tweakpane image plugin
Image input plugin for [Tweakpane][tweakpane].


## Installation
```sh
npm i ayamflow/tweakpane-image-plugin
```

## Usage
```js
import {Pane} from 'tweakpane';
import * as ImagePlugin from 'tweakpane-image-plugin';

const pane = new Pane();
pane.registerPlugin(ImagePlugin);

const params = {
  image: new Image(),
};

pane.addInput(params, 'image', {
  extensions: '.jpg, .gif',
}).on('change', (ev) => {
  console.log(ev.value);
});
```

[tweakpane]: https://github.com/cocopon/tweakpane/


## Possible roadmap 
- drag & drop
- non-image images (i.e. compressed textures for WebGL)