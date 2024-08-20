import { BookPayloadSchema } from "./schema";
import InvariantError from "../../exceptions/InvariantError.js";

const BooksValidator = {
  validateBookPayload: (payload) => {
    const validationResult = BookPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default BooksValidator;
