import React, { useState } from 'react';
import AddElement from '../ModalForms/AddTemplateElement';
import AddFolder from '../ModalForms/AddTemplateFolder';
import DeleteComponent from '../ModalForms/DeleteComponent';
import ExportComponent from '../ModalForms/ExportComponent';
import './Toolbar.css';

export default function Toolbar(props) {

    const [showAddElement, set_showAddElement] = useState(false);
    const [showAddFolder, set_showAddFolder] = useState(false);
    const [showDeleteComponent, set_showDeleteComponent] = useState(false);
    const [showExportComponent, set_showExportComponent] = useState(false);

        return(
            <div className="ToolbarRelative">
            <div className="Toolbar">
            <button className="Toolbarbutton" onClick={() => set_showAddElement(true)}>Добавить элемент</button>
            <AddElement folder={props.parent} prevpages={props.previouspages} typeofcomponent={props.typeof_parentel} onClose={()=>set_showAddElement(false)} show={showAddElement}/>
            <button className="Toolbarbutton" onClick={() => set_showAddFolder(true)}>Добавить папку</button>
            <AddFolder folder={props.parent} prevpages={props.previouspages} onClose={()=>set_showAddFolder(false)} show={showAddFolder}/>
            <button className="Toolbarbutton" onClick={() => set_showDeleteComponent(true)}>Удалить папку</button>
            <DeleteComponent prevpages={props.previouspages} component={props.parent} typeofcomponent={props.typeof_parentel} onClose={()=>set_showDeleteComponent(false)} show={showDeleteComponent}/>
            <button className="Toolbarbutton">Изменить папку</button>
            <button className="Toolbarbutton" onClick={() => set_showExportComponent(true)}>Экспорт папки</button>
            <ExportComponent component={props.parent} typeofcomponent={props.typeof_parentel} onClose={()=>set_showExportComponent(false)} show={showExportComponent}/>
            <button className="Toolbarbutton">Импорт компонента</button>
            </div>
            </div>
          )
    
  
}