import React from 'react';
import pixi from 'pixi';
import { createText, destroyObject } from '../../utils/pixiHelpers'; 

class Text extends React.Component {
  getText() {
    const { children } = this.props;
    return React.Children.toArray(children).join("");
  }

  componentDidMount() {
    const { children } = this.props;
    const { stage } = this.context;

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
      this.pixiText.setText(this.getText()); 
    }

    return null;
  }
}

Text.contextTypes = {
  stage: React.PropTypes.object
};

export default Text;