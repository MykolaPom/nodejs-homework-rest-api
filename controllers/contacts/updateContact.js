const Contact = require("../../models/contactModel");

const HttpError = require("../../helpers");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { $and: [{ _id: contactId }, { owner }] },
    { $set: req.body }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = updateContact;
