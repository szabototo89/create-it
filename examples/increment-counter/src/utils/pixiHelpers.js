import pixi from 'pixi';

export function createBox({ width, height, onClick } = {}) {
  const box = new pixi.Graphics();
  box.beginFill(0xFF9933);
  box.drawRect(0, 0, width, height);
  box.endFill();

  box.interactive = !!onClick;
  box.click = onClick;

  box.buttonMode = true;

  return box;
}

export function createText({ value = '', fontSize = 32, fontFamily = 'sans serif', onClick } = {}) {
  const text = new pixi.Text(value, {
    font: `${fontSize}px ${fontFamily}`,
    fill: 'white'
  });

  text.interactive = !!onClick;
  text.click = onClick;

  return text;
}

export function createContainer({ onClick } = {}) {
  const container = new pixi.Stage();
  if (onClick) {
    container.interactive = true;
    container.click = onClick;
  }
  return container;
}

export function destroyObject(...objects) {
  for (const object of objects) {
    object && object.destroy && object.destroy();
  }
}