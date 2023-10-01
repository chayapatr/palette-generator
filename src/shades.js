const chroma = require("chroma-js");

const getBaseTone = (hex) => {
  const [h, s, l, a] = chroma(hex).hsl();
  return [h, s];
};

const luminanceShift = (hex, n) => {
  const [h, s] = getBaseTone(hex);
  const scale = [...Array(n).keys()]
    .reverse()
    .map((x) => x / n)
    .map((x) => chroma.hsl(h, s, x).hex());
  return scale;
};

const chromaJSShift = (hex, n) => {
  const [h, s] = getBaseTone(hex);
  const m = (n - 1) / 2;
  const scale = [...Array(m).keys()].map((x) => x + 1);
  const y = 3 / m;
  return [
    ...scale.reverse().map((x) =>
      chroma
        .hsl(h, s, 0.5)
        .brighten(x * y)
        .hex()
    ),
    chroma.hsl(h, s, 0.5).hex(),
    ...scale.reverse().map((x) =>
      chroma
        .hsl(h, s, 0.5)
        .darken(x * y)
        .hex()
    ),
  ];
};

const oklchLuminaceShift = (hex, n) => {
  const round = (x) => Math.round(x * 1000) / 1000;

  const arr = chroma(hex).oklch();
  const scale = [...Array(n).keys()].map((x) => x / n).reverse();

  return scale
    .map((x) => [round(x), round(arr[1]), round(arr[2]) || 0])
    .map((x) => chroma.oklch(...x).hex());
};

// Created by Eugene Fedorenko
const accessiblePalette = (hex, n) => {
  // TODO: make a hue shift calculation algorithm

  const clean = (hex) => (hex[0] === "#" ? hex.slice(1) : hex);

  const shades = [...Array(n).keys()].map((x) => x * (100 / n)).reverse();
  const scale = chroma.scale(["black", clean(hex), "white"]).correctLightness();

  const getColorFromScale = (scale, lightness) => {
    const color = scale(lightness / 100);
    return chroma(color);
  };

  const applyHueCorrection = (chromaColor, hueCorrection, index) => {
    const totalShades = shades.length;
    const hueAdjustment = (hueCorrection / totalShades) * (index + 1);
    return chromaColor.set("lch.h", chromaColor.lch()[2] + hueAdjustment);
  };

  return shades.map((shade, index) => {
    const chromaColorWithLightness = getColorFromScale(scale, shade);
    // const chromaColorWithCorrectedHue = applyHueCorrection(
    //   chromaColorWithLightness,
    //   hueShift[color],
    //   index
    // );
    // return chromaColorWithCorrectedHue.hex();
    return chromaColorWithLightness.hex();
  });
};

module.exports = {
  luminanceShift,
  chromaJSShift,
  oklchLuminaceShift,
  accessiblePalette,
};
