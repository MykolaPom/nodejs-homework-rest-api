const express = require("express");
const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact } = require('../../models/contacts');

const { addContactValidation, putContactValidation } = require('../../middlewares/validationMiddleware');

const router = new express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ message: "success", code: 200, contacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ message: "success", code: 200, contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", addContactValidation, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing required name field" });
      return;
    }
    const contact = await addContact(name, email, phone);
    res
      .status(201)
      .json({ message: "Contact has been added successfully", contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const isContactDeleted = await removeContact(contactId);
    if (!isContactDeleted) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ message: "Contact has been deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:contactId", putContactValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const updatedContact = await updateContact(contactId, req.body);

    if (!updatedContact) {
      res.status(400).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ message: "success", contact: updatedContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
