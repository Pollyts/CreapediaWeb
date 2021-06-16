import React, { Component } from "react";
import "../ModalPages.css";
import { Redirect } from "react-router-dom";

async function ImportFromFolder(folderid, importcompid, type) {
  await fetch(
    process.env.REACT_APP_API_TEMPLATEFOLDERS +
      `/importfromfolder?folderid=${folderid}&importcompid=${importcompid}&type=${type}`,
    {
      method: "GET", // или 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
async function ImportFromLibrary(folderid, importcompid, password) {
  await fetch(
    process.env.REACT_APP_API_TEMPLATEFOLDERS +
      `/importfromlib?folderid=${folderid}&importcompid=${importcompid}&password=${password}`,
    {
      method: "GET", // или 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export default class ImportFolder extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      importtype: null,
      body: null,
      path: {
        Name: this.props.folder.Name,
        Id: this.props.folder.Id,
        type: "folder",
      },
      selcomp: { Id: null, Name: "", type:"" },
      libcomponents: null,
      folders: null,
      elements: null,
      breadCrumbs: this.props.prevpages,
      text: "Показать",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setTypeOfImport = this.setTypeOfImport.bind(this);
    this.showlocation = this.showlocation.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.importtype === "fromfolder") {
      await ImportFromFolder(this.props.folder.Id, this.state.path.Id, this.state.path.type);
      this.props.onClose();
    } else if (this.state.importtype === "fromlibrary") {
      await ImportFromLibrary(this.props.folder.Id,this.state.selcomp.Id,this.state.body);
      this.props.onClose();
    } else alert("Выберите тип импорта");
  };

  selectelement = (param) => async (event) => {
    this.setState({
      path: { Name: param.Name, Id: param.Id, type: "element" },
    });
  };
  selectcomponent = (param) => async (event) => {
    this.setState({ selcomp: { Name: param.Name, Id: param.Id, type: param.type } });
  };

  async setTypeOfImport(event) {
    if (event.target.value === "fromfolder") {
      let folders;
      let elements;
      await fetch(process.env.REACT_APP_API_TEMPLATEFOLDERS + `/${this.state.path.Id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          folders = data;
        })
        .catch((err) => console.log(err));
      await fetch(process.env.REACT_APP_API_TEMPLATEFOLDERS + `/${this.state.path.Id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          elements = data;
        })
        .catch((err) => console.log(err));
      this.setState({
        elements: elements,
        folders: folders,
        importtype: event.target.value,
        path: {
          Name: this.state.breadCrumbs[this.state.breadCrumbs.length - 1].body
            .Name,
          Id: this.state.breadCrumbs[this.state.breadCrumbs.length - 1].body.Id,
        },
      });
    } else {
      let libcomps;
      await fetch(process.env.REACT_APP_API_LIBRARY + `/папка с классами`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          libcomps = data;
        })
        .catch((err) => console.log(err));
      this.setState({
        selcomp: { Id: null, Name: "" },
        libcomponents: libcomps,
        importtype: event.target.value,
      });
    }
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
        path: `/projects`,
        body: {
          Name: param.Name,
          Id: param.Id,
        },
      });
    } else {
      breadCrumbs.length = index + 1;
    }
    let folders;
    let elements;
    await fetch(process.env.REACT_APP_API_TEMPLATEFOLDERS + `/${param.Id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        folders = data;
      })
      .catch((err) => console.log(err));
    await fetch(process.env.REACT_APP_API_TEMPLATEELEMENTS + `/${param.Id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        elements = data;
      })
      .catch((err) => console.log(err));
    this.setState({
      elements: elements,
      folders: folders,
      path: {
        Name: this.state.breadCrumbs[this.state.breadCrumbs.length - 1].body
          .Name,
        Id: this.state.breadCrumbs[this.state.breadCrumbs.length - 1].body.Id,
        type: "folder",
      },
    });
  };

  async showlocation(event) {
    let folders;
    let elements;
    await fetch(
      process.env.REACT_APP_API_TEMPLATEFOLDERS +
        `/${this.state.breadCrumbs[this.state.breadCrumbs.length - 1].body.Id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        folders = data;
      })
      .catch((err) => console.log(err));
    await fetch(
      process.env.REACT_APP_API_TEMPLATEELEMENTS +
        `/${this.state.breadCrumbs[this.state.breadCrumbs.length - 1].body.Id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        elements = data;
      })
      .catch((err) => console.log(err));
    this.state.text === "Показать"
      ? this.setState({
          text: "Свернуть",
          folders: folders,
          elements: elements,
        })
      : this.setState({ text: "Показать" });
  }

  onPasswordChange(event) {
    this.setState({ body: event.target.value });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.folder.Id !== this.props.folder.Id) {
      this.setState({
        importtype: null,
        body: "",
        selcomp: { Id: null, Name: "" },
        path: {
          Name: this.props.folder.Name,
          Id: this.props.folder.Id,
          type: "folder",
        },
        libcomponents: null,
        folders: null,
        breadCrumbs: this.props.prevpages,
        text: "Показать",
      });
    }
  }

  

  render() {
    if (!this.props.show) {
      return null;
    }

    console.log(this.props);
    return (
      <div className="ModalPage" onClick={this.props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">
              Импорт в папку {this.props.folder.Name}
            </div>
          </div>
          <div className="modal-body">
            <div className="formwithradio">
              <div
                className="radiobutton"
                onChange={this.setTypeOfImport.bind(this)}
              >
                <input type="radio" value="fromfolder" name="gender" /> Из
                другой папки
              </div>
              <div
                className="radiobutton"
                onChange={this.setTypeOfImport.bind(this)}
              >
                <input type="radio" value="fromlibrary" name="gender" /> Из
                общей библиотеки
              </div>
            </div>
            {this.state.importtype === "fromlibrary" ? (
              <div className="exportdiv">
                <label className="formlabel">Импорт:</label>
                <div className="selectedpath">
                  <label>{this.state.selcomp.Name}</label>{" "}
                </div>
                <div className="place">
                  <div className="parentwindowforselectingpath">
                    <div className="windowforselectingpath">
                      <div>
                        {this.state.libcomponents.map((lc) => (
                          <div key={lc.Id}>
                            <div
                              onClick={this.selectcomponent({
                                Id: lc.Id,
                                Name: lc.Name,
                                type:lc.Typeofcomponent
                              })}
                              className="libcomponent"
                            >
                              <div>{lc.Name}</div>{" "}
                              <div>{lc.Typeofcomponent}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="exportdiv">
                  <label className="formlabel"> Задайте пароль:</label>
                  <input
                    className="forminput"
                    type="text"
                    value={this.state.body}
                    onChange={this.onPasswordChange}
                  />
                </div>
              </div>
            ) : null}
            {this.state.importtype === "fromfolder" ? (
              <div className="exportdiv">
                <label className="formlabel">Импорт:</label>
                <div className="selectedpath">
                  <label>{this.state.path.Name}</label>{" "}
                  <button className="arrow" onClick={this.showlocation}>
                    {" "}
                    {this.state.text}{" "}
                    {this.state.text === "Показать" ? (
                      <div>&ensp;&darr;</div>
                    ) : (
                      <div>&ensp;&uarr;</div>
                    )}{" "}
                  </button>
                </div>

                <div className="place">
                  {this.state.text === "Показать" ? null : (
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
                        <div className="modalfolders import">
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

                          {this.state.elements.map((el) => (
                            <div key={el.Id}>
                              <button
                                className="modalbuttonelement"
                                onClick={this.selectelement({
                                  Id: el.Id,
                                  Name: el.Name,
                                })}
                              >
                                <div>{el.Name}</div>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
          <div className="modal-footer">
            <button className="button SaveButton" onClick={this.handleSubmit}>
              Импортировать
            </button>
            <button className="button CloseButton" onClick={this.props.onClose}>
              Отменить
            </button>
          </div>
        </div>
      </div>
    );
  }
}
