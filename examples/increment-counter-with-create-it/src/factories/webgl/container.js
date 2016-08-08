import React from 'react';

const container = ({ stage, renderer }) => class Container extends React.Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.refs.canvas.appendChild(renderer.view);
    requestAnimationFrame(this.animate);
  }

  animate() { 
    renderer.render(stage);
    requestAnimationFrame(this.animate);
  }

  render() { 
    const { children } = this.props;

    // const containerChildren = React.Children.map(children, element => {
    //   if (!React.isValidElement(element)) return element;

    //   return React.cloneElement(element, { stage });
    // });

    return <div ref="canvas">
      {children}
    </div>;
  }
}

export default container;