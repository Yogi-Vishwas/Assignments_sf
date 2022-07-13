"use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const data2_json_1 = __importDefault(require("./data2.json"));

import data2_json_1 from './data2.json' assert{type: 'json'}
var pKey = "eCode";
function loadData(e) {
    t.onClickLoad(e);
}
function editData(e) {
    t.onClickEdit(e);
}
function deleteData(e) {
    t.onClickDelete(e);
}
function saveData(e) {
    t.onClickSave(e);
}
function cancel(e) {
    t.onClickCancel(e);
}
function refreshData() {
    t.onClickRefresh();
}
function addData() {
    t.onClickAdd();
}
function addInline(e) {
    t.addRow(e);
}
var Roles;
(function (Roles) {
    Roles["SuperAdmin"] = "Super Admin";
    Roles["Admin"] = "Admin";
    Roles["Subscriber"] = "Subscriber";
})(Roles || (Roles = {}));
class User {
    constructor(dataObject) {
        this.userId =
            dataObject["userId"] == undefined || !dataObject["userId"]
                ? null
                : dataObject["userId"];
        this.jobTitle =
            dataObject["jobTitle"] == undefined || !dataObject["jobTitle"]
                ? null
                : dataObject["jobTitle"];
        this.firstName =
            dataObject["firstName"] == undefined || !dataObject["firstName"]
                ? null
                : dataObject["firstName"];
        this.lastName =
            dataObject["lastName"] == undefined || !dataObject["lastName"]
                ? null
                : dataObject["lastName"];
        this.preferredName =
            dataObject["preferredName"] == undefined || !dataObject["preferredName"]
                ? null
                : dataObject["preferredName"];
        this.eCode =
            dataObject["eCode"] == undefined || !dataObject["eCode"]
                ? null
                : dataObject["eCode"];
        this.region =
            dataObject["region"] == undefined || !dataObject["region"]
                ? null
                : dataObject["region"];
        this.phone =
            dataObject["phone"] == undefined || !dataObject["phone"]
                ? null
                : dataObject["phone"];
        this.email =
            dataObject["email"] == undefined || !dataObject["email"]
                ? null
                : dataObject["email"];
        if (dataObject["role"] == undefined || !dataObject["role"]) {
            this.role = null;
        }
        else {
            if (dataObject["role"].split(" ").join("").toLowerCase() == "admin")
                this.role = Roles.Admin;
            else if (dataObject["role"].split(" ").join("").toLowerCase() == "superadmin")
                this.role = Roles.SuperAdmin;
            else if (dataObject["role"].split(" ").join("").toLowerCase() == "subscriber")
                this.role = Roles.Subscriber;
        }
    }
}
User.metadata = {
    userId: { name: "User Id" },
    jobTitle: { name: "Job Title" },
    firstName: { name: "First Name" },
    lastName: { name: "Last Name" },
    preferredName: { name: "Preffered Name" },
    eCode: { name: "Employee Code" },
    region: { name: "Region" },
    phone: { name: "Phone Number" },
    email: { name: "Email" },
    role: { name: "Role" },
};
class Datasource {
    constructor(json_data) {
        this.data = [];
        this.loadData(json_data);
    }
    loadData(json_data) {
        this.data = [];
        json_data.forEach((elem) => {
            let user = new User(elem);
            this.data.push(user);
        });
    }
    getData() {
        return this.data;
    }
    createData(obj) {
        this.data.push(obj);
    }
    getElembyPKey(pkeyValue) {
        return this.data.findIndex((elem) => {
            return elem.eCode === pkeyValue;
        });
    }
    deleteData(id) {
        let i = this.getElembyPKey(id);
        this.data.splice(i, 1);
    }
    updateData(id, elem) {
        let i = this.getElembyPKey(id);
        delete this.data[i];
        this.data[i] = elem;
    }
}
let d = new Datasource(data2_json_1);
class Table {
    constructor(datasource) {
        this.datasource = datasource;
        this.row_header = [];
        this.colClass = [];
        this.row_header = this.getRowHeader();
        this.colClass = this.getColClass();
    }
    getRowHeader() {
        for (const value of Object.values(User.metadata)) {
            this.row_header.push(value.name);
        }
        return this.row_header;
    }
    getColClass() {
        for (const key of Object.keys(User.metadata)) {
            this.colClass.push(key);
        }
        return this.colClass;
    }
    onClickLoad(e) {
        let id = e.target.id;
        let load_button = document.getElementById(id);
        load_button.remove();
        const refresh_button = document.createElement("button");
        refresh_button.innerHTML = "Reset";
        refresh_button.id = "refresh_button";
        refresh_button.addEventListener("click", refreshData);
        document.querySelector("body").appendChild(refresh_button);
        const add_button = document.createElement("button");
        add_button.innerHTML = "Add";
        add_button.id = "add_button";
        add_button.addEventListener("click", addData);
        document.querySelector("body").appendChild(add_button);
        this.createTable();
    }
    createTable() {
        const table = document.createElement("table");
        table.setAttribute("id", "table");
        const table_body = document.createElement("tbody");
        table_body.setAttribute("id", "table_body");
        const row_h = document.createElement("tr");
        row_h.id = "row_h";
        this.row_header.forEach((elem, j) => {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(elem);
            cell.setAttribute("class", this.colClass[j]);
            cell.appendChild(cellText);
            row_h.appendChild(cell);
        });
        table_body.appendChild(row_h);
        table.appendChild(table_body);
        document.body.appendChild(table);
        this.populateTable();
    }
    populateTable() {
        let table_body = document.querySelector("#table_body");
        this.datasource.data.forEach((elem) => {
            const row = document.createElement("tr");
            row.id = `row_${elem.eCode}`;
            Object.values(elem).forEach((value, index) => {
                let cell = document.createElement("td");
                cell.setAttribute("class", this.colClass[index]);
                let cellText = document.createTextNode(value);
                cell.appendChild(cellText);
                row.appendChild(cell);
            });
            let edit_cell = document.createElement("td");
            let edit_button = document.createElement("button");
            edit_button.innerHTML = "Edit";
            edit_button.id = `edit_${elem.eCode}`;
            edit_cell.setAttribute("class", "edit");
            edit_button.addEventListener("click", editData);
            edit_cell.appendChild(edit_button);
            let delete_cell = document.createElement("td");
            let delete_button = document.createElement("button");
            delete_button.innerHTML = "Delete";
            delete_button.id = `delete_${elem.eCode}`;
            delete_cell.setAttribute("class", "delete");
            delete_button.addEventListener("click", deleteData);
            delete_cell.appendChild(delete_button);
            row.appendChild(edit_cell);
            row.appendChild(delete_cell);
            table_body.appendChild(row);
        });
    }
    createCreateAndEditButtons(rowId) {
        let row = document.getElementById(rowId);
        let index = rowId.slice(4, rowId.length);
        let edit_cell = document.querySelector(`#${rowId} .edit`);
        let edit_button = document.createElement("button");
        edit_button.innerHTML = "Edit";
        edit_button.id = `edit_${index}`;
        edit_button.addEventListener("click", editData);
        edit_cell.appendChild(edit_button);
        let delete_cell = document.querySelector(`#${rowId} .delete`);
        let delete_button = document.createElement("button");
        delete_button.innerHTML = "Delete";
        delete_button.id = `delete_${index}`;
        delete_button.addEventListener("click", deleteData);
        delete_cell.appendChild(delete_button);
        row.appendChild(edit_cell);
        row.appendChild(delete_cell);
    }
    onClickEdit(e) {
        let _id = e.target.id;
        let edit_button = document.getElementById(_id);
        let id = _id.slice(5, _id.length);
        let row = document.getElementById(`row_${id}`);
        row.contentEditable = "true";
        let save_button = document.createElement("button");
        save_button.id = `save_${id}`;
        save_button.innerHTML = "Save";
        let editCell = document.querySelector(`#row_${id} .edit`);
        edit_button.remove();
        editCell.appendChild(save_button);
        save_button.addEventListener("click", saveData);
        let delete_button = document.getElementById(`delete_${id}`);
        delete_button.remove();
        let cancel_button = document.createElement("button");
        cancel_button.id = `cancel_${id}`;
        cancel_button.innerHTML = "Cancel";
        let deleteCell = document.querySelector(`#row_${id} .delete`);
        deleteCell.appendChild(cancel_button);
        cancel_button.addEventListener("click", cancel);
    }
    onClickDelete(e) {
        let id = e.target.id;
        id = id.slice(7, id.length);
        let row = document.getElementById(`row_${id}`);
        row.remove();
        this.datasource.deleteData(id);
    }
    onClickSave(e) {
        let _id = e.target.id;
        let id = _id.slice(5, _id.length);
        let save_button = document.getElementById(_id);
        save_button.remove();
        let cancel_button = document.getElementById(`cancel_${id}`);
        cancel_button.remove();
        let row = document.getElementById(`row_${id}`);
        row.contentEditable = "false";
        let editedRow = {};
        this.colClass.forEach((elem) => {
            let newText = document.querySelector(`#row_${id} .${elem}`).innerHTML;
            editedRow[elem] = newText;
        });
        let newData = new User(editedRow);
        this.datasource.updateData(id, newData);
        this.createCreateAndEditButtons(`row_${id}`);
    }
    onClickCancel(e) {
        let _id = e.target.id;
        let id = _id.slice(7, _id.length);
        let cancel_button = document.getElementById(_id);
        cancel_button.remove();
        let save_button = document.getElementById(`save_${id}`);
        save_button.remove();
        this.createCreateAndEditButtons(`row_${id}`);
        let i = this.datasource.getElembyPKey(id);
        Object.values(this.datasource.data[i]).forEach((elem, index) => {
            let cell = document.querySelector(`#row_${id} .${this.colClass[index]}`);
            cell.innerHTML = elem;
        });
    }
    onClickRefresh() {
        document.querySelector("table").remove();
        this.datasource.loadData(data2_json_1);
        this.createTable();
    }
    onClickAdd() {
        let table_body = document.getElementById("table_body");
        let row = document.createElement("tr");
        row.id = "new";
        this.colClass.forEach((elem) => {
            let cell = document.createElement("td");
            cell.setAttribute("class", elem);
            row.appendChild(cell);
        });
        let edit_cell = document.createElement("td");
        edit_cell.setAttribute("class", "edit");
        row.appendChild(edit_cell);
        let delete_cell = document.createElement("td");
        delete_cell.setAttribute("class", "delete");
        row.appendChild(delete_cell);
        row.contentEditable = "true";
        let add_button = document.createElement("button");
        add_button.innerHTML = "Add";
        add_button.id = "addInline";
        add_button.addEventListener("click", addInline);
        row.appendChild(add_button);
        table_body.appendChild(row);
    }
    addRow(e) {
        let id = e.target.id;
        document.getElementById(id).remove();
        let row = document.getElementById("new");
        id = document.querySelector("#new .eCode").innerHTML;
        row.id = `row_${id}`;
        this.createCreateAndEditButtons(row.id);
        let newRow = {};
        this.colClass.forEach((elem) => {
            let newText = document.querySelector(`#row_${id} .${elem}`).innerHTML;
            newRow[elem] = newText;
        });
        let newData = new User(newRow);
        this.datasource.createData(newData);
    }
}
let t = new Table(d);
document.getElementById("load_button").addEventListener("click", loadData);
