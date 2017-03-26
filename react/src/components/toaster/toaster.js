import React from 'react';

class Toaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      message: null,
      type: null,
    };
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.message && props.message.text && props.message.type) {
      this.setState({
        message: props.message.text,
        display: true,
        type: props.message.type,
      });
    }
  }

  setInitialState() {
    this.setState({
      display: false,
      message: null,
      type: null,
    });
  }

  dismissToast() {
    this.setInitialState();
  }

  renderMessage() {
    setTimeout(() => {
      this.setInitialState();
    }, 2000);

    return (
      <div className="toaster">
        <div className="toaster_text">
          { this.state.message }
        </div>
        <button className="toaster_close" onClick={this.dismissToast}>x</button>
      </div>
    );
  }

  render() {
    return (this.state.message && this.state.display) ?
      this.renderToast() : null;
  }
}

export default Toaster;
