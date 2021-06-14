import React, { Component } from "react";
import "../ModalPages.css";
import { Redirect } from "react-router-dom";

async function SaveFolder(folderid, name, newparentfolderid,subfolders,elements) {
  const folder = {
    IdFolder: Number(folderid),
    Name: name,
    IdParent: Number(newparentfolderid),
    subfolders: subfolders,
    elements:elements
  };
  await fetch(process.env.REACT_APP_API_FOLDERS, {
    method: "PUT", // или 'PUT'
    body: JSON.stringify(folder), // данные могут быть 'строкой' или {объектом}!
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    console.log(response.status);
  });
}

export default class EditFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      folders: null,
      isupdated: null,
      breadCrumbs: null,
      typeofedit:null,
      path: null,
      text: null,
      needupate:true,
      subfolders:null,
      elements:null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showlocation = this.showlocation.bind(this);
    this.Close = this.Close.bind(this);
    this.onChange=this.onChange.bind(this);
  }

  Close(e) {    
    this.props.onClose();
    this.setState({needupate:true})
  }
  onChange(e) {
    var val = e.target.value;
    this.setState({ name: val });
  }

  RemoveSubfolder= (param) => e => {
    this.setState((prevState) => ({
        subfolders: prevState.subfolders.filter(
          (sf) => sf.Id !== param
        ),
      }));   
    }
    RemoveElement= (param) => e => {
        this.setState((prevState) => ({
            elements: prevState.elements.filter(
              (el) => el.Id !== param
            ),
          }));   
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
    
    await fetch(process.env.REACT_APP_API_FOLDERS + `/${param.Id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          folders: data,
          breadCrumbs: breadCrumbs,
          path: { Name: param.Name, Id: param.Id },
        });
      })
      .catch((err) => console.log(err));
    console.log(this.state);
  };

  async GetSubFoldersAndElements(parentid){
      let subfolders;
      let elements;    
    await fetch(process.env.REACT_APP_API_FOLDERS+`/${parentid}`) 
    .then(response=>{ return response.json()})
    .then(data=>{
        subfolders=data;
    }).catch(err => console.log(err));  
    console.log(this.state);
    await fetch(process.env.REACT_APP_API_ELEMENTS+`/${parentid}`) 
    .then(response=>{ return response.json()})
    .then(data=>{
        elements=data;
    }).catch(err => console.log(err));
    this.setState({subfolders:subfolders, elements:elements});
}

ChangeShow = (param) => (e) => {
    this.setState({ typeofedit: param });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await SaveFolder(this.props.folder.Id,this.state.name,this.state.path.Id,this.state.subfolders,this.state.elements)
    this.props.onClose();
    this.setState({needupate:true})
    window.location.reload();
  };

  async showlocation(event) {
    await fetch(process.env.REACT_APP_API_FOLDERS + `/${this.props.prevpages[this.props.prevpages.length-2].body.Id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.state.text === "Показать"
          ? this.setState({ text: "Свернуть", folders: data })
          : this.setState({ text: "Показать" });
      })
      .catch((err) => console.log(err));
  }
  
  async componentDidUpdate(prevProps) {
    if ((this.props.show)&&(this.state.needupate)) {
      this.setState({
        name: this.props.folder.Name,
        folders: null,
        typeofedit:"folder",
        isupdated: null,
        needupate:false,
        breadCrumbs: this.props.prevpages.filter((f) => f.body.Id !== this.props.folder.Id),
        path: {Name: this.props.prevpages[this.props.prevpages.length-2].body.Name, Id: this.props.prevpages[this.props.prevpages.length-2].body.Id },
        text: "Показать",
      });
      await this.GetSubFoldersAndElements(this.props.folder.Id)
    }
  }
  render() {
    // if (this.state.isupdated) {
    //   let bc = this.props.prevpages;
    //   bc[bc.length - 1].title = this.state.name;
    //   bc[bc.length - 1].body.Name = this.state.name;
    //   this.setState({ isupdated: false });
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: bc[bc.length - 1].path,
    //         state: { body: bc[bc.length - 1].body, breadCrumbs: bc },
    //       }}
    //     />
    //   );
    // }
    if (!this.props.show) {
      return null;
    }
    if((!this.state.elements)||(!this.state.subfolders)){
        return null;
    }
    return (
      <div className="ModalPage" onClick={this.Close}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">Редактировать папку</div>
          </div>
          <div className="modal-body-withoutcenter">
          {this.state.typeofedit === "folder" ? (
              <div className="ShowMenu">
                <button className="button current">папка</button>
                <button
                  className="button"
                  onClick={this.ChangeShow("subfolders")}
                >
                  подпапки
                </button>
                <button
                  className="button"
                  onClick={this.ChangeShow("elements")}
                >
                  элементы
                </button>
              </div>
            ) : null}
          {this.state.typeofedit === "subfolders" ? (
              <div className="ShowMenu">
                <button className="button" onClick={this.ChangeShow("folder")}>
                  папка
                </button>
                <button className="button current">подпапки</button>
                <button
                  className="button"
                  onClick={this.ChangeShow("elements")}
                >
                  элементы
                </button>
              </div>
            ) : null}
            {this.state.typeofedit === "elements" ? (
              <div className="ShowMenu">
                <button className="button" onClick={this.ChangeShow("folder")}>
                  папка
                </button>
                <button
                  className="button"
                  onClick={this.ChangeShow("subfolders")}
                >
                  подпапки
                </button>
                <button className="button current">элементы</button>
              </div>
            ) : null}

            {this.state.typeofedit === "folder" ? (<div>
            <label className="formlabel"> Название:</label>
            <input
              className="forminput"
              type="text"
              value={this.state.name}
              onChange={this.onChange}
            />
            <label className="formlabel">Расположение:</label>
            <div className="selectedpath">
              <label>{this.state.path.Name}</label>{" "}
              <button className="button arrow" onClick={this.showlocation}>
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
                    <div className="modalfolders">
                      {this.state.folders.filter((f) => f.Id !== this.props.folder.Id).map((folder) => (
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
                  </div>
                </div>
              )}
            </div></div>) : null}
            {this.state.typeofedit === "subfolders" ? (
              <div>
                {this.state.subfolders.map((folder) => (
                          <div key={folder.Id} className="element-with-delete-button">
                              <button className="arrow" onClick={this.RemoveSubfolder(folder.Id)}>&otimes;</button>
                            <label>
                              {folder.Name}
                            </label>
                          </div>
                        ))}
              </div>
            ) : null}
            {this.state.typeofedit === "elements" ? (
              <div>
                {this.state.elements.map((folder) => (
                          <div key={folder.Id} className="element-with-delete-button">
                              <button className="arrow" onClick={this.RemoveElement(folder.Id)}>&otimes;</button>
                            <label>
                              {folder.Name}
                            </label>
                          </div>
                        ))}
              </div>
            ) : null}
            

            
          </div>
          <div className="modal-footer">
            <button className="button SaveButton" onClick={this.handleSubmit}>
              Сохранить
            </button>
            <button className="button CloseButton" onClick={this.Close}>
              Назад
            </button>
          </div>
        </div>
      </div>
    );
  }
}
