import contactsService from "#service/contactsService.js";

export const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await contactsService.updateContact(id, req.body);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
