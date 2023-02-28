const Contact = require("../../models/contactModel");

const getListOfContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const findParams = favorite ? { owner, favorite } : { owner };

  const contacts = await Contact.find(findParams, "-createdAt -updatedAt", {
    skip,
    limit: +limit,
  });

  res.status(200).json(contacts);
};

module.exports = getListOfContacts;
