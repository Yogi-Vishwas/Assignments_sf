// "use strict";
// var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
//     var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
//     if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
//     else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
//     return c > 3 && r && Object.defineProperty(target, key, r), r;
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.User = void 0;
function FormatDate() {
    return function (target, propertyKey) {
        let value;
        const getter = function () {
            return value;
        };
        const setter = function (newValue) {
            value =
                newValue.slice(0, 2) +
                    "-" +
                    newValue.slice(3, 5) +
                    "-" +
                    newValue.slice(6, newValue.length);
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
        });
    };
}
var Roles;
(function (Roles) {
    Roles["SuperAdmin"] = "Super Admin";
    Roles["Admin"] = "Admin";
    Roles["Subscriber"] = "Subscriber";
})(Roles || (Roles = {}));
export default class User {
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
        this.id =
            dataObject["id"] == undefined || !dataObject["id"]
                ? null
                : dataObject["id"];
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
        this.dob =
            dataObject["dob"] == undefined || !dataObject["dob"]
                ? null
                : dataObject["dob"];
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
    id: { name: "Employee Code" },
    region: { name: "Region" },
    phone: { name: "Phone Number" },
    email: { name: "Email" },
    dob: { name: 'DOB' },
    role: { name: "Role" },
};
// __decorate([
//     FormatDate()
// ], User.prototype, "dob", void 0);
// exports.User = User;
