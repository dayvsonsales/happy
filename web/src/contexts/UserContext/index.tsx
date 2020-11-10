import React, { createContext, useContext, useState } from "react";

import api from "../../services/api";

interface User {
  name: string | null;
  email: number | null;
  password?: string | null;
  remember?: boolean;
}

interface UserContextData {
  user: User | null;
  updateUser({ name, email }: User): Promise<void>;
  login({ email, password }: User): Promise<void>;
  logout(): Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  async function login({ email, password, remember }: User) {
    try {
      const { data: user } = await api.post("/login", { email, password });

      setUser(user);

      if (remember) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (e) {
      throw new Error("Email or password is invalid");
    }
  }

  async function logout() {
    setUser(null);
  }

  async function updateUser({ name, email }: User) {
    setUser({
      name,
      email,
    });
  }

  return (
    <UserContext.Provider value={{ user, updateUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);

  return context;
}
