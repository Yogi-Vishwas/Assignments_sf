import { nString, Entity } from "./User";

export class Datasource<T extends Entity> {
  url: string;
  constructor(
    private readonly _createClass: {
      new (data: { [key: string]: nString }): T;
    },
    url: string
  ) {
    this._createClass = _createClass;
    this.url = url;
  }

  getData() {
    let dataArr: T[] = [];
    let httpRequest = new XMLHttpRequest();

    httpRequest.onload = function () {
      if (httpRequest.status == 200) {
        dataArr = JSON.parse(this.responseText);
      }
    };
    httpRequest.open("GET", this.url, false);
    httpRequest.setRequestHeader(
      "Content-type",
      "application/json; charset=UTF-8"
    );
    httpRequest.send();
    return dataArr;
  }

  createData(obj: T) {
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", this.url, false);
    httpRequest.setRequestHeader(
      "Content-type",
      "application/json; charset=UTF-8"
    );
    httpRequest.send(JSON.stringify(obj));

    httpRequest.onload = function () {
      if (httpRequest.status == 200) {
        console.log(`User with id ${obj.id} is added to the database`);
      }
    };
  }

  getElembyPKey(pkeyValue: string) {
    let user = {};
    let httpRequest = new XMLHttpRequest();

    httpRequest.onload = function () {
      if (httpRequest.status == 200) {
        user = { ...JSON.parse(this.responseText) };
        console.log(
          `user with id ${JSON.parse(this.responseText).id} is added`
        );
      }
    };
    httpRequest.open("GET", `${this.url}/${pkeyValue}`, false);
    httpRequest.setRequestHeader(
      "Content-type",
      "application/json; charset=UTF-8"
    );
    httpRequest.send();
    return user;
  }

  deleteData(id: string) {
    let httpRequest = new XMLHttpRequest();

    httpRequest.onload = function () {
      if (httpRequest.status == 200) {
        console.log(
          `user with id ${JSON.parse(this.responseText).id} is deleted`
        );
      }
    };
    httpRequest.open("DELETE", `${this.url}/${id}`, false);
    httpRequest.setRequestHeader(
      "Content-type",
      "application/json; charset=UTF-8"
    );
    httpRequest.send();
  }

  updateData(id: string, elem: T) {
    let httpRequest = new XMLHttpRequest();

    httpRequest.onload = function () {
      if (httpRequest.status == 200) {
        console.log(this.responseText);
        console.log(
          `user with id ${JSON.parse(this.responseText).id} is updated`
        );
      }
    };
    httpRequest.open("PATCH", `${this.url}/${id}`, false);
    httpRequest.setRequestHeader(
      "Content-type",
      "application/json; charset=UTF-8"
    );
    httpRequest.send(JSON.stringify(elem));
  }
}
