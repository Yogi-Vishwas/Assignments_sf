"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data2_json_1 = __importDefault(require("./data2.json"));
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
class Employee {
}
Employee.metadata = {
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
        this.dataObj = [];
        this.row_header = [];
        this.colClass = [];
        this.data = json_data;
        this.initialState = [];
    }
    getRowHeader() {
        for (const value of Object.values(Employee.metadata)) {
            this.row_header.push(value.name);
        }
        return this.row_header;
    }
    getColClass() {
        for (const key of Object.keys(Employee.metadata)) {
            this.colClass.push(key);
        }
        return this.colClass;
    }
    getInitialState() {
        this.data.forEach((elem) => {
            let obj = {};
            for (const key of Object.keys(Employee.metadata)) {
                if (key != "role") {
                    obj[key] = elem[key] ? elem[key] : null;
                }
                else {
                    if (elem[key] === "Admin")
                        obj[key] = Roles.Admin;
                    else if (elem[key] === "SuperAdmin")
                        obj[key] = Roles.SuperAdmin;
                    else if (elem[key] === "Subsciber")
                        obj[key] = Roles.Subscriber;
                    else
                        obj[key] = null;
                }
            }
            this.initialState.push(obj);
        });
        return this.initialState;
    }
    getData() {
        this.data.forEach((elem) => {
            let obj = {};
            for (const key of Object.keys(Employee.metadata)) {
                if (key != "role") {
                    obj[key] = elem[key] ? elem[key] : null;
                }
                else {
                    if (elem[key] === "Admin")
                        obj[key] = Roles.Admin;
                    else if (elem[key] === "SuperAdmin")
                        obj[key] = Roles.SuperAdmin;
                    else if (elem[key] === "Subsciber")
                        obj[key] = Roles.Subscriber;
                    else
                        obj[key] = null;
                }
            }
            this.dataObj.push(obj);
        });
        return this.dataObj;
    }
    readData() {
        return this.dataObj;
    }
    findElem(ecode) {
        return this.dataObj.findIndex((elem) => {
            return elem["eCode"] === ecode;
        });
    }
    updateData(id, editedRow) {
        let i = this.findElem(id);
        for (let index in this.colClass) {
            this.dataObj[i][this.colClass[index]] = editedRow[index];
        }
    }
    deleteData(id) {
        let i = this.findElem(id);
        this.dataObj.splice(i, 1);
    }
    createData(newRow) {
        let obj = {};
        let index = 0;
        for (let key of Object.keys(Employee.metadata)) {
            obj[key] = newRow[index];
            index++;
        }
        this.dataObj.push(obj);
    }
}
let d = new Datasource(data2_json_1.default);
class Table {
    constructor(obj) {
        this.tab = obj;
        this.row_head = obj.getRowHeader();
        this.colClass = obj.getColClass();
        this.data = obj.getData();
        this.init = obj.getInitialState();
    }
    onClickLoad(e) {
        let id = e.target.id;
        let load_button = document.getElementById(id);
        load_button.remove();
        const refresh_button = document.createElement("button");
        refresh_button.innerHTML = "Refresh";
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
        for (let j = 0; j < this.row_head.length; j++) {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(this.row_head[j]);
            cell.setAttribute("class", this.colClass[j]);
            cell.appendChild(cellText);
            row_h.appendChild(cell);
        }
        table_body.appendChild(row_h);
        table.appendChild(table_body);
        document.body.appendChild(table);
        this.populateTable();
    }
    populateTable() {
        let table_body = document.querySelector("#table_body");
        for (let index in this.data) {
            const row = document.createElement("tr");
            row.id = `row_${this.data[index][pKey]}`;
            let j = 0;
            for (const key of Object.keys(this.data[index])) {
                let cell = document.createElement("td");
                cell.setAttribute("class", this.colClass[j]);
                j++;
                let cellText = document.createTextNode(this.data[index][key]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            let edit_cell = document.createElement("td");
            let edit_button = document.createElement("button");
            edit_button.innerHTML = "Edit";
            edit_button.id = `edit_${this.data[index][pKey]}`;
            edit_cell.setAttribute("class", "edit");
            edit_button.addEventListener("click", editData);
            edit_cell.appendChild(edit_button);
            let delete_cell = document.createElement("td");
            let delete_button = document.createElement("button");
            delete_button.innerHTML = "Delete";
            delete_button.id = `delete_${this.data[index][pKey]}`;
            delete_cell.setAttribute("class", "delete");
            delete_button.addEventListener("click", deleteData);
            delete_cell.appendChild(delete_button);
            row.appendChild(edit_cell);
            row.appendChild(delete_cell);
            table_body.appendChild(row);
        }
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
        this.tab.deleteData(id);
    }
    onClickSave(e) {
        let _id = e.target.id;
        let save_button = document.getElementById(_id);
        save_button.remove();
        let id = _id.slice(5, _id.length);
        let cancel_button = document.getElementById(`cancel_${id}`);
        cancel_button.remove();
        let row = document.getElementById(`row_${id}`);
        row.contentEditable = "false";
        let newRow = [];
        for (let index in this.colClass) {
            let newText = document.querySelector(`#row_${id} .${this.colClass[index]}`).innerHTML;
            newRow.push(newText);
        }
        this.tab.updateData(id, newRow);
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
        for (let index in this.colClass) {
            let cell = document.querySelector(`#row_${id} .${this.colClass[index]}`);
            let i = this.tab.findElem(id);
            cell.innerHTML = this.data[i][this.colClass[index]];
        }
    }
    onClickRefresh() {
        document.querySelector("table").remove();
        this.data = this.init;
        this.createTable();
    }
    onClickAdd() {
        let table_body = document.getElementById("table_body");
        let row = document.createElement("tr");
        row.id = "new";
        for (let index = 0; index < this.colClass.length; index++) {
            let cell = document.createElement("td");
            cell.setAttribute("class", this.colClass[index]);
            row.appendChild(cell);
        }
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
        let newRow = [];
        for (let index in this.colClass) {
            let newText = document.querySelector(`#row_${id} .${this.colClass[index]}`).innerHTML;
            newRow.push(newText);
        }
        this.tab.createData(newRow);
    }
}
let t = new Table(d);
document.getElementById("load_button").addEventListener("click", loadData);
