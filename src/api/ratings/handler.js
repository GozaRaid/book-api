import autoBind from "auto-bind";

class RatingsHandler {
  constructor(RatingsService, BooksService, validator) {
    this._ratingsService = RatingsService;
    this._bookService = BooksService;
    this._validator = validator;

    autoBind(this);
  }

  async postRatingHandler(request, h) {
    this._validator.validateRatingPayload(request.payload);

    const { bookId } = request.params;
    const { rating } = request.payload;
    const { id: user_id } = request.auth.credentials;
    await this._ratingsService.addRatingUserBook({
      user_id,
      book_id: bookId,
      rating,
    });

    const { rows, rowCount } = await this._ratingsService.getRatingsByBookId(
      bookId
    );

    await this._bookService.editBookRatingbyId(
      bookId,
      {
        rating: rows.reduce((acc, cur) => acc + cur.rating, 0) / rowCount,
      },
      rowCount
    );
    const response = h.response({
      status: "success",
      message: "Rating berhasil ditambahkan",
    });
    response.code(201);
    return response;
  }

  async deleteRatingHandler(request, h) {
    const { bookId } = request.params;
    const { id: user_id } = request.auth.credentials;

    // Delete the rating for the book by the user
    await this._ratingsService.deleteRatingUserBook({
      user_id,
      book_id: bookId,
    });

    // Retrieve all remaining ratings for the book
    const { rows, rowCount } = await this._ratingsService.getRatingsByBookId(
      bookId
    );

    // Calculate the new average rating
    let averageRating = 0;
    if (rowCount > 0) {
      averageRating = rows.reduce((acc, cur) => acc + cur.rating, 0) / rowCount;
    }

    // Update the book's rating
    await this._bookService.editBookRatingbyId(
      bookId,
      { rating: averageRating },
      rowCount
    );

    // Respond with success
    const response = h.response({
      status: "success",
      message: "Rating berhasil dihapus",
    });
    response.code(200);
    return response;
  }
}

export default RatingsHandler;
