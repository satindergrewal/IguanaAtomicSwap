import React from 'react';

import DashboardRender from './dashboard.render';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderDashboard = this.renderDashboard.bind(this);
  }

  isSectionActive(section) {
    return this.props.Dashboard.activeSection === section;
  }

  renderDashboard() {
    document.body.className = '';

    return DashboardRender.call(this);
  }

  isLoggedIn() {
    return this.props &&
      this.props.Main &&
      this.props.Main.isLoggedIn;
  }

  render() {
    if (this.isLoggedIn()) {
      return this.renderDashboard();
    }

    return null;
  }
}

export default Dashboard;
