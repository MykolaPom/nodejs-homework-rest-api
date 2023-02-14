const express = require("express");
const { cntrlWrap } = require("../../middlewares/cntrlWrap");

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
} = require("../../controllers/contacts");

const router = new express.Router();

router.get("/", cntrlWrap(getListOfContacts));
router.get("/:contactId", cntrlWrap(getContactById));
router.post("/",addContactValidation, cntrlWrap(addContact));
router.delete("/:contactId", cntrlWrap(removeContact));
router.put(
  "/:contactId",
  putContactValidation, cntrlWrap(updateContact)
);
router.patch("/:contactId/favorite", cntrlWrap(updateFavorite));

module.exports = router;
