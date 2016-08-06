import React from 'react';
import pixi from 'pixi';

class Button extends React.Component {
  componentDidMount() {
    const { stage } = this.context;

    function createBox({ width, height }) {
      const box = new pixi.Graphics();
      box.beginFill(0xFF9933);
      box.drawRect(0, 0, width, height);
      box.endFill();
      return box;
    }

    function createText({ value, fontSize = 32, fontFamily = 'sans serif' }) {
      return new pixi.Text(value, {
        font: `${fontSize}px ${fontFamily}`,
        fill: 'white'
      });
    }

    const objects = [
      createBox({ width: 100, height: 50 }),
      createText({ value: 'Increment', fontSize: 20 })
    ];

    this.container = new pixi.Stage();
    objects.forEach((el) => this.container.addChild(el));

    stage.addChild(this.container);
  }

  render() {
    this.container.position.x = 50;
    return null;
  }
}

Button.contextTypes = {
  stage: React.PropTypes.object
};

export default Button;