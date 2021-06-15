import React, { Component } from "react";
import "../ModalPages.css";
import { Redirect } from "react-router-dom";

async function AddRelationTwoLines(
  firstelement,
  secondelement,
  firsttosec,
  sectofirst
) {
  const box = {
    Firstelementid: Number(firstelement),
    Secondelementid: Number(secondelement),
    Rel1to2: firsttosec,
    Rel2to1: sectofirst,
  };
  await fetch(process.env.REACT_APP_API_RELATIONS + `/relation2`, {
    method: "POST", // или 'PUT'
    body: JSON.stringify(box), // данные могут быть 'строкой' или {объектом}!
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    console.log(response.status);
  });
}

async function AddRelationOneLine(firstelement, secondelement, firsttosec) {
  const box = {
    Firstelementid: Number(firstelement),
    Secondelementid: Number(secondelement),
    Rel1to2: firsttosec,
    Rel2to1: null,
  };
  await fetch(process.env.REACT_APP_API_RELATIONS + `/relation1`, {
    method: "POST", // или 'PUT'
    body: JSON.stringify(box), // данные могут быть 'строкой' или {объектом}!
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    console.log(response.status);
  });
}

export default class AddRelation extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      path: { Name: "", Id: null },
      typeofrel: "Односторонняя",
      firstrel: null,
      secondrel: null,
      defaultdirection: true,
      isneedupdate: true,
      folders: null,
      elements: null,
      breadCrumbs: this.props.prevpages.slice(0, -1),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changedirectory = this.changedirectory.bind(this);
    this.Selecttelement = this.Selecttelement.bind(this);
    this.CloseWindow = this.CloseWindow.bind(this);
    this.changedirection = this.changedirection.bind(this);
    this.changeonelinerel = this.changeonelinerel.bind(this);
    this.changesecondlinerel = this.changesecondlinerel.bind(this);
    this.changetypeofrel = this.changetypeofrel.bind(this);
  }

  changetypeofrel(e) {
    this.state.typeofrel === "Односторонняя"
      ? this.setState({ typeofrel: "Двусторонняя" })
      : this.setState({ typeofrel: "Односторонняя" });
  }

  changeonelinerel(e) {
    this.setState({ firstrel: e.target.value });
  }

  changesecondlinerel(e) {
    this.setState({ secondrel: e.target.value });
  }

  changedirection(e) {
    this.state.defaultdirection
      ? this.setState({ defaultdirection: false })
      : this.setState({ defaultdirection: true });
  }

  CloseWindow() {
    this.props.onClose();
    this.setState({ isneedupdate: true });
  }

  Selecttelement = (param) => async (event) => {
    this.setState({ path: { Name: param.Name, Id: param.Id } });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.typeofrel === "Односторонняя") {
      if (this.state.defaultdirection) {
        await AddRelationOneLine(
          this.props.element.Id,
          this.state.path.Id,
          this.state.firstrel
        );
      } else {
        await AddRelationOneLine(
          this.state.path.Id,
          this.props.element.Id,
          this.state.firstrel
        );
      }
    } else {
      if (this.state.defaultdirection) {
        await AddRelationTwoLines(
          this.props.element.Id,
          this.state.path.Id,
          this.state.firstrel,
          this.state.secondrel
        );
      } else {
        await AddRelationTwoLines(
          this.state.path.Id,
          this.props.element.Id,
          this.state.firstrel,
          this.state.secondrel
        );
      }
    }
    window.location.reload();    
    this.props.onClose();
  };

  async GetFoldersAndElements(idparent) {
    let folders;
    let elements;
    await fetch(process.env.REACT_APP_API_FOLDERS + `/${idparent}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        folders = data;
      })
      .catch((err) => console.log(err));
    await fetch(process.env.REACT_APP_API_ELEMENTS + `/${idparent}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        elements = data;
      })
      .catch((err) => console.log(err));
    this.setState({ folders: folders, elements: elements });
  }

  changedirectory = (param) => async (event) => {
    const breadCrumbs = this.state.breadCrumbs;
    const index = breadCrumbs
      .map(function (e) {
        return e.body.Id;
      })
      .indexOf(param.Id);
    if (index === -1) {
      breadCrumbs.push({
        title: param.Name,
        path: `/templates`,
        body: {
          Name: param.Name,
          Id: param.Id,
        },
      });
    } else {
      breadCrumbs.length = index + 1;
    }
    this.setState({ breadCrumbs: breadCrumbs });
    await this.GetFoldersAndElements(param.Id, breadCrumbs);
  };

  async componentDidUpdate(prevProps) {
    if (this.props.show) {
      if (this.state.isneedupdate === true) {
        this.setState({
          path: { Name: "", Id: null },
          defaultdirection: true,
          isneedupdate: false,
          folders: null,
          elements: null,
          breadCrumbs: this.props.prevpages.slice(0, -1),
        });
        await this.GetFoldersAndElements(
          this.state.breadCrumbs[this.state.breadCrumbs.length - 1].body.Id
        );
      }
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    if (
      !this.state.breadCrumbs ||
      !this.state.folders ||
      !this.state.elements
    ) {
      return null;
    }
    console.log(this.props);
    return (
      <div className="ModalPage" onClick={this.props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">Добавление связи</div>
          </div>
          <div className="modal-body">
            <div className="flexdiv">
            <label className="formlabel">Связать элемент с:</label>
              <label>
                {this.state.path.Name !== "" ? (
                  <div>{this.state.path.Name}</div>
                ) : (
                  <div>&ensp; Элемент не выбран</div>
                )}
              </label>
            </div>
            <div className="place">
              <div className="parentwindowforselectingpath">
                <div className="modalbreadcrumbs">
                  {this.state.breadCrumbs.slice(1).map((bc) => (
                    <div key={bc.title} className="gt">
                      <button
                        className="BreadCrumb withoutframe"
                        onClick={this.changedirectory({
                          Id: bc.body.Id,
                          Name: bc.body.Name,
                        })}
                      >
                        {bc.title}
                      </button>
                      &ensp;&rarr;&ensp;
                    </div>
                  ))}
                </div>
                <div className="windowforselectingpath">
                  {this.state.folders.length > 0 ? (
                    <div className="modalfolders">
                      {this.state.folders.map((folder) => (
                        <div key={folder.Id}>
                          <button
                            className="modalbuttonfolder"
                            onClick={this.changedirectory({
                              Id: folder.Id,
                              Name: folder.Name,
                            })}
                          >
                            <div>{folder.Name}</div>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {this.state.elements.length > 0 ? (
                    <div className="modalfolders">
                      {this.state.elements.map((el) => (
                        <div key={el.Id}>
                          <button
                            className="modalbuttonelement"
                            onClick={this.Selecttelement({
                              Id: el.Id,
                              Name: el.Name,
                            })}
                          >
                            <div>{el.Name}</div>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            {this.state.path.Name !== "" ? (
              <div>
              <div className="Relations">
                <div className="flexdiv">                  
                {this.state.defaultdirection ? (
                  <label className="formlabel">
                    Связь {this.props.element.Name} с {this.state.path.Name}
                  </label>
                ) : (
                  <label className="formlabel">
                    Связь {this.state.path.Name} с {this.props.element.Name}
                  </label>
                )}
                <button className="button arrow" onClick={this.changedirection}>
                  &harr;
                </button>
                </div>
                <input
                  className="forminput"
                  type="text"
                  value={this.state.firstrel}
                  onChange={this.changeonelinerel}
                />
                </div>
                
                {this.state.typeofrel === "Двусторонняя" ? (
                  <div className="Relations">
                    <div className="flexdiv">
                    {this.state.defaultdirection ? (
                      <label className="formlabel">
                        Связь {this.state.path.Name} с {this.props.element.Name}
                      </label>
                    ) : (
                      <label className="formlabel">
                        Связь {this.props.element.Name} с {this.state.path.Name}
                      </label>
                    )}
                    </div>
                    <input
                      className="forminput"
                      type="text"
                      value={this.state.secondrel}
                      onChange={this.changesecondlinerel}
                    />
                  </div>
                ) : null}
                <div className="flexdiv">
                  <label className="formlabel">
                    Тип связи: {this.state.typeofrel}
                  </label>
                  <button
                    className="arrow"
                    onClick={this.changetypeofrel}
                  >
                    Изменить
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <div className="modal-footer">
            <button className="button SaveButton" onClick={this.handleSubmit}>
              Связать
            </button>
            <button className="button CloseButton" onClick={this.CloseWindow}>
              Отменить
            </button>
          </div>
        </div>
      </div>
    );
  }
}
