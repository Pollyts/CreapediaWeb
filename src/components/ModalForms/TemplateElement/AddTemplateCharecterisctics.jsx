import React, {Component} from 'react';
import '../ModalPages.css';


async function SaveCharacteristics (arrayofcharacteristics, idel)
{
    const box =   {
        "characteristics": arrayofcharacteristics,
        "elementid": Number(idel)
     }
    await fetch(process.env.REACT_APP_API_TEMPLATECHARACTERISTICS,{
        method: 'POST', // или 'PUT'
        body: JSON.stringify(box), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}

export default class AddCharacteristics extends Component{
    constructor(props){
        super(props);
        this.state={characteristics:null, currentchar:{name:'', value:''}}
        this.ChangeName = this.ChangeName.bind(this);
        this.ChangeValue = this.ChangeValue.bind(this);
        this.CreateNew = this.CreateNew.bind(this);  
        this.CreateNewName = this.CreateNewName.bind(this);
        this.CreateNewValue = this.CreateNewValue.bind(this);   
        this.Save = this.Save.bind(this);   
    }  

    async Save(e){
        e.preventDefault();
        let array=[];
        if((this.state.currentchar.name!=='')||(this.state.currentchar.name!=='')){
            if(this.state.characteristics===null)
        {
            array=[{name:this.state.currentchar.name, value:this.state.currentchar.value, id:0}]            
        }  
        else{
            array=[...this.state.characteristics, {name:this.state.currentchar.name, value:this.state.currentchar.value, id:this.state.characteristics.length}];            
        }               
        }
        else{
            array=this.state.characteristics;
        }
        await SaveCharacteristics(array, this.props.element.Id);
        this.props.onClose();        
        window.location.reload();
    }
    CreateNewName(e){
        var val = e.target.value;
        this.setState(prevState => ({currentchar:{name:val, value:prevState.currentchar.value}}))
    }
    CreateNewValue(e){
        var val = e.target.value;
        this.setState(prevState => ({currentchar:{name:prevState.currentchar.name, value:val}}))
    }
    
    ChangeName = param => e => {
        this.setState(prevState => {
            const newItems = [...prevState.characteristics];
            newItems[param].name = e.target.value;
            return {characteristics: newItems};
        })
    }
    ChangeValue= param => e => {
        this.setState(prevState => {
            const newItems = [...prevState.characteristics];
            newItems[param].value = e.target.value;
            return {characteristics: newItems};
        })
    }
    
    CreateNew(e) {
        e.preventDefault();  
        if(this.state.characteristics===null)
        {
            this.setState(prevState => ({
                characteristics: [{name:prevState.currentchar.name, value:prevState.currentchar.value, id:0}]
              , currentchar:{name:'', value:''}}))
        }  
        else{
            this.setState(prevState => ({
                characteristics: [...prevState.characteristics, {name:prevState.currentchar.name, value:prevState.currentchar.value, id:prevState.characteristics.length}]
              , currentchar:{name:'', value:''}}))
        }        
    }

    render(){
        if(!this.props.show)
        {
            return null
        }
        return(
            <div className="ModalPage" onClick={this.props.onClose}> 
            <div className="modal-content" onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title">Добавление характеристик</div>
                </div>
                <div className="modal-body">
                    
                    <div className="newcharswindow">
                <div className="newcharacter">
                <label className="formlabel"> Название:</label>
                <input className="forminput" type="text" value={this.state.currentchar.name} onChange={this.CreateNewName}/>
                </div>
                <div className="newcharacter">
                <label className="formlabel"> Значение:</label>
                <input className="forminput" type="text" value={this.state.currentchar.value} onChange={this.CreateNewValue}/>  
                </div>
                {this.state.characteristics!==null? this.state.characteristics.map(char=>
                        <div key={char.id} className="linenewchar">
                            <div className="newcharacter">
                            <label className="formlabel"> Название:</label>
                            <input className="forminput" type="text" value={char.name} onChange={this.ChangeName(char.id)}/>
                            </div>
                            <div className="newcharacter">
                            <label className="formlabel"> Значение:</label>
                            <input className="forminput" type="text" value={char.value} onChange={this.ChangeValue(char.id)}/>  
                            </div></div>):null}
                            </div> 
                        <button className="arrow" onClick={this.CreateNew}>+ Добавить еще одну</button>   
                </div>                             
                <div className="modal-footer">
                <button className="button SaveButton" onClick={this.Save}>Сохранить</button>
                <button className="button CloseButton" onClick={this.props.onClose}>Назад</button>
                </div>
            </div>            
            </div>
        )
    }
}
