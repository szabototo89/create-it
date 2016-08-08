import React from 'react';
import { createBox, createText, createContainer, destroyObject } from '../../utils/pixiHelpers';

const button = ({ stage }) => class Button extends React.Component {
  componentDidMount() {
    const content = React.Children.toArray(this.props.children).join("");

    const position = { x: 0, y: 50 };

    this.label = createText({ 
      value: content, 
      fontSize: 20, 
    });
    
    this.box = createBox({ 
      width: 85,
      height: 25,
      onClick: this.props.onClick,
    });

    const objects = [ this.box, this.label ];

    this.container = createContainer({ position });

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

export default button;