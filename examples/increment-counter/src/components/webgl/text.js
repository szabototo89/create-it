import React from 'react';
import pixi from 'pixi';

class Text extends React.Component {
  getText() {
    const { children } = this.props;
    return React.Children.toArray(children).join("");
  }

  componentDidMount() {
    const { children } = this.props;
    const { stage } = this.context;

    this.pixiText = new pixi.Text(this.getText(), {
      font: '32px sans-serif',
      fill: 'white'
    });

    stage.addChild(this.pixiText);
  }

  componentDidUnmount() {
    this.pixiText && this.pixiText.destroy();
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