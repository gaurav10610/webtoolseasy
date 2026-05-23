import chroma from 'chroma-js';

export type PaletteShade = {
  name: string; // "50", "100", ..., "900", "950"
  hex: string;
  contrastWhite: number;
  contrastBlack: number;
  passWhiteAA: boolean; // >= 4.5
  passWhiteAAA: boolean; // >= 7.0
  passBlackAA: boolean;
  passBlackAAA: boolean;
  isBase?: boolean;
};

// Generates a Tailwind-like palette from a single hex color
export function generatePalette(baseHex: string): PaletteShade[] {
  let baseColor: chroma.Color;
  try {
    baseColor = chroma(baseHex);
  } catch (e) {
    // default to some gray if invalid
    baseColor = chroma('#888888');
  }

  // Generate an 11-step scale from very light to very dark, locking the base color near "500"
  // Actually, standard Tailwind palettes use luminance rather than simple mixing.
  // A simple way is to use chroma.scale using white -> base -> black.
  
  const scale = chroma.scale(['#ffffff', baseColor, '#000000'])
    .domain([0, 0.5, 1]);

  const stops = [
    { name: '50', val: 0.05 },
    { name: '100', val: 0.1 },
    { name: '200', val: 0.2 },
    { name: '300', val: 0.3 },
    { name: '400', val: 0.4 },
    { name: '500', val: 0.5 }, // Base
    { name: '600', val: 0.6 },
    { name: '700', val: 0.7 },
    { name: '800', val: 0.8 },
    { name: '900', val: 0.9 },
    { name: '950', val: 0.95 },
  ];

  return stops.map(stop => {
    const hex = scale(stop.val).hex();
    const contrastWhite = chroma.contrast(hex, '#ffffff');
    const contrastBlack = chroma.contrast(hex, '#000000');
    
    return {
      name: stop.name,
      hex: hex,
      contrastWhite: parseFloat(contrastWhite.toFixed(2)),
      contrastBlack: parseFloat(contrastBlack.toFixed(2)),
      passWhiteAA: contrastWhite >= 4.5,
      passWhiteAAA: contrastWhite >= 7.0,
      passBlackAA: contrastBlack >= 4.5,
      passBlackAAA: contrastBlack >= 7.0,
      isBase: stop.name === '500'
    };
  });
}

export function isValidHex(hex: string): boolean {
  return chroma.valid(hex);
}
