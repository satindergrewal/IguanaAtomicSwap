import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import Main from '../main/main';

function mapStateToProps(state) {
  return {
    toaster: state.toaster,
    AddCoin: state.AddCoin,
    Main: state.Main,
    Dashboard: state.Dashboard,
    ActiveCoin: state.ActiveCoin,
    Atomic: state.Atomic,
    Settings: state.Settings,
    Interval: state.Interval,
    SyncOnly: state.SyncOnly,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
