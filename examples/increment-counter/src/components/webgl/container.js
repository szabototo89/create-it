import React from 'react';
import pixi from 'pixi';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.renderer = pixi.autoDetectRenderer(800, 600);
    this.stage = new pixi.Stage(0x000000);
  }

  getChildContext() {
    return {
      stage: this.stage
    };
  }

  componentDidMount() {
    this.refs.canvas.appendChild(this.renderer.view);
    requestAnimationFrame(this.animate);
  }

  componentWilUnmount() {
    this.stage && this.stage.destroy();
    this.renderer && this.renderer.destroy();
  }

  animate() {
    this.renderer.render(this.stage);
    requestAnimationFrame(this.animate);
  }

  render() {
    const { children } = this.props;

    const containerChildren = React.Children.map(children, element => {
      if (!React.isValidElement(element)) return element;

      return React.cloneElement(element, {
        stage: this.stage
      });
    });

    return <div ref="canvas">
      {children}
    </div>;
  }
}

Container.childContextTypes = {
  stage: React.PropTypes.object
};

export default Container;