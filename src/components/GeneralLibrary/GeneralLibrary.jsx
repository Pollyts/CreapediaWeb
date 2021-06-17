import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../App/logo4x.png";

export default class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templatecomponents: null,
      components: null,
      showcomponents: true
    };
  }

  ChangeShow = (param) => (e) => {
    this.setState({ showcomponents: param });
  };

  async GetTemplateComponents(parentid) {
    const breadCrumbs = this.props.location.state.breadCrumbs;
    const index = breadCrumbs
      .map(function (e) {
        return e.body.Id;
      })
      .indexOf(this.props.location.state.body.Id);
    
    if (index === -1) {
      breadCrumbs.push({
        title: this.props.location.state.body.Name,
        path: `/library`,
        body: {
          Name: this.props.location.state.body.Name,
          Id: this.props.location.state.body.Id,
        },
      });
    } else {
      breadCrumbs.length = index + 1;
    }
    await fetch(
      process.env.REACT_APP_API_LIBRARY + `/all`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          templatecharacteristics: data,
          breadCrumbs: breadCrumbs,
        });
      })
      .catch((err) => console.log(err));
    console.log(this.state);
  }
  async GetCharacteristics(parentid) {
    await fetch(process.env.REACT_APP_API_CHARACTERISTICS + `/${parentid}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ characteristics: data });
      })
      .catch((err) => console.log(err));
  }

  async GetRelations(parentid) {
    await fetch(process.env.REACT_APP_API_RELATIONS + `/${parentid}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ relations: data });
      })
      .catch((err) => console.log(err));
  }

  async componentDidMount() {
    await this.GetTemplateCharacteristics(this.props.location.state.body.Id);
    await this.GetCharacteristics(this.props.location.state.body.Id);
    await this.GetRelations(this.props.location.state.body.Id);
  }

  render() {
    if (!this.state.templatecharacteristics || !this.state.characteristics) {
      return <div />;
    }
    const {
      templatecharacteristics,
      characteristics,
      breadCrumbs,
      showcharacreristics,
      relations,
    } = this.state; //сначала
    const array = templatecharacteristics.map(function (item) {
      return { idparent: item.IdParent, name: item.NameParent };
    });
    var setObj = new Set(); // create key value pair from array of array

    var groups = array.reduce((acc, item) => {
      if (!setObj.has(item.idparent)) {
        setObj.add(item.idparent, item);
        acc.push(item);
      }
      return acc;
    }, []); //converting back to array from mapobject
    return (
      <div>
        <div className="Header">
          <div className="BreadCrumbs">
            {breadCrumbs.map((bc) => (
              <div key={bc.title} className="gt">
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
            <Link to={{ pathname: "/settings" }}>
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
        <div className="ElementBody">
          <div className="Characteristics">            
          </div>
        </div>
      </div>
    );
  }
}
