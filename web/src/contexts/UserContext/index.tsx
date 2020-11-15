import React, { createContext, useContext, useState } from "react";

import api from "../../services/api";

interface User {
  name: string | null;
  email: string | null;
  password?: string | null;
  remember?: boolean;
  token?: string;
}

interface UserContextData {
  user: User | null;
  updateUser({ name, email }: User): Promise<void>;
  login({ email, password, remember }: Omit<User, "name">): Promise<void>;
  resetPassword({
    token,
    password,
  }: Omit<User, "name" | "email">): Promise<void>;
  requestResetPassword({ email }: Omit<User, "name">): Promise<void>;
  logout(): Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const _user = localStorage.getItem("user") || sessionStorage.getItem("user");
  const parsedUser = JSON.parse(_user as string) as User;
  const [user, setUser] = useState<User | null>(parsedUser || null);

  if (parsedUser) {
    const { token } = parsedUser;
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  async function login({ email, password, remember }: Omit<User, "name">) {
    try {
      const { data: user } = await api.post("/login", { email, password });

      const { token } = user;
      api.defaults.headers.Authorization = `Bearer ${token}`;

      if (remember) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      setUser(user);
    } catch (e) {
      throw new Error("Email or password is invalid");
    }
  }

  async function resetPassword({
    token,
    password,
  }: Omit<User, "name" | "email">) {
    try {
      await api.post(`/reset-password/${token}`, { password });
    } catch (e) {
      throw new Error("Can't reset password");
    }
  }

  async function requestResetPassword({ email }: Omit<User, "name">) {
    try {
      await api.post("/request-reset", { email });
    } catch (e) {
      throw new Error("Request reset password can't be done");
    }
  }

  async function updateUser({ name, email }: User) {
    setUser({
      name,
      email,
    });
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  }

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        login,
        logout,
        resetPassword,
        requestResetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);

  return context;
}
