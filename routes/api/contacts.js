const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");

const { isValidId, authenticate } = require("../../middlewares");

const {
  addContactValidation,
  putContactValidation,
} = require("../../middlewares/validationMiddleware");

const router = new express.Router();

router.use(authenticate);

router.get("/", ctrlWrapper(ctrl.getListOfContacts));
router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));
router.post("/", addContactValidation, ctrlWrapper(ctrl.addContact));
router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));
router.put(
  "/:contactId",
  isValidId,
  putContactValidation,
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
