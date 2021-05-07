import React from 'react';
import './ModalPages.css';

const AddElement = props => { 
    console.log('in add elem');   
  if (!props.show){
      console.log('propsnull')
    return null
  }

  return(
            <div className="ModalPage" onClick={props.onClose}> 
            <div className="modal-content" onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Modal tittle</h4>
                </div>
                <div className="modal-body">
                ModalPage
                </div>
                <div className="modal-footer">
                <button className="button" onClick={props.onClose}>Close</button>
                </div>
            </div>            
            </div>
          )
    
}

export default AddElement