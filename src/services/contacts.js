// src/controllers/contacts.js

export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;

    const query = {};
    if (type) query.contactType = type;
    if (isFavourite !== undefined) query.isFavourite = isFavourite === 'true';

    const skip = (page - 1) * perPage;
    const totalItems = await ContactsCollection.countDocuments(query);
    const totalPages = Math.ceil(totalItems / perPage);

    const contacts = await ContactsCollection.find(query)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(Number(perPage));

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts,
        page: Number(page),
        perPage: Number(perPage),
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    next(createError(500, 'Error retrieving contacts'));
  }
};
