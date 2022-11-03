import { LsType } from "./types";
const LocalStorage = require("node-localstorage").LocalStorage;
export const localStorage: LsType = new LocalStorage("./data");
