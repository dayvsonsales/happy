import React, { createContext, useContext, useState } from 'react';

interface User {
    name: string | null;
    age: number | null;
    girlfriend_name?: string | null;
}

interface UserContextData {
    user: User | null;
    updateUser({ name, age, girlfriend_name }: User): Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    async function updateUser({ name, age, girlfriend_name }: User){
        setUser({
            name,
            age,
            girlfriend_name
        });
    }

    return (
        <UserContext.Provider value={{ user, updateUser }} >
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext);

    return context;
};