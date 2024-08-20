import pkg from "pg";
const { Pool } = pkg;
import { mapDBToModelBook } from "../../utils/map.js";

class BooksService {
  constructor() {
    this._pool = new Pool();
  }

  async addBook({
    tittle,
    published,
    author,
    genre,
    format,
    isbn,
    description,
    book_image_url,
  }) {
    const id = `book-${nanoid(16)}`;
    const created_at = new Date().toISOString();
    const query = {
      text: "INSERT INTO books VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10) RETURNING id",
      values: [
        id,
        tittle,
        published,
        author,
        genre,
        format,
        isbn,
        description,
        book_image_url,
        created_at,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Book gagal ditambahkan");
    }
  }

  async getBooks() {
    const query = {
      text: "SELECT * FROM books",
    };

    const result = await this._pool.query(query);

    return result.rows.map(mapDBToModelBook);
  }
}

export default BooksService;
