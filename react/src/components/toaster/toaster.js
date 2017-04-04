import React from 'react';
import { dismissToasterMessage } from '../../actions/actionCreators';
import Store from '../../store';

class Toaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      message: null,
      type: null,
      title: null,
    };
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props && props.message && props.display) {
      this.setState({
        message: props.message,
        display: props.display,
        type: props.type,
        title: props.title,
      });
    } else {
      this.setState({
        display: false,
        message: null,
        type: null,
        title: null,
      });
    }
  }

  dismissToast() {
    Store.dispatch(dismissToasterMessage());
  }

  // TODO: multiple toasts
  renderToast() {
    setTimeout(() => {
      Store.dispatch(dismissToasterMessage());
    }, 5000);

    return (
      <div className="toaster">
        <div id="toast-container" className="single-toast toast-bottom-right" aria-live="polite" role="alert">
          <div className={"toast toast-" + this.state.type}>
            <button className="toast-close-button" role="button" onClick={this.dismissToast}>×</button>
            <div className="toast-title">{this.state.title}</div>
            <div className="toast-message">{this.state.message}</div>
          </div>
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
