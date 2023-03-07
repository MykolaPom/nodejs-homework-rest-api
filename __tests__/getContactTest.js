// const getContactById = require("../controllers/contacts/getContactById");
// const { HttpError } = require("../helpers/HttpError");
// const Contact = require("../models/contactModel");

// describe("Contacts controller getContactById test", () => {
//   it("should return contact data by given id", async () => {
//     const mContactId = "1";
//     const mUserId = "2";

//     const contact = {
//       _id: "mContactId",
//       name: "Name",
//       owner: "mUserId",
//     };

//     jest.spyOn(Contact, "find").mockImplementationOnce(async () => contact);

//    const result = await getContactById(mContactId, mUserId);

//     expect(result_id).toEqual(mContactId);
//     expect(result.mUserId).toEqual(mUserId);

//   });
// });
