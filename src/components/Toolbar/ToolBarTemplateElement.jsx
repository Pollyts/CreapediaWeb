import React, { useState } from 'react';
import AddCharacteristics from '../ModalForms/TemplateElement/AddTemplateCharecterisctics';
import AddTemplateElement from '../ModalForms/TemplateElement/AddTemplateElement';
import DeleteElement from '../ModalForms/TemplateElement/DeleteTemplateElement';
import EditElement from '../ModalForms/TemplateElement/EditTemplateElement';
import ExportElement from '../ModalForms/TemplateElement/ExportTemplateElement';


import './Toolbar.css';

export default function Toolbar(props) {

    const [showAddElement, set_showAddElement] = useState(false);
    const [showAddFolder, set_showAddFolder] = useState(false);
    const [showDeleteComponent, set_showDeleteComponent] = useState(false);
    const [showExportComponent, set_showExportComponent] = useState(false);
    const [showEditComponent, set_showEditComponent] = useState(false);
    
        return(
            <div className="ToolbarRelative">
            <div className="Toolbar">
            <button className="Toolbarbutton" onClick={() => set_showAddElement(true)}>Добавить характеристики</button>
            <AddCharacteristics element={props.parent} prevpages={props.previouspages} onClose={()=>set_showAddElement(false)} show={showAddElement}/>
            {/* <button className="Toolbarbutton" onClick={() => set_showAddFolder(true)}>Добавить класс</button>
            <AddTemplateElement element={props.parent} prevpages={props.previouspages} onClose={()=>set_showAddFolder(false)} show={showAddFolder}/>
            <button className="Toolbarbutton" onClick={() => set_showDeleteComponent(true)}>Удалить класс</button>
            <DeleteElement prevpages={props.previouspages} component={props.parent} onClose={()=>set_showDeleteComponent(false)} show={showDeleteComponent}/>
            <button className="Toolbarbutton" onClick={() => set_showEditComponent(true)}>Изменить класс</button>
            <EditElement element={props.parent} prevpages={props.previouspages} onClose={()=>set_showEditComponent(false)} show={showEditComponent}/>
            <button className="Toolbarbutton" onClick={() => set_showExportComponent(true)}>Экспорт класса</button>
            <ExportElement component={props.parent} typeofcomponent={props.typeof_parentel} onClose={()=>set_showExportComponent(false)} show={showExportComponent}/> */}
            </div>
            </div>
          )
  
}