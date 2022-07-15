"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datasource = void 0;
class Datasource {
    constructor(_createClass, json_data) {
        this._createClass = _createClass;
        this.data = [];
        this.loadData(json_data);
    }
    loadData(json_data) {
        this.data = [];
        json_data.forEach((elem) => {
            let user = new this._createClass(elem);
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
            return elem.id === pkeyValue;
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
exports.Datasource = Datasource;
