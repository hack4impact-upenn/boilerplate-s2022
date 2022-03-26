/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import axios from 'axios';

export default class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      success: '',
      loading: false,
    };
  }

  async componentDidMount() {
    console.log(this.props.match.params.token);
    await axios
      .get('/api/resetPassword/', {
        params: { resetPasswordToken: this.props.match.params.token },
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          this.setState({
            email: response.data.email,
            update: false,
            isLoading: false,
            error: false,
          });
        } else {
          this.setState({
            update: false,
            isLoading: false,
            error: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { password, error, isLoading, updated } = this.state;
    if (error) {
      return (
        <div>
          <div style={loading}>
            <h4>problem resetting password. please send another reset link.</h4>
          </div>
        </div>
      );
    }
  }
}
