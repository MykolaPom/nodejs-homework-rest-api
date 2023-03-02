const addContact = require("./addContact");
const getListOfContacts = require("./getListOfContacts");
const getContactById = require("./getContactById");
const updateContact = require("./updateContact");
const removeContact = require("./removeContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getListOfContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
};
