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
    if (props && props.message && props.display) {
      this.setState({
        message: props.message,
        display: props.display,
        type: 'warning',
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

  renderToast() {
    setTimeout(() => {
      //this.setInitialState();
    }, 5000);

    return (
      <div id="toast-container" className="toast-bottom-right" aria-live="polite" role="alert">
        <div className={"toast toast-" + this.state.type}>
          <button className="toast-close-button" role="button" onClick={this.dismissToast}>×</button>
          <div className="toast-title">{ this.state.typeTitle }</div>
          <div className="toast-message">{ this.state.message }</div>
        </div>
      </div>
    );
  }

  render() {
    return (this.state.message && this.state.display) ?
      this.renderToast() : null;
  }
}

export default Toaster;
