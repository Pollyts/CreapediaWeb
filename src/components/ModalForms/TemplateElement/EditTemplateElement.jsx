import React, { Component } from "react";
import "../ModalPages.css";

async function Edit (elementid, name,characteristics,tchars) {
  let elemid;
  const element = {
    IdElement: Number(elementid),
    Name: name,
    characteristics: characteristics,
    templatecharacteristics: tchars
  };
  await fetch(process.env.REACT_APP_API_TEMPLATEELEMENTS, {
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

export default class EditElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templatecharacteristics: null,
      characteristics: null,
      typeofedit: "element",
      name:this.props.element.Name,
      isneedupdate: true,
    };
    this.onChange = this.onChange.bind(this);
    this.Save = this.Save.bind(this);
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
    this.props.onClose();
    window.location.reload();
  }
//Для элемента: изменить фото
  
  async GetFoldersElementsRelations(parentid) {
    let tchars;
    let chars;
    let relations;
    await fetch(
      process.env.REACT_APP_API_TEMPLATECHARACTERISTICS + `/only?idelement=${parentid}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          tchars=data;
      })
      .catch((err) => console.log(err));
    await fetch(process.env.REACT_APP_API_TEMPLATECHARACTERISTICS + `/${parentid}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        chars=data;
      })
      .catch((err) => console.log(err));    
    this.setState({
      templatecharacteristics: tchars,
      characteristics: chars
    });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.show) {
      if (this.state.isneedupdate === true) {
        this.setState({
            templatecharacteristics: null,
            characteristics: null,
            typeofedit: "element",            
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
    if ((!this.state.characteristics)||(!this.state.templatecharacteristics)) {
        return null;
      }
    return (
      <div className="ModalPage" onClick={this.props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">Редактирование класса</div>
          </div>
            {this.state.typeofedit === "element" ? (
              <div className="ShowSelector">
                <button className="button-selector-modal current">класс</button>
                <button
                  className="button-selector-modal"
                  onClick={this.ChangeShow("characteristics")}
                >
                  харакеристики
                </button>                
              </div>
            ) : null}
            {this.state.typeofedit === "characteristics" ? (
              <div className="ShowSelector">
                <button className="button-selector-modal" onClick={this.ChangeShow("element")}>
                  элемент
                </button>
                <button className="button-selector-modal current">харакеристики</button>
                
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
