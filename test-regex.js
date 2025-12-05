const testText =
  'Combine like terms in 4x^2 - 3x + 2x^2 + 5x. Also 3^2 and 10^2. And 40 cm$^2$.';
console.log('Input:', testText);

const result = testText
  .replace(/\$\^([0-9]+)\$/g, '$^{$1}$')
  .replace(/([0-9a-zA-Z])\s*\^\s*([0-9]+)(?![}}\d])/g, '$1^{$2}');

console.log('Output:', result);
