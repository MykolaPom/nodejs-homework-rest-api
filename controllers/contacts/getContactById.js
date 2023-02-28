const Contact = require("../../models/contactModel");

const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.find({ $and: [{ owner }, { _id: contactId }] });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = getContactById;