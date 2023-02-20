const { ContactSchema } = require("../models/contactModel");

const getListOfContacts = async (req, res) => {
  // console.log(req.user)
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const findParams = favorite ? { owner: _id, favorite } : { owner: _id };
  const allContact = await ContactSchema.findById(
    findParams,
    "-createdAt -updatedAt",
    {
      skip,
      limit: +limit,
    }
  );
  return res.status(200).json(allContact);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contact = await ContactSchema.findById(
    { _id: contactId, owner: _id },
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
  const { _id } = req.user;
  const addedContact = await ContactSchema.create({ ...body, owner: _id });
  return res.status(201).json(addedContact);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const contactToDelete = await ContactSchema.findByIdAndRemove({
    _id: id,
    owner: _id,
  });
  if (contactToDelete) {
    return res.status(200).json(contactToDelete);
  } else {
    const error = new Error(`A contact whith id = ${contactId} not found`);
    error.status = 404;
    throw error;
  }
};

const updateContact = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const { _id } = req.user;
  const contactToUpdate = await ContactSchema.findByIdAndUpdate(
    { _id: contactId, owner: _id },
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
  const { _id } = req.user;
  const contactToUpdate = await ContactSchema.findByIdAndUpdate(
    { _id: contactId, owner: _id },
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
