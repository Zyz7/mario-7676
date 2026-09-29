import { User } from "../types/user.type";

const users: User[] = [];

export const userRepository = {

  async findByEmail(email: string) {
    
    return users.find(user => user.email === email);
  },

  async findById(id: number) {

    return users.find(user => user.id === id);
  },

  async create(data: {name: string; email: string; password: string;}) {
    const user: User = {id: users.length + 1, ...data};
    users.push(user);

    return {id: user.id, name: user.name, email: user.email};
  }
};
