import React, { Component } from "react";
import "../ModalPages.css";
import { Redirect } from "react-router-dom";

async function AddTemplate(templateid, elementid) {
  await fetch(
    process.env.REACT_APP_API_ELEMENTS +
      `/templatefolder?templateid=${templateid}&elementid=${elementid}`,
    {
      method: "GET", // или 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export default class AddTemplateElement extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      path: { Name: "", Id: null },
      isneedupdate: true,
      folders: null,
      telements: null,
      breadCrumbs: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changedirectory = this.changedirectory.bind(this);
    this.Selecttelement = this.Selecttelement.bind(this);
    this.CloseWindow = this.CloseWindow.bind(this);
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
    await AddTemplate(this.state.path.Id, this.props.element.Id);
    this.props.onClose();
    window.location.reload();
  };

  async GetFoldersAndElements(idparent) {
    let folders;
    let telements;
    await fetch(process.env.REACT_APP_API_TEMPLATEFOLDERS + `/${idparent}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        folders=data
      })
      .catch((err) => console.log(err));
    await fetch(process.env.REACT_APP_API_TEMPLATEELEMENTS + `/${idparent}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        telements=data;
      })
      .catch((err) => console.log(err));
      this.setState({ telements: telements,  folders:folders});
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
          folders: null,
          telements: null,
          breadCrumbs: [
            {
              title: "Библиотека",
              path: "/templae",
              body: {
                Name: "Библиотека",
                Id: 0,
              },
            },
          ],
          isneedupdate: false,
        });
        await this.GetFoldersAndElements(0, null);
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
      !this.state.telements
    ) {
      return null;
    }
    console.log(this.props);
    return (
      <div className="ModalPage" onClick={this.props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">Добавление класса</div>
          </div>
          <div className="modal-body">
              <div className="flexdiv">
            <label className="formlabel">Расположение класса:</label>
              <label>{this.state.path.Name}</label>
            </div>
            <div className="place">
              <div className="parentwindowforselectingpath">
                <div className="modalbreadcrumbs">
                  {this.state.breadCrumbs.map((bc) => (
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

                  {this.state.telements.length > 0 ? (
                    <div className="modalfolders">
                      {this.state.telements.map((el) => (
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
          </div>
          <div className="modal-footer">
            <button className="button SaveButton" onClick={this.handleSubmit}>
              Экспортировать
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
