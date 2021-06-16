import React, { useState } from 'react';
import AddElement from '../ModalForms/TemplateFolder/AddTemplateElement';
import AddFolder from '../ModalForms/TemplateFolder/AddTemplateFolder';
import DeleteComponent from '../ModalForms/TemplateFolder/DeleteTemplateFolder';
import EditFolder from '../ModalForms/TemplateFolder/EditTemplateFolder';
import ImportFolder from '../ModalForms/TemplateFolder/ImportTemplateFolder';
import ExportFolder from '../ModalForms/Folder/ExportFolder';

import './Toolbar.css';

export default function Toolbar(props) {

    const [showAddElement, set_showAddElement] = useState(false);
    const [showAddFolder, set_showAddFolder] = useState(false);
    const [showDeleteComponent, set_showDeleteComponent] = useState(false);
    const [showEditComponent, set_showEditComponent] = useState(false);
    const [showExportComponent, set_showExportComponent] = useState(false);
    const [showImportComponent, set_showImportComponent] = useState(false);
    
    
    return(
        <div className="ToolbarRelative">
        <div className="Toolbar">
        <button className="Toolbarbutton" onClick={() => set_showAddElement(true)}>Добавить класс</button>
        <AddElement prevpages={props.previouspages} folder={props.parent} onClose={()=>set_showAddElement(false)} show={showAddElement}/>
        <button className="Toolbarbutton" onClick={() => set_showAddFolder(true)}>Добавить папку</button>
        <AddFolder prevpages={props.previouspages} folder={props.parent} onClose={()=>set_showAddFolder(false)} show={showAddFolder}/>
        <button className="Toolbarbutton" onClick={() => set_showDeleteComponent(true)}>Удалить папку</button>
        <DeleteComponent prevpages={props.previouspages} component={props.parent} onClose={()=>set_showDeleteComponent(false)} show={showDeleteComponent}/>
        <button className="Toolbarbutton" onClick={() => set_showEditComponent(true)}>Изменить папку</button>
        <EditFolder prevpages={props.previouspages} folder={props.parent} onClose={()=>set_showEditComponent(false)} show={showEditComponent}/>
        {/* <button className="Toolbarbutton" onClick={() => set_showExportComponent(true)}>Экспорт папки</button>
        <ExportFolder prevpages={props.previouspages} folder={props.parent} onClose={()=>set_showExportComponent(false)} show={showExportComponent}/>
        <button className="Toolbarbutton" onClick={() => set_showImportComponent(true)}>Импорт в папку</button>
        <ImportFolder prevpages={props.previouspages} folder={props.parent} onClose={()=>set_showImportComponent(false)} show={showImportComponent}/> */}
        </div>
        </div>
)   
    
  
}