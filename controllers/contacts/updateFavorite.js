const Contact = require("../../models/contactModel");

const HttpError = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    {
      $and: [{ _id: contactId }, { owner }],
    },
    { favorite }
  );

  if (!result) {
    throw HttpError(404, `Contact whith id = ${contactId} not found`);
  }

  res.json(result);
};

module.exports = updateFavorite;
