/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const createnote = async () => {
    const title=app_notes.shadowRoot.querySelector("#title").value;
    const content=app_notes.shadowRoot.querySelector("#note").value;
    const obj={
        title:title,
        content:content
    }
    let resp = await apiman.rest(APP_CONSTANTS.API_CREATE, "POST", obj , false, true);
    if (!resp || !resp.result) router.reload();
    console.log(resp.results);
    app_notes.shadowRoot.querySelector("#title").value="";
    app_notes.shadowRoot.querySelector("#note").value="";
    let html = "<table style='border-collapse: collapse;'>";
    for (let i = 0; i < resp.results.notes.length; i++) {
        html+="<tr>";
        html+=`<td id='note_id${i}' style='display:none;'>`+resp.results.notes[i]._id+"</td>";
        html+=`<td id='note_title${i}' style= 'border: 1px solid #ddd; padding: 8px;'>`+resp.results.notes[i].title+"</td>";
        html+=`<td id='note_content${i}'style='border: 1px solid #ddd;padding: 8px;'>`+resp.results.notes[i].content+"</td>";
        html+=`<td style= 'border: 1px solid #ddd; padding: 8px;'><button onclick="monkshu_env.components['app-notes'].updatenote(${i})">Update</button></td>`; 
        html+="<td style= 'border: 1px solid #ddd; padding: 8px;'>"+`<button onclick="monkshu_env.components['app-notes'].deletenote(${i})">Delete</button></td>`;
        html+="</tr>";
    }
    html+="</table>";
    app_notes.shadowRoot.querySelector("#printnote").innerHTML=html;
}
const getnote = async () => {
    let resp = await apiman.rest(APP_CONSTANTS.API_GETNOTE, "GET", {}, true);
    console.log(resp.results);
    let html = "<table style='border-collapse: collapse'>";
    for (let i = 0; i < resp.results.notes.length; i++) {
        html+="<tr>";
        html+=`<td id='note_id${i}' style='display:none;'>`+resp.results.notes[i]._id+"</td>";
        html+=`<td id='note_title${i}' style= 'border: 1px solid #ddd; padding: 8px;'>`+resp.results.notes[i].title+"</td>";
        html+=`<td id='note_content${i}'style='border: 1px solid #ddd;padding: 8px;'>`+resp.results.notes[i].content+"</td>";
        html+=`<td  style= 'border: 1px solid #ddd;padding: 8px;'><button onclick="monkshu_env.components['app-notes'].updatenote(${i})">Update</button></td>`; 
        html+="<td  style= ' border: 1px solid #ddd; padding: 8px;'>"+`<button onclick="monkshu_env.components['app-notes'].deletenote(${i})">Delete</button></td>`;
        html+="</tr>";
    }
    html+="</table>";
    app_notes.shadowRoot.querySelector("#printnote").innerHTML=html;
    if (!resp || !resp.result) router.reload();
}
const deletenote = async (index) => {
    const _id=app_notes.shadowRoot.querySelector("#note_id"+index).innerHTML;
    const title=app_notes.shadowRoot.querySelector("#note_title"+index).innerHTML;
    const content=app_notes.shadowRoot.querySelector("#note_content"+index).innerHTML;
    const obj={
        _id:_id,
        title:title,
        content:content
    }
    let response = await apiman.rest(APP_CONSTANTS.API_DELETE, "GET", obj ,true);
    console.log(response.results);
    let html = "<table>";
    for (let i = 0; i < response.results.notes.length; i++) {
        html+="<tr style='border-collapse: collapse;'>";
        html+=`<td id='note_id${i}' style='display:none;'>`+response.results.notes[i]._id+"</td>";
        html+=`<td id='note_title${i}' style= 'border: 1px solid #ddd; padding: 8px;'>`+response.results.notes[i].title+"</td>";
        html+=`<td id='note_content${i}' style= 'border: 1px solid #ddd; padding: 8px;'>`+response.results.notes[i].content+"</td>";
        html+=`<td style= 'border: 1px solid #ddd; padding: 8px;'><button onclick="monkshu_env.components['app-notes'].updatenote(${i})">Update</button></td>`; 
        html+="<td style= 'border: 1px solid #ddd; padding: 8px;'>"+`<button onclick="monkshu_env.components['app-notes'].deletenote(${i})">Delete</button></td>`;
        html+="</tr>";
    }
    html+="</table>";
    app_notes.shadowRoot.querySelector("#printnote").innerHTML=html;
    if (!response || !response.result) router.reload();
}

const updatenote = async (index) => {
    if(app_notes.shadowRoot.querySelector("#title").value)
    {
        alert("Update first!");
    }
    else
    {
        const _id=app_notes.shadowRoot.querySelector("#note_id"+index).innerHTML;
        const title=app_notes.shadowRoot.querySelector("#note_title"+index).innerHTML;
        const content=app_notes.shadowRoot.querySelector("#note_content"+index).innerHTML;
        const obj={
            _id:_id,
            title:title,
            content:content
        }
        let resp = await apiman.rest(APP_CONSTANTS.API_UPDATE, "GET", obj ,true);
        console.log(resp);
        app_notes.shadowRoot.querySelector("#title").value=resp.results.notes.updatedoc.title;
        app_notes.shadowRoot.querySelector("#note").value=resp.results.notes.updatedoc.content;
        let html = "<table style='border-collapse: collapse;'>";
        for (let i = 0; i < resp.results.notes.leftdoc.length; i++) {
            html+="<tr>";
            html+=`<td id='note_id${i}' style='display:none;'>`+resp.results.notes.leftdoc[i]._id+"</td>";
            html+=`<td id='note_title${i}' style= 'border: 1px solid #ddd; padding: 8px;'>`+resp.results.notes.leftdoc[i].title+"</td>";
            html+=`<td id='note_content${i}'style='border: 1px solid #ddd;padding: 8px;'>`+resp.results.notes.leftdoc[i].content+"</td>";
            html+=`<td style= 'border: 1px solid #ddd; padding: 8px;'><button onclick="monkshu_env.components['app-notes'].updatenote(${i})">Update</button></td>`; 
            html+="<td style= 'border: 1px solid #ddd; padding: 8px;'>"+`<button onclick="monkshu_env.components['app-notes'].deletenote(${i})">Delete</button></td>`;
            html+="</tr>";
        }
        html+="</table>";
        app_notes.shadowRoot.querySelector("#printnote").innerHTML=html;
        if (!resp || !resp.result) router.reload();
    }
    
}

function register() {
    // convert this all into a WebComponent so we can use it
    
    monkshu_component.register("app-notes", `${APP_CONSTANTS.APP_PATH}/components/app-notes/app-notes.html`, app_notes);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_notes = { trueWebComponentMode, register, createnote, getnote, deletenote, updatenote }