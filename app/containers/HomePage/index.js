/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import messages from './messages';
import { createStructuredSelector } from 'reselect';

import { FormattedMessage } from 'react-intl';

import styles from './styles.css';

export class HomePage extends React.Component {
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  selectTab = (newIndex, lastIndex) => {

  };

  render() {
    return (
      <article>
        <Helmet
          title="Gallery"
          meta={[
            {
              name: 'Gallery',
              content: 'Gallery for SailWithMe'
            },
          ]}
        />
        <Tabs onSelect={this.selectTab} selectedIndex={2}>
          <TabList>
            <Tab>External (2)</Tab>
            <Tab>Interios (8)</Tab>
            <Tab>On Desk (2)</Tab>
          </TabList>

          <TabPanel>Group External</TabPanel>
          <TabPanel>Group Interios</TabPanel>
          <TabPanel>Group On Desk</TabPanel>
        </Tabs>
      </article>
    );
  }
}

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({

});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
