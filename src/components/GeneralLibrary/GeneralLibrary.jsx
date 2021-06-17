import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../App/logo4x.png";
import './GeneralLibrary.css';

async function ImportFromLibrary(importcompid, userid,type) {
    await fetch(
      process.env.REACT_APP_API_LIBRARY +
        `/importfromlib?userid=${userid}&importcompid=${importcompid}`,
      {
        method: "GET", // или 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }


export default class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
    breadCrumbs:this.props.location.state.breadCrumbs,
      components: null,
      showcomponents: true
    };
  }

  

  Import = (param) => async e => {
    await ImportFromLibrary(param)
    if(this.state.showcomponents)
    {
        alert('Элемент успешно перенесён в раздел "Проекты", папка "Импорт"');
    }
    else{
        alert('Элемент успешно перенесён в раздел "Библиотека", папка "Импорт"');
    }    
  };

  ChangeShow = (param) => (e) => {
    this.setState({ showcomponents: param });
  };

  async GetLibrary() {
    const breadCrumbs = this.props.location.state.breadCrumbs;
    const index = breadCrumbs
    .map(function (e) {
      return e.body.Id;
    })
    .indexOf(0);
  // const index=breadCrumbs.indexOf(elem => elem.path==`/template/${this.props.match.params.id}/${this.props.match.params.name}`);
  if (index === -1) {
    breadCrumbs.push({
      title: 'Общая библиотека',
      path: `/library`,
      body: {
        Name: 'Общая библиотека',
        Id: 0,
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
          components: data,
          breadCrumbs: breadCrumbs,
        });
      })
      .catch((err) => console.log(err));
  }
  
  async componentDidMount() {
    await this.GetLibrary();
  }

  render() {
    if (!this.state.components) {
      return <div />;
    }
    const {
        breadCrumbs,
        components,
        showcomponents
    } = this.state; //сначала
    
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
        <div className="libmenu">
          {showcomponents ? (
              <div>
              <div className="ShowMenu">
                <button className="button current">элементы</button>
                <button className="button" onClick={this.ChangeShow(false)}>
                  классы
                </button>
              </div>
              <table className="LibTable">
  <tr>
    <td className="td-header">Название</td>
    <td className="td-header">Тип</td>
    <td className="td-header">Пароль</td>
    <td className="td-header"></td>
  </tr>
  {components.filter(
        (rel) => rel.Typeofcomponent==="папка с элементами" || rel.Typeofcomponent==="элемент"
      ).map((folder) => (
                  <tr key={folder.Id}>
                      <td>{folder.Name}</td>
                      <td>{folder.Typeofcomponent}</td>
                      <td>{folder.Password==null?<div>Нет</div>:<div>Есть</div>}</td>
                      <td className="ImportButton" onClick={this.Import(folder.Id)}>Импорт</td>
                  </tr>
                ))}
</table>
              </div>
            ) : (
                <div>
              <div className="ShowMenu">
                <button className="button" onClick={this.ChangeShow(true)}>
                  элементы
                </button>
                <button className="button current">классы</button>
              </div>
              <table className="LibTable">
  <tr>
    <td className="td-header">Название</td>
    <td className="td-header">Тип</td>
    <td className="td-header">Пароль</td>
    <td className="td-header"></td>
  </tr>
  {components.filter(
        (rel) => rel.Typeofcomponent==="папка с классами" || rel.Typeofcomponent==="класс"
      ).map((folder) => (
                  <tr key={folder.Id}>
                      <td>{folder.Name}</td>
                      <td>{folder.Typeofcomponent}</td>
                      <td>{folder.Password==null?<div>Нет</div>:<div>Есть</div>}</td>
                      <td className="ImportButton" onClick={this.Import(folder.Id)}>Импорт</td>
                  </tr>
                ))}
</table>
             
              </div>
            )}   
        </div>
        
      </div>
    );
  }
}
