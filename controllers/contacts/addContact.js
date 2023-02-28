const Contact = require("../../models/contactModel");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = new Contact({ ...req.body, owner });
  // const contact = await Contact.create({...req.body, owner});
  const newContact = await contact.save()
  
  if (!contact) {
    throw HttpError(404, "Missing required name field");
  }
  const { id, name, email, phone } = newContact;

  res.status(201).json({ id, name, email, phone });
};

module.exports = addContact;
