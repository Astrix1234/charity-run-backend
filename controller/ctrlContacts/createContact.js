import contactsService from "#service/contactsService.js";

export const create = async (req, res, next) => {
  try {
    const result = await contactsService.createContact(req.body);

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
