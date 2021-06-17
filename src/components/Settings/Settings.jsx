import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import logo from "../App/logo4x.png";

async function ChangeData(prevmail, mail, password) {
  const user = {
    Mail: mail,
    Password: password,
  };
  await fetch(process.env.REACT_APP_API_USERS + `/${prevmail}`, {
    method: "PUT", // или 'PUT'
    body: JSON.stringify(user), // данные могут быть 'строкой' или {объектом}!
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    console.log(response.status);
  });
}

async function DeleteAcc(mail) {
  await fetch(process.env.REACT_APP_API_USERS + `?mail=${mail}`, {
    method: "DELETE", // или 'PUT'
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    console.log(response.status);
  });
}

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: this.props.location.state.breadCrumbs[
        this.props.location.state.breadCrumbs.length -
          this.props.location.state.breadCrumbs.length
      ].body.Mail,
      password:
        this.props.location.state.breadCrumbs[
          this.props.location.state.breadCrumbs.length -
            this.props.location.state.breadCrumbs.length
        ].body.Password,
    };
    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.DeleteAcc = this.DeleteAcc.bind(this);
  }

  onChangeMail(e) {
    var val = e.target.value;
    this.setState({ mail: val });
  }
  onChangePassword(e) {
    var val = e.target.value;
    this.setState({ password: val });
  }
  DeleteAcc = async (e) => {
    e.preventDefault();
    await DeleteAcc(
      this.props.location.state.breadCrumbs[
        this.props.location.state.breadCrumbs.length -
          this.props.location.state.breadCrumbs.length
      ].body.Mail
    );
    localStorage.clear();
    window.location.reload();
    alert("Аккаунт удален");
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await ChangeData(
      this.props.location.state.breadCrumbs[
        this.props.location.state.breadCrumbs.length -
          this.props.location.state.breadCrumbs.length
      ].body.Mail,
      this.state.mail,
      this.state.password
    );
    alert("Данные успешно обновлены");
  };
  render() {
    return (
      <div className="body">
        <div className="border">
          <form className="login-wrapper" onSubmit={this.handleSubmit}>
            <img className="logo" src={logo} alt="toolbaritem" />
            <div className="header">настройки</div>
            <label className="form-row">
              <p>почта</p>
              <input
                type="text"
                value={this.state.mail}
                onChange={this.onChangeMail}
                placeholder="exapmle@email.com"
              />
            </label>
            <label className="form-row">
              <p>пароль</p>
              <input
                type="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                placeholder="•••••••••••••"
              />
            </label>

            <label className="form-row">
              <button type="submit">изменить</button>
            </label>
            <label className="form-row">
              <button onClick={this.DeleteAcc}>удалить профиль</button>
            </label>
            <div className="loginlinks">
              <Link
                className="RegistrationLink"
                to={{
                  pathname:
                    this.props.location.state.breadCrumbs[
                      this.props.location.state.breadCrumbs.length - 1
                    ].path,
                    state: { breadCrumbs: this.props.location.state.breadCrumbs, body: this.props.location.state.breadCrumbs[
                      this.props.location.state.breadCrumbs.length - 1
                    ].body }
                }}
              >
                назад
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
