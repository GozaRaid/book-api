import Joi from "joi";

const BookPayloadSchema = Joi.object({
  tittle: Joi.string().required(),
  published: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  format: Joi.string().required(),
  isbn: Joi.number().required(),
  description: Joi.string().required(),
  book_image_url: Joi.string().required(),
});

export { BookPayloadSchema };
