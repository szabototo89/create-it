import React from 'react';
import pixi from 'pixi';

class Text extends React.Component {
  componentDidMount() {
    const { children } = this.props;
    const { stage } = this.context;

    this.pixiText = new pixi.Text(children.join(" "), {
      font: '32px sans-serif',
      fill: 'white'
    });

    stage.addChild(this.pixiText);
  }

  render() {
    const { children } = this.props;

    if (this.pixiText) {
      this.pixiText.text = children.join(" "); 
    }

    return null;
  }
}

Text.contextTypes = {
  stage: React.PropTypes.object
};

export default Text;