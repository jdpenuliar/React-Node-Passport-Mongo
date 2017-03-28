import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }
  render() {
    return (
      <div>
        this would be what ever you want here like a dashboard or some component you need after you log in.
        {this.props.message}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { message: state.auth.message };
};

export default connect(mapStateToProps, actions)(Feature);
