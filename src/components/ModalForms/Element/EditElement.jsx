import React, { Component } from "react";
import "../ModalPages.css";

async function Edit (elementid, name,characteristics,tchars,relations) {
  let elemid;
  const element = {
    IdElement: Number(elementid),
    Name: name,
    characteristics: characteristics,
    templatecharacteristics: tchars,
    relations:relations
  };
  await fetch(process.env.REACT_APP_API_ELEMENTS, {
    method: "PUT", // или 'PUT'
    body: JSON.stringify(element), // данные могут быть 'строкой' или {объектом}!
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(response=>{ return response.json()})
  .then(data=>{
      elemid=data;
  }).catch(err => console.log(err));
return elemid
}
    async function EditImage (id,elwithimg){
        await fetch(process.env.REACT_APP_API_ELEMENTS+`/image/${id}`,{
            method: 'POST', // или 'PUT'
            body: elwithimg, // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Accept': 'application/json'
              }}).then(function(response) {
                console.log(response.status)});
    }

export default class EditElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templatecharacteristics: null,
      characteristics: null,
      typeofedit: "element",
      relations: null,
      file:null,
      filepath:null,
      name:this.props.element.Name,
      isneedupdate: true,
    };
    this.onChange = this.onChange.bind(this);
    this.Save = this.Save.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  //Для характеристик: изменить название характеристики
  // ChangeName = (param) => (e) => {
  //   this.setState((prevState) => {
  //     const newItems = [...prevState.characteristics];
  //     newItems[param].name = e.target.value;
  //     return { characteristics: newItems };
  //   });
  // };

  ChangeShow = (param) => (e) => {
    this.setState({ typeofedit: param });
  };

  //Для характеристик: удалить характеристику
  DeleteChar = (param) => (e) => {
    this.setState((prevState) => ({
      characteristics: prevState.characteristics.filter(
        (char) => char.Id !== param
      ),
    }));
  };
  //Для классов: удалить класс
  DeleteClass = (param) => (e) => {
    this.setState((prevState) => ({
      templatecharacteristics: prevState.templatecharacteristics.filter(
        (char) => char.Id !== param
      ),
    }));
  };
  //Для характеристик: изменить значение характеристики
  // ChangeValue = (param) => (e) => {
  //   this.setState((prevState) => {
  //     const newItems = [...prevState.characteristics];
  //     newItems[param].value = e.target.value;
  //     return { characteristics: newItems };
  //   });
  // };

  //Для свзяли: удалить связь
  DeleteRelation = (param) => (e) => {
    this.setState((prevState) => ({
      relations: prevState.relations.filter((rel) => rel.Id !== param),
    }));
  };
  //Для элемента: изменить имя
  onChange(e) {
    var val = e.target.value;
    this.setState({ name: val });
  }
  
  async Save(event) {
    event.preventDefault();
    const elemid=await Edit(this.props.element.Id, this.state.name, this.state.characteristics, this.state.templatecharacteristics, this.state.relations);
    if (this.state.file != null) 
    {
      await EditImage(elemid, this.state.file);
    }    
    this.props.onClose();
    window.location.reload();
  }
