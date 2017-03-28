import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops! haha</strong>{this.props.errorMessage}
        </div>
      );
    }
  }
  onSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }
  render() {
    const { handleSubmit, fields: { email, password }} = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email: </label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password: </label>
          <input {...password} className="form-control" type="password" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
}, mapStateToProps, actions)(Signin);
