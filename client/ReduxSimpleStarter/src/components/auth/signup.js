import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops! haha</strong>{this.props.errorMessage}
        </div>
      );
    }
  }

  onSubmit(formProps) {
    this.props.signupUser(formProps);
  }
  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email: </label>
          <input {...email} className="form-control" />
          {email.touched && email.error && <div className="text-help">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password: </label>
          <input {...password} className="form-control" type="password" />
          {password.touched && password.error && <div className="text-helper">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password Confirm: </label>
          <input {...passwordConfirm} className="form-control" type="password" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="text-help">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}
const validate = (formProps) => {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password must match';
  }
  console.log('validate-----\n', formProps);
  console.log('errors-----\n', errors);
  return errors;
}

const mapStateToProps = (state) => {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate,
}, mapStateToProps, actions)(Signup);
