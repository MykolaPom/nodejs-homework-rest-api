const fs = require("fs").promises;
const { readFile } = require("fs");
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  const [contact] = parsedData.filter((item) => item.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  const dataAfterRemove = parsedData.filter((item) => item.id !== contactId);
  if (dataAfterRemove.length === parsedData.length) {
    return false;
  }
  fs.writeFile(contactsPath, JSON.stringify(dataAfterRemove));
  return true;
};

const addContact = async (body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);

  const newContact = { name, email, phone, id: new Date().getTime().toString()}; //String(Date.now()) 
  parsedData.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(parsedData));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  const contactIndex = parsedData.findIndex((item) => item.id === contactId);
  const contactById = parsedData[contactIndex];
  if (contactIndex === -1) {
    return;
  }
  Object.assign(parsedData[contactIndex], body);
  fs.writeFile(contactsPath, JSON.stringify(parsedData));
  return contactById;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
