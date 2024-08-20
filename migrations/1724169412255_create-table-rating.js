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
  pgm.createTable("ratings", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    book_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    rating: {
      type: "INTEGER",
      notNull: true,
    },
  });

  pgm.addConstraint(
    "ratings",
    "fk_ratings.user_id_users.id",
    "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE"
  );

  pgm.addConstraint(
    "ratings",
    "fk_ratings.book_id_books.id",
    "FOREIGN KEY(book_id) REFERENCES books(id) ON DELETE CASCADE"
  );

  pgm.addConstraint(
    "ratings",
    "chk_ratings_valid_values",
    "CHECK (rating IN (1, 2, 3, 4, 5))"
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("ratings");
};
