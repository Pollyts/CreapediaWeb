import React, { Component } from "react";
import "../ModalPages.css";

async function Edit(arrayofcharacteristics, idel) {
  const box = {
    characteristics: arrayofcharacteristics,
    elementid: Number(idel),
  };
  await fetch(process.env.REACT_APP_API_CHARACTERISTICS, {
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

export default class EditElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templatecharacteristics: null,
      characteristics: null,
      typeofedit: "element",
      relations: null,
      element: this.props.element,
      isneedupdate: true,
    };
    this.onChange = this.onChange.bind(this);
    this.Save = this.Save.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  //Для характеристик: изменить название характеристики
  ChangeName = (param) => (e) => {
    this.setState((prevState) => {
      const newItems = [...prevState.characteristics];
      newItems[param].name = e.target.value;
      return { characteristics: newItems };
    });
  };

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
  ChangeValue = (param) => (e) => {
    this.setState((prevState) => {
      const newItems = [...prevState.characteristics];
      newItems[param].value = e.target.value;
      return { characteristics: newItems };
    });
  };

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
  //Для элемента: изменить фото
  async Save(event) {
    event.preventDefault();
    // await SaveElement(this.state.name, this.props.folder.Id);
    // if (this.state.file != null) await SaveImage(this.state.file);
    this.props.onClose();
    window.location.reload();
  }

  handleImageChange(e) {
    e.preventDefault();
    if (e.target.files.length > 0) {
      let form = new FormData();
      for (var index = 0; index < e.target.files.length; index++) {
        var element = e.target.files[index];
        form.append("image", element);
      }
      form.append("parentfolderid", this.props.folder.Id);
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
      process.env.REACT_APP_API_CHARACTERISTICS + `?idelement=${parentid}`
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
            element: this.props.element,
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

    const array = this.state.templatecharacteristics.map(function (item) {
      return { idparent: item.IdParent, name: item.NameParent };
    });
    var setObj = new Set(); // create key value pair from array of array

    var groups = array.reduce((acc, item) => {
      if (!setObj.has(item.idparent)) {
        setObj.add(item.idparent, item);
        acc.push(item);
      }
      return acc;
    }, []);
    return (
      <div className="ModalPage" onClick={this.props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">Редактирование элемента</div>
          </div>
          <div className="modal-body">
            {this.state.typeofedit === "element" ? (
              <div className="ShowMenu">
                <button className="button current">элемент</button>
                <button
                  className="button"
                  onClick={this.ChangeShow("characteristics")}
                >
                  харакеристики
                </button>
                <button
                  className="button"
                  onClick={this.ChangeShow("relations")}
                >
                  связи
                </button>
              </div>
            ) : null}
            {this.state.typeofedit === "characteristics" ? (
              <div className="ShowMenu">
                <button className="button" onClick={this.ChangeShow("element")}>
                  элемент
                </button>
                <button className="button current">харакеристики</button>
                <button
                  className="button"
                  onClick={this.ChangeShow("relations")}
                >
                  связи
                </button>
              </div>
            ) : null}
            {this.state.typeofedit === "relations" ? (
              <div className="ShowMenu">
                <button className="button" onClick={this.ChangeShow("element")}>
                  элемент
                </button>
                <button
                  className="button"
                  onClick={this.ChangeShow("characteristics")}
                >
                  харакеристики
                </button>
                <button className="button current">связи</button>
              </div>
            ) : null}

            {this.state.typeofedit === "element" ? (
              <div>
                <label className="formlabel"> Название:</label>
                <input
                  className="forminput"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <div className="modal-image">
                  <label className="formlabel">Изображение:</label>
                  <input
                    type="file"
                    onChange={(e) => this.handleImageChange(e)}
                  />
                  {this.state.filepath === null ? (
                    <div />
                  ) : (
                    <img className="downloadimage" src={this.state.filepath} />
                  )}
                </div>
              </div>
            ) : null}
            {this.state.typeofedit === "characteristics" ? (
              <div>
                {groups.map((group) => (
                  <div key={group.idparent} className="ParentElement">
                    <button className="button arrow">&otimes;</button>{group.name}
                    {/* {templatecharacteristics
                    .filter((number) => number.IdParent === group.idparent)
                    .map((number) => (
                      <div
                        key={number.IdCharacter}
                        className="ParentCharacteristic"
                      >
                        {number.NameCharacter}: {number.ValueCharacter}
                      </div>
                    ))} */}
                  </div>
                ))}

                {this.state.characteristics.map((folder) => (
                  <div key={folder.Id}>
                    <button className="button arrow">&otimes;</button> {folder.Name}: {folder.Value}
                  </div>
                ))}
              </div>
            ) : null}
            {this.state.typeofedit === "relations" ? (
              <div>
                {this.state.relations.map((folder) => (
                  <div key={folder.IdFirst}>
                      <button className="button arrow">&otimes;</button>
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
            ) : null}
          </div>
          <div className="modal-footer">
            <button className="button SaveButton" onClick={this.Save}>
              Сохранить изменения
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
