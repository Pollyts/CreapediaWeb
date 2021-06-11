import React, { useState } from 'react';
import AddCharacteristics from '../ModalForms/Element/AddCharacteristics';
import AddTemplateElement from '../ModalForms/Element/AddTemplateElement';
import DeleteElement from '../ModalForms/Element/DeleteElement';
import EditElement from '../ModalForms/Element/EditElement';
import ExportElement from '../ModalForms/Element/ExportElement';
import AddRelation from '../ModalForms/Element/AddRelation';


import './Toolbar.css';

export default function Toolbar(props) {

    const [showAddElement, set_showAddElement] = useState(false);
    const [showAddFolder, set_showAddFolder] = useState(false);
    const [showDeleteComponent, set_showDeleteComponent] = useState(false);
    const [showExportComponent, set_showExportComponent] = useState(false);
    const [showEditComponent, set_showEditComponent] = useState(false);
    const [showRelation, set_showRelation] = useState(false);
    
        return(
            <div className="ToolbarRelative">
            <div className="Toolbar">
            <button className="Toolbarbutton" onClick={() => set_showAddElement(true)}>Добавить характеристики</button>
            <AddCharacteristics element={props.parent} prevpages={props.previouspages} onClose={()=>set_showAddElement(false)} show={showAddElement}/>
            <button className="Toolbarbutton" onClick={() => set_showAddFolder(true)}>Добавить класс</button>            
            <AddTemplateElement element={props.parent} prevpages={props.previouspages} onClose={()=>set_showAddFolder(false)} show={showAddFolder}/>
            <button className="Toolbarbutton" onClick={() => set_showRelation(true)}>Добавить связь</button>
            <AddRelation component={props.parent} onClose={()=>set_showRelation(false)} show={showRelation}/>
            <button className="Toolbarbutton" onClick={() => set_showDeleteComponent(true)}>Удалить элемент</button>
            <DeleteElement prevpages={props.previouspages} component={props.parent} onClose={()=>set_showDeleteComponent(false)} show={showDeleteComponent}/>
            <button className="Toolbarbutton" onClick={() => set_showEditComponent(true)}>Изменить элемент</button>
            <EditElement element={props.parent} prevpages={props.previouspages} onClose={()=>set_showEditComponent(false)} show={showEditComponent}/>
            <button className="Toolbarbutton" onClick={() => set_showExportComponent(true)}>Экспорт элемента</button>
            <ExportElement component={props.parent} onClose={()=>set_showExportComponent(false)} show={showExportComponent}/>
            </div>
            </div>
          )
  
}