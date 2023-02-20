const express = require("express");
const { cntrlWrap } = require("../../middlewares/cntrlWrap");

const { authValidation } = require("../../middlewares/authValidation");
const { schemaContact } = require("../../middlewares/schemaContact");
const { validation } = require("../../middlewares/validation");

const {
  addContactValidation,
  putContactValidation,
} = require("../../middlewares/validationMiddleware");

const {
  getListOfContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
} = require("../../controllers/contactController");

const router = new express.Router();

router.use(authValidation); // мідлвар для всіх маршрутів
router.get("/", cntrlWrap(getListOfContacts));
router.get("/:contactId", cntrlWrap(getContactById));
router.post(
  "/",
  addContactValidation,
  validation(schemaContact),
  cntrlWrap(addContact)
);
router.delete("/:contactId", cntrlWrap(removeContact));
router.put("/:contactId", putContactValidation, cntrlWrap(updateContact));
router.patch("/:contactId/favorite", cntrlWrap(updateFavorite));

module.exports = router;
