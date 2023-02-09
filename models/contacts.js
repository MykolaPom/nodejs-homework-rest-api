const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();

  const requiredContact = allContacts.find((item) => item.id === contactId);
  if (!requiredContact) {
    return null;
  }
  return requiredContact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();

  const dataAfterRemove = allContacts.filter((item) => item.id !== contactId);
  if (dataAfterRemove.length === allContacts.length) {
    return null;
  }

  const deletedContact = allContacts.find((item) => item.id === contactId);

  await fs.writeFile(contactsPath, JSON.stringify(dataAfterRemove));

  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  }; //String(Date.now())

  const newContactList = [...allContacts, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(newContactList));
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const allContacts = await listContacts();

  const contactIndex = allContacts.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }

  allContacts[contactIndex] = { id: contactId, name, email, phone };

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
