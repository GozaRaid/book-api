import pkg from "pg";
const { Pool } = pkg;
import { nanoid } from "nanoid";
import InvariantError from "../../exceptions/InvariantError.js";
import AuthenticationError from "../../exceptions/AuthenticationError.js";
import bcrypt from "bcrypt";

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, email, password }) {
    await this.verifyNewUsername(username);
    await this.verifyNewEmail(email);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const created_at = new Date().toISOString();
    const query = {
      text: "INSERT INTO users (id, username, email, displayname, password, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $6) RETURNING id",
      values: [id, username, email, username, hashedPassword, created_at],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("User gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = {
      text: "SELECT username FROM users WHERE username = $1",
      values: [username],
    };
    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError(
        "Gagal menambahkan user. Username sudah digunakan."
      );
    }
  }

  async verifyNewEmail(email) {
    const query = {
      text: "SELECT email FROM users WHERE email = $1",
      values: [email],
    };
    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError(
        "Gagal menambahkan user. Email sudah digunakan."
      );
    }
  }

  async getUserById(id) {
    const query = {
      text: "SELECT id, username, email, fullname FROM users WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError("User tidak ditemukan");
    }

    return result.rows[0];
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: "SELECT id, password FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new AuthenticationError("Username yang anda masukkan salah");
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError("Password yang anda masukkan salah");
    }

    return id;
  }
}

export default UsersService;