//Для элемента: изменить фото
  handleImageChange(e) {
    e.preventDefault();
    if (e.target.files.length > 0) {
      let form = new FormData();
      for (var index = 0; index < e.target.files.length; index++) {
        var element = e.target.files[index];
        form.append("image", element);
      }
      this.setState({
        file: form,
        filepath: URL.createObjectURL(e.target.files[0]),
      });
    } else if (this.state.file != null) {
      this.setState({ file: null, filepath: null });
    }
  }
  async GetFoldersElementsRelations(parentid) {
    let tchars;
    let chars;
    let relations;
    await fetch(
      process.env.REACT_APP_API_CHARACTERISTICS + `/only?idelement=${parentid}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          tchars=data;
      })
      .catch((err) => console.log(err));
    await fetch(process.env.REACT_APP_API_CHARACTERISTICS + `/${parentid}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        chars=data;
      })
      .catch((err) => console.log(err));
    await fetch(process.env.REACT_APP_API_RELATIONS + `/${parentid}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        relations=data;
      })
      .catch((err) => console.log(err));
    this.setState({
      templatecharacteristics: tchars,
      characteristics: chars,
      relations: relations,
    });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.show) {
      if (this.state.isneedupdate === true) {
        this.setState({
            templatecharacteristics: null,
            characteristics: null,
            typeofedit: "element",
            relations: null,
            file:null,
            filepath:null,
            name:this.props.element.Name,
            isneedupdate: false,
          });
        await this.GetFoldersElementsRelations(this.props.element.Id);
      }
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    if ((!this.state.characteristics)||(!this.state.templatecharacteristics)||(!this.state.relations)) {
        return null;
      }
    return (
      <div className="ModalPage" onClick={this.props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">Редактирование элемента</div>
          </div>
            {this.state.typeofedit === "element" ? (
              <div className="ShowSelector">
                <button className="button-selector-modal current">элемент</button>
                <button
                  className="button-selector-modal"
                  onClick={this.ChangeShow("characteristics")}
                >
                  харакеристики
                </button>
                <button
                  className="button-selector-modal"
                  onClick={this.ChangeShow("relations")}
                >
                  связи
                </button>
              </div>
            ) : null}
            {this.state.typeofedit === "characteristics" ? (
              <div className="ShowSelector">
                <button className="button-selector-modal" onClick={this.ChangeShow("element")}>
                  элемент
                </button>
                <button className="button-selector-modal current">харакеристики</button>
                <button
                  className="button-selector-modal"
                  onClick={this.ChangeShow("relations")}
                >
                  связи
                </button>
              </div>
            ) : null}
            {this.state.typeofedit === "relations" ? (
              <div className="ShowSelector">
                <button className="button-selector-modal" onClick={this.ChangeShow("element")}>
                  элемент
                </button>
                <button
                  className="button-selector-modal"
                  onClick={this.ChangeShow("characteristics")}
                >
                  харакеристики
                </button>
                <button className="button-selector-modal current">связи</button>
              </div>
            ) : null}

            {this.state.typeofedit === "element" ? (
              <div className="modal-body">
                <label className="formlabel"> Название:</label>
                <input
                  className="forminput"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <div className="modal-image">
                  <label className="formlabel">Изображение:</label>
                  <label className="custom-file-upload">Загрузить изображение           
                <input type="file" onChange={(e)=>this.handleImageChange(e)}/>  
                </label>
                  {this.state.filepath === null ? (
                    <div>
                    <img className="downloadimage" src={`data:image/jpeg;base64,${this.props.element.Image}`} /></div>
                  ) : (
                    <img className="downloadimage" src={this.state.filepath} />
                  )}
                </div>
              </div>
            ) : null}
            {this.state.typeofedit === "characteristics" ? (
              <div>
                {this.state.templatecharacteristics.map((group) => (
                  <div key={group.Id} onClick={this.DeleteClass(group.Id)} className="element-with-delete-button ParentElement">
                    <button className="arrow">&otimes;</button>{group.Name}
                  </div>
                ))}

                {this.state.characteristics.map((folder) => (
                  <div key={folder.Id} onClick={this.DeleteChar(folder.Id)} className="element-with-delete-button">
                    <button className="arrow">&otimes;</button> {folder.Name}: {folder.Value}
                  </div>
                ))}
              </div>
            ) : null}
            {this.state.typeofedit === "relations" ? (
              <div>
                {this.state.relations.map((folder) => (
                  <div key={folder.Id} className="element-with-delete-button">
                      <button className="arrow" onClick={this.DeleteRelation(folder.Id)}>&otimes;</button>
                    {folder.NameFirstElement}&ensp;&mdash;&ensp;
                    {folder.NameSecondElement}                   
                  </div>
                ))}
              </div>
            ) : null}
          <div className="modal-footer">
            <button className="button SaveButton" onClick={this.Save}>
              Сохранить
            </button>
            <button className="button CloseButton" onClick={this.props.onClose}>
              Назад
            </button>
          </div>
        </div>
      </div>
    );
  }
}
