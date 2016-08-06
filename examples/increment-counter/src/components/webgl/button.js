import React from 'react';
import pixi from 'pixi';

class Button extends React.Component {
  componentDidMount() {
    function createBox({ width, height, onClick } = {}) {
      const box = new pixi.Graphics();
      box.beginFill(0xFF9933);
      box.drawRect(0, 0, width, height);
      box.endFill();

      box.interactive = !!onClick;
      box.click = onClick;

      box.buttonMode = true;

      return box;
    }

    function createText({ value = '', fontSize = 32, fontFamily = 'sans serif', onClick } = {}) {
      const text = new pixi.Text(value, {
        font: `${fontSize}px ${fontFamily}`,
        fill: 'white'
      });

      text.interactive = !!onClick;
      text.click = onClick;

      return text;
    }

    function createContainer({ onClick } = {}) {
      const container = new pixi.Stage(); 
      if (onClick) {
        container.interactive = true;
        container.click = onClick;
      }
      return container;
    }

    const { stage } = this.context;

    const content = React.Children.toArray(this.props.children).join("");
    this.label = createText({ value: content, fontSize: 20, onClick: this.props.onClick });

    const objects = [
      createBox({ width: 85, height: 25 }), 
      this.label
    ];

    this.container = createContainer();

    objects.forEach((el) => this.container.addChild(el));

    stage.addChild(this.container);
  }

  render() {
    return null;
  }
}

Button.contextTypes = {
  stage: React.PropTypes.object
};

export default Button;