// lib/auth.ts  
import { sql } from './db';
import { hash, compare } from 'bcryptjs';

export const authService = {
  async register(name: string, email: string, password: string) {
    const hashedPassword = await hash(password, 12);
    const newUser = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING id, name, email
    `;
    const user = { id: newUser[0].id, name: newUser[0].name, email: newUser[0].email };
    authService.setUser(user);
    return user;
  },
  async login(email: string, password: string) {
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (users.length === 0) throw new Error('User not found');
    const user = users[0];
    const isValid = await compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');
    const userObj = { id: user.id, name: user.name, email: user.email };
    authService.setUser(userObj);
    return userObj;
  },
  getUser() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  },
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem('user');
  }
};
