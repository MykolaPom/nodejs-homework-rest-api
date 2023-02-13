const ContactSchema = require("../models/contactModel");

const getListOfContacts = async (_, res) => {
  const allContact = await ContactSchema.find({}, "-createdAt -updatedAt");
  return res.status(200).json(allContact);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await ContactSchema.findById(
    contactId,
    "-createdAt -updatedAt"
  );
  if (contact) {
    return res.status(200).json(contact);
  } else {
    return res.status(404).json(`Not found contact id: ${contactId}`);
  }
};

const addContact = async (req, res) => {
  const { body } = req;
  const addedContact = await ContactSchema.create(body);
  return res.status(201).json(addedContact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contactToDelete = await ContactSchema.findByIdAndRemove(contactId);
  if (contactToDelete) {
    return res.status(200).json(contactToDelete);
  } else {
    const error = new Error(`contact whith id = ${contactId} not found`);
    error.status = 404;
    throw error;
  }
};

const updateContact = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const contactToUpdate = await ContactSchema.findByIdAndUpdate(
    contactId,
    body,
    {
      new: true,
    }
  );
  if (contactToUpdate) {
    return res.status(200).json(contactToUpdate);
  } else {
    const error = new Error(`contact whith id = ${contactId} not found`);
    error.status = 404;
    throw error;
  }
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const contactToUpdate = await ContactSchema.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    }
  );
  if (contactToUpdate) {
    return res.status(200).json(contactToUpdate);
  } else {
    const error = new Error(`contact whith id = ${contactId} not found`);
    error.status = 404;
    throw error;
  }
};

module.exports = {
  getListOfContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
};