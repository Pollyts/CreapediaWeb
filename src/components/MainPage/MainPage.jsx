import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import logo from "../App/logo4x.png";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { user: null, mainfolders: null };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.props.history.push("/");
    localStorage.clear();
    window.location.reload();
  }

  async GetMainFolders(userid) {
    await fetch(process.env.REACT_APP_API_FOLDERS + `/main/${userid}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ mainfolders: data });
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
  async loginUser(login, password) {
    return await fetch(
      process.env.REACT_APP_API_USERS + `?mail=${login}&pass=${password}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ user: data });
        return data;
      })
      .catch((err) => console.log(err));
  }

  async componentDidMount() {
    if (this.props.location.state.body == null) {
      localStorage.clear();
      window.location.reload();
    }
    const user = await this.loginUser(
      this.props.location.state.body.Mail,
      this.props.location.state.body.Password
    );
    if (user) {
      await this.GetMainFolders(user.Id);
    } else {
      localStorage.clear();
      window.location.reload();
    }
  }

  render() {
    if (!this.state.user || !this.state.mainfolders) {
      return <div />;
    }
    const mainfolders = this.state.mainfolders;
    const breadCrumbs = [
      {
        title: "Главная",
        path: "/",
        body: {
          Mail: this.state.user.Mail,
          Password: this.state.user.Password,
        },
      },
    ];
    return (
      <div>
        <div className="Header">
          <div className="BreadCrumbs">
            {breadCrumbs.map((bc) => (
              <div key={bc.title} className="gt">
                {/* <Link to={{pathname: `/template/${folder.Id}/${folder.Name}`}}> */}
                <Link
                  className="BreadCrumb"
                  to={{
                    pathname: bc.path,
                    state: { body: bc.body, breadCrumbs: breadCrumbs },
                  }}
                >
                  {bc.title}
                </Link>
                &ensp;&rarr;&ensp;
              </div>
            ))}
          </div>
          <div className="settingsinheader">
            <Link
              to={{ pathname: `/library`, state: { breadCrumbs: breadCrumbs } }}
            >
              {<button className="btn_logout">общая библиотека</button>}
            </Link>
            <Link to={{ pathname: "/settings" , state: { breadCrumbs: breadCrumbs }}}>
              {<button className="btn_logout">настройки</button>}
            </Link>
            {
              <button className="btn_logout" onClick={this.handleClick}>
                выход
              </button>
            }
            <img className="logo" src={logo} alt="toolbaritem" />
          </div>
        </div>
        <div className="mainfolders">
          {mainfolders.map((mf) => (
            <div key={mf.Id} className="mfolder">
              {mf.Name === "Проекты" ? (
                <Link
                  to={{
                    pathname: `/projects`,
                    state: {
                      breadCrumbs: breadCrumbs,
                      body: { Id: mf.Id, Name: mf.Name },
                    },
                  }}
                >
                  <button className="buttonfolder">Проекты</button>
                </Link>
              ) : (
                <Link
                  to={{
                    pathname: `/template`,
                    state: {
                      breadCrumbs: breadCrumbs,
                      body: { Id: mf.Id, Name: mf.Name },
                    },
                  }}
                >
                  <button className="buttonfolder">Библиотека</button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
