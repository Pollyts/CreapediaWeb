import React, { Component } from "react";
import { Link } from "react-router-dom";
import Toolbar from "../Toolbar/ToolBarTemplateElement";
import "./TempateElementPage.css";
import logo from "../App/logo4x.png";

export default class TemplateElementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templatecharacteristics: null,
      breadCrumbs: null,
      characteristics: null
    };
  }

  async GetTemplateCharacteristics(parentid) {
    const breadCrumbs = this.props.location.state.breadCrumbs;
    const index = breadCrumbs
      .map(function (e) {
        return e.body.Id;
      })
      .indexOf(this.props.location.state.body.Id);
    if (index === -1) {
      breadCrumbs.push({
        title: this.props.location.state.body.Name,
        path: `/telement`,
        body: {
          Name: this.props.location.state.body.Name,
          Id: this.props.location.state.body.Id,
        },
      });
    } else {
      breadCrumbs.length = index + 1;
    }
    await fetch(
      process.env.REACT_APP_API_TEMPLATECHARACTERISTICS + `?idelement=${parentid}`
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
    await fetch(process.env.REACT_APP_API_TEMPLATECHARACTERISTICS + `/${parentid}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ characteristics: data });
      })
      .catch((err) => console.log(err));
  }

  async componentDidMount() {
    await this.GetTemplateCharacteristics(this.props.location.state.body.Id);
    await this.GetCharacteristics(this.props.location.state.body.Id);
  }

  render() {
    if (!this.state.templatecharacteristics || !this.state.characteristics) {
      return <div />;
    }
    const {
      templatecharacteristics,
      breadCrumbs,
      characteristics
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
              <div>
                {groups.map((group) => (
                  <div key={group.idparent} className="ParentElement">
                    {group.name}
                    {templatecharacteristics
                      .filter((number) => number.IdParent === group.idparent)
                      .map((number) => (
                        <div
                          key={number.IdCharacter}
                          className="ParentCharacteristic"
                        >
                          {number.NameCharacter}: {number.ValueCharacter}
                        </div>
                      ))}
                  </div>
                ))}

                {characteristics.map((folder) => (
                  <div key={folder.Id}>
                    {folder.Name}: {folder.Value}
                  </div>
                ))}
              </div>
          </div> 
        </div>
        <Toolbar
          previouspages={breadCrumbs}
          parent={this.props.location.state.body}
        ></Toolbar>
      </div>
    );
  }
}
