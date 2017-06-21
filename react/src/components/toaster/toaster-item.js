import React from 'react';
import { dismissToasterMessage } from '../../actions/actionCreators';
import Store from '../../store';

// each toast will be displayed for 5 seconds
const DISPLAY_LENGTH_MILLIS = 5000;

/**
 * Displays one toast message
 * each messages has a type, title and a content message
 */
class ToasterItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: props.display,
      message: props.message,
      type: props._type,
      title: props.title,
      autoClose: props.autoClose,
      toastId: props.toastId
    };

    this.dismissToast = this.dismissToast.bind(this);

    this.timeoutHandler = null;
  }

  componentWillReceiveProps(props) {
    if (props &&
      props.message) {
      this.setState({
        message: props.message,
        type: props._type,
        title: props.title,
        autoClose: props.autoClose,
        toastId: props.toastId
      });
    } else {
      this.setState({
        message: null,
        type: null,
        title: null,
        autoClose: true,
        toastId: null
      });
    }
  }

  dismissToast(toastId) {
    Store.dispatch(dismissToasterMessage(toastId));
  }

  renderToast() {
    // ensure that setTimeout is called only once for each toast message
    if (this.state.autoClose && !this.timeoutHandler) {
      this.timeoutHandler = setTimeout(() => {
        this.dismissToast(this.state.toastId);
      }, DISPLAY_LENGTH_MILLIS);
    }

    return (
      <div className={ `toast toast-${this.state.type}` }>
        <button
          className="toast-close-button"
          onClick={ () => this.dismissToast(this.state.toastId) }>×
        </button>
        <div className="toast-title">{ this.state.title }</div>
        <div className="toast-message">{ this.state.message }</div>
      </div>
    );
  }

  render() {
    return this.state.message ? this.renderToast() : null;
  }
}

export default ToasterItem;
