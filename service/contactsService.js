import Contact from "./schemas/contact.js";

const getAllContacts = async ({ page = 1, limit = 20, favorite }) => {
  const options = {};

  if (favorite !== undefined) {
    options.favorite = favorite;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  return Contact.find(options).skip(skip).limit(parseInt(limit));
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = (body) => {
  return Contact.create(body);
};

const updateContact = (id, body) => {
  return Contact.findOneAndUpdate({ _id: id }, body, { new: true });
};

const removeContact = (id) => {
  return Contact.deleteOne({ _id: id });
};

const updateContactFavorite = (id, favorite) => {
  const update = { favorite: favorite };
  return Contact.findOneAndUpdate({ _id: id }, update, { new: true });
};

export default {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateContactFavorite,
};
