# ThaiUI Color Kit

**This is a work in progress, use with caution**

## Color Shades Generator

### Functions

- luminanceShift: change L value in HSL
- chromaJSShift: brighten() and darken() function in chroma.js
- oklchLuminanceShift: change L value in OKLCH
- accessiblePalette: method created by Eugene Fedorenko (accessible palette)

### Example

```js
const color = require("@thaiui/color")

const hex = "#D4F880"
const steps = 21
console.log(palette.chromaJSShift(hex, steps))

// Expeceting => [
  '#ffffc4', '#ffffb4', '#ffffa4',
  '#ffff94', '#ffff84', '#ffff74',
  '#eeff63', '#deff52', '#cdff40',
  '#bdff2c', '#adf20d', '#9de200',
  '#8dd300', '#7dc400', '#6db500',
  '#5ca600', '#4c9800', '#3b8900',
  '#2a7b00', '#196d00', '#076000'
] */
```
