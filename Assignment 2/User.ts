export type nString = string | null | undefined;
export interface Entity {
  id: nString;
}

function FormatDate() {
  return function (target: any, propertyKey: string) {
    let value: string;
    const getter = function () {
      return value;
    };
    const setter = function (newValue: string) {
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

enum Roles {
  SuperAdmin = "Super Admin",
  Admin = "Admin",
  Subscriber = "Subscriber",
}

interface Metadata {
  userId: { name: string };
  jobTitle: { name: string };
  firstName: { name: string };
  lastName: { name: string };
  preferredName: { name: string };
  id: { name: string };
  region: { name: string };
  phone: { name: string };
  email: { name: string };
  dob : {name: string};
  role: { name: string };
}

export class User implements Entity {
  @FormatDate()
  dob: nString;

  userId: nString;
  jobTitle: nString;
  firstName: nString;
  lastName: nString;
  preferredName: nString;
  id: nString;
  region: nString;
  phone: nString;
  email: nString;
  role: nString;

  constructor(dataObject: { [key: string]: nString }) {
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
    } else {
      if (dataObject["role"].split(" ").join("").toLowerCase() == "admin")
        this.role = Roles.Admin;
      else if (
        dataObject["role"].split(" ").join("").toLowerCase() == "superadmin"
      )
        this.role = Roles.SuperAdmin;
      else if (
        dataObject["role"].split(" ").join("").toLowerCase() == "subscriber"
      )
        this.role = Roles.Subscriber;
    }
  }

  static metadata: Metadata = {
    userId: { name: "User Id" },
    jobTitle: { name: "Job Title" },
    firstName: { name: "First Name" },
    lastName: { name: "Last Name" },
    preferredName: { name: "Preffered Name" },
    id: { name: "Employee Code" },
    region: { name: "Region" },
    phone: { name: "Phone Number" },
    email: { name: "Email" },
    dob : {name : 'DOB'},
    role: { name: "Role" },
  };
}
