import React, {Component} from 'react';
import './ModalPages.css';

export default class BreadCrumbs extends Component{
    constructor(props){
        super(props);
        this.state={name:""}
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
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
