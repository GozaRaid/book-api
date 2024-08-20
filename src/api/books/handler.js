import autoBind from "auto-bind";

class BooksHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postBookHandler(request, h) {
    this._validator.validateBookPayload(request.payload);
    const {
      tittle,
      published,
      author,
      genre,
      format,
      isbn,
      description,
      book_image_url,
    } = request.payload;

    await this._service.addBook({
      tittle,
      published,
      author,
      genre,
      format,
      isbn,
      description,
      book_image_url,
    });
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
    });
    response.code(201);
    return response;
  }

  async getBooksHandler() {
    const books = await this._service.getBooks();
    return {
      status: "success",
      data: {
        books,
      },
    };
  }
}
