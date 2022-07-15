import { User, nString, Entity } from "./User";

export class Datasource<T extends Entity> {
  data: T[];

  constructor(
    private readonly _createClass: { new (data: { [key: string]: nString }): T },
    json_data: { [key: string]: nString }[]
  ) {
    this.data = [];
    this.loadData(json_data);
  }

  loadData(json_data: { [key: string]: nString }[]) {
    this.data = [];
    json_data.forEach((elem) => {
      let user = new this._createClass(elem);
      this.data.push(user);
    });
  }

  getData() {
    return this.data;
  }

  createData(obj: T) {
    this.data.push(obj);
  }

  getElembyPKey(pkeyValue: string) {
    return this.data.findIndex((elem: T) => {
      return elem.id === pkeyValue;
    });
  }

  deleteData(id: string) {
    let i = this.getElembyPKey(id);
    this.data.splice(i, 1);
  }

  updateData(id: string, elem: T) {
    let i = this.getElembyPKey(id);
    delete this.data[i];
    this.data[i] = elem;
  }
}
