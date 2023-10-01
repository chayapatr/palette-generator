import chroma from "chroma-js";

const hex = "#D4F880";

const getBaseTone = (hex) => {
  const [h, s, l, a] = chroma(hex).hsl();
  return [h, s];
};

const luminanceShift = (hex) => {
  const [h, s] = getBaseTone(hex);
  const scale = [...Array(20).keys()]
    .map((x) => x / 20)
    .map((x) => chroma.hsl(h, s, x).hex());
  return scale;
};

const chromaJSShift = (hex) => {};

const oklchLuminaceShift = (hex) => {};

const accessiblePalette = (hex) => {};

// console.log(chroma("#D4F880").darken().hex());
console.log(getBaseTone(hex));
console.log(luminanceShift(hex));
