import React, { Component } from "react";
import { Link } from "react-router-dom";
import Toolbar from "../Toolbar/ToolbarElement";
import "./ElementPage.css";
import logo from "../App/logo4x.png";

export default class ElementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templatecharacteristics: null,
      breadCrumbs: null,
      characteristics: null,
      showcharacreristics: true,
      relations: null,
    };
  }

  ChangeShow = (param) => (e) => {
    this.setState({ showcharacreristics: param });
  };

  async GetTemplateCharacteristics(parentid) {
    const breadCrumbs = this.props.location.state.breadCrumbs;
    const index = breadCrumbs
      .map(function (e) {
        return e.body.Id;
      })
      .indexOf(this.props.location.state.body.Id);
    // const index=breadCrumbs.indexOf(elem => elem.path==`/template/${this.props.match.params.id}/${this.props.match.params.name}`);
    if (index === -1) {
      breadCrumbs.push({
        title: this.props.location.state.body.Name,
        path: `/element`,
        body: {
          Name: this.props.location.state.body.Name,
          Id: this.props.location.state.body.Id,
        },
      });
    } else {
      breadCrumbs.length = index + 1;
    }
    console.log(
      process.env.REACT_APP_API_CHARACTERISTICS + `?idelement=${parentid}`
    );
    await fetch(
      process.env.REACT_APP_API_CHARACTERISTICS + `?idelement=${parentid}`
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
            {
              <button className="btn_logout" onClick={this.handleClick}>
                настройки
              </button>
            }
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
            {showcharacreristics ? (
              <div className="ShowMenu">
                <button className="button current">характеристики</button>
                <button className="button" onClick={this.ChangeShow(false)}>
                  связи
                </button>
              </div>
            ) : (
              <div className="ShowMenu">
                <button className="button" onClick={this.ChangeShow(true)}>
                  характеристики
                </button>
                <button className="button current">связи</button>
              </div>
            )}
            {showcharacreristics ? (
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
            ) : (
              <div>
                {relations.map((folder) => (
                  <div key={folder.IdFirst}>
                    {folder.NameFirstElement}&ensp;&rarr;&ensp;
                    {folder.NameSecondElement}: {folder.Rel1to2}
                    {folder.Rel2to1 !== null ? (
                      <div>
                        {folder.NameSecondElement}&ensp;&rarr;&ensp;
                        {folder.NameFirstElement}: {folder.Rel2to1}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
          <img
            className="ImageElement"
            src={`data:image/jpeg;base64,${this.props.location.state.body.Image}`}
          />
        </div>
        <Toolbar
          previouspages={breadCrumbs}
          parent={this.props.location.state.body}
        ></Toolbar>
      </div>
    );
  }
}
