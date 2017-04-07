import React from 'react';
import { translate } from '../../translate/translate';

class About extends React.Component {
  render() {
    return(
      <div className="page" data-animsition-in="fade-in" data-animsition-out="fade-out" style={{marginLeft: '0'}}>
        <div className="page-content" id="section-about-iguana">
          <h2>About Iguana</h2>
          <p>Page content goes here</p>
        </div>
      </div>
    );
  }
}

export default About;
