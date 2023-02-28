const Contact = require("../../models/contactModel");

const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndRemove({
    $and: [{ _id: contactId }, { owner }],
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  return res.status(200).json({
    message: "Contact deleted",
  });
};

module.exports = removeContact;
