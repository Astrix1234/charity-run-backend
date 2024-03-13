import contactsService from "#service/contactsService.js";

export const get = async (req, res, next) => {
  try {
    const results = await contactsService.getAllContacts(value);
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
