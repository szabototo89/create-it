export function createBox({ width, height, position, onClick } = {}) {
  const box = new PIXI.Graphics();
  box.beginFill(0xFF9933);
  box.drawRect(0, 0, width, height);
  box.endFill();

  box.interactive = !!onClick;
  box.click = onClick;

  box.position = Object.assign(box.position, position);

  box.buttonMode = true;

  return box;
}

export function createText({ value = '', fontSize = 32, fontFamily = 'sans serif', position, onClick } = {}) {
  const text = new PIXI.Text(value, {
    font: `${fontSize}px ${fontFamily}`,
    fill: 'white'
  });

  text.interactive = !!onClick;
  text.click = onClick;

  text.position = Object.assign(text.position, position);

  return text;
}

export function createContainer({ position, onClick } = {}) {
  const container = new PIXI.Container();
  if (onClick) {
    container.interactive = true;
    container.click = onClick;
  }

  container.position = Object.assign(container.position, position);

  return container;
}

export function destroyObject(...objects) {
  for (const object of objects) {
    object && object.destroy && object.destroy();
  }
}