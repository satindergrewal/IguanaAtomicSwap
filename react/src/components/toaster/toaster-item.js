import React from "react";
import {dismissToasterMessage} from "../../actions/actionCreators";
import Store from "../../store";

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
      display: false,
      message: null,
      type: null,
      title: null
    };

    this.dismissToast = this.dismissToast.bind(this);

    this.timeoutHandler = null;
  }

  componentWillReceiveProps(props) {
    if (props &&
      props.message &&
      props.display) {
      this.setState({
        message: props.message,
        display: props.display,
        type: props._type,
        title: props.title,
        toastId: props.toastId
      });
    } else {
      this.setState({
        display: false,
        message: null,
        type: null,
        title: null,
        toastId: null
      });
    }
  }

  dismissToast(toastId) {
    Store.dispatch(dismissToasterMessage(toastId));
  }

  renderToast() {
    // ensure that setTimeout is called only once for each toast message
    if (!this.timeoutHandler) {
      this.timeoutHandler = setTimeout(() => {
        this.dismissToast(this.state.toastId);
      }, DISPLAY_LENGTH_MILLIS);
    }

    return (
      <div className={ 'toast toast-' + this.state.type }>
        <button className="toast-close-button" role="button"
                onClick={ () => this.dismissToast(this.state.toastId) }>×
        </button>
        <div className="toast-title">{ this.state.title }</div>
        <div className="toast-message">{ this.state.message }</div>
      </div>
    );
  }

  render() {
    return (this.state.message && this.state.display) ?
      this.renderToast() : null;
  }
}

export default ToasterItem;
