import jsonData from "../data.json";
import { Request, Response } from "express";
import fs from "fs";

var data = jsonData;

function writeData(data: { [key: string]: string }[]): void {
  let data_string = JSON.stringify(data, null, 2);
  fs.writeFile("data.json", data_string, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("JSON DB Updated");
    }
  });
}

export const getUsers = (req: Request, res: Response) => {
  console.log("sending data...");
  res.send(data);
};

export const createUser = (req: Request, res: Response) => {
  let user = req.body;
  data.push(user);
  writeData(data);
  res.send(`User with name ${user.firstName} ${user.lastName} is added.`);
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  let user = data.find((user) => user.id === id);
  res.send(user);
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  data = data.filter((elem) => elem.id !== id);
  writeData(data);
  res.send(`User with id ${id} is deleted.`);
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;

  let user: { [key: string]: string } | undefined = data.find(
    (user) => user.id === id
  );

  for (let [key, value] of Object.entries(req.body)) {
    if (user![key]) user![key] = value as string;
  }

  writeData(data);

  res.send(`User with id ${id} updated.`);
};
