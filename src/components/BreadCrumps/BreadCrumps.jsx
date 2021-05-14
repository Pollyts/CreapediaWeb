import React, {Component} from 'react';
import './ModalPages.css';

export default class BreadCrumbs extends Component{
    constructor(props){
        super(props);
        this.state={name:""}
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }   
    onChange(e) {
        var val = e.target.value;
        this.setState({name: val});
    }
   
    handleSubmit = async e => {
        e.preventDefault();
        await SaveFolder(6,this.state.name,this.props.folder.id );
        alert("Имя: " + this.state.name);
        this.props.onClose();
      }

    render(){
        if(!this.props.show)
        {
            return null
        }
        return(
            {breadCrumbs.map(bc=>
                <div key={bc.title} className="gt">                            
                    {/* <Link to={{pathname: `/template/${folder.Id}/${folder.Name}`}}> */}
                    <Link className="BreadCrumb" to={{pathname:bc.path, state: {breadCrumbs}}}>
                     {bc.title} 
                      </Link>
                      &gt;&gt;
                </div>)}
        )
    }
}
