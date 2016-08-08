import React from 'react';
import { createText, destroyObject } from '../../utils/pixiHelpers'; 

const text = ({ stage }) => class Text extends React.Component {
  getText() {
    const { children } = this.props;
    return React.Children.toArray(children).join("");
  }

  componentDidMount() {
    const { children } = this.props;

    this.pixiText = createText({
      value: this.getText(),
      fontSize: 32,
      fontFamily: 'sans-serif'
    });

    stage.addChild(this.pixiText);
  }

  componentWillUnmount() {
    destroyObject(this.pixiText);
  }

  render() {
    const { children } = this.props;

    if (this.pixiText) {
      this.pixiText.text = this.getText(); 
    }

    return null;
  }
}

export default text;