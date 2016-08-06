import React from 'react';

const app = ({ Container, Status, Increment }) => class extends React.Component {
  constructor(props) {
    super(props);

    const { value } = this.props;
    this.handleIncrement = this.handleIncrement.bind(this);

    this.state = { 
      value
    };
  }

  handleIncrement() {
    this.setState({
      value: this.state.value + 1 
    });
  }

  render() {
    const { value } = this.state;

    return <Container>
      <Status value={value} />
      <Increment onIncrement={this.handleIncrement} />
    </Container>;
  }
} 

export default app;