/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("books", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    tittle: {
      type: "TEXT",
      notNull: true,
    },
    published: {
      type: "TEXT",
      notNull: true,
    },
    author: {
      type: "TEXT",
      notNull: true,
    },
    genre: {
      type: "TEXT",
      notNull: true,
    },
    format: {
      type: "TEXT",
      notNull: true,
    },
    isbn: {
      type: "TEXT",
      notNull: true,
    },
    description: {
      type: "TEXT",
      notNull: true,
    },
    bookURL: {
      type: "TEXT",
      notNull: true,
    },
    book_image_url: {
      type: "TEXT",
      notNull: true,
    },
    ratingtotal: {
      type: "NUMERIC",
      default: 0,
    },
    created_at: {
      type: "TEXT",
      notNull: true,
    },
    updated_at: {
      type: "TEXT",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("books");
};
