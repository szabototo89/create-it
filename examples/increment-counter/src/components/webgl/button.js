import React from 'react';
import pixi from 'pixi';
import { createBox, createText, createContainer } from '../../utils/pixiHelpers';

class Button extends React.Component {
  componentDidMount() {
    const { stage } = this.context;

    const content = React.Children.toArray(this.props.children).join("");
    this.label = createText({ value: content, fontSize: 20, onClick: this.props.onClick });
    this.box = createBox({ width: 85, height: 25 });

    const objects = [ this.box, this.label ];

    this.container = createContainer();

    objects.forEach((el) => this.container.addChild(el));

    stage.addChild(this.container);
  }

  componentWillUnmount() {
    destroyObject(this.label, this.box, this.container);
  }

  render() {
    return null;
  }
}

Button.contextTypes = {
  stage: React.PropTypes.object
};

export default Button;