import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';

interface AuthContextType {
    user: User | null;
    login: (email: string, pass: string) => boolean;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
    changePassword: (currentPass: string, newPass: string) => boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem('kcqa_user');
        if (stored) {
            try {
                const parsedUser = JSON.parse(stored);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...safeUser } = parsedUser;
                return safeUser;
            } catch (e) {
                return null;
            }
        }
        return null;
    });

    const login = (email: string, pass: string) => {
        // 1. Check Mock Users
        const foundMock = MOCK_USERS.find(u => u.email === email && u.password === pass);

        // 2. Check LocalStorage (if user changed password previously in this browser session)
        const stored = localStorage.getItem('kcqa_user');
        let foundStored = null;
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.email === email && parsed.password === pass) {
                foundStored = parsed;
            }
        }

        const found = foundStored || foundMock;

        if (found) {
            // Store the FULL object (including password) in LS so we can verify "Current Password" later
            localStorage.setItem('kcqa_user', JSON.stringify(found));

            // Remove password from React State for security
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...safeUser } = found;
            setUser(safeUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('kcqa_user');
    };

    const updateUser = (updates: Partial<User>) => {
        const stored = localStorage.getItem('kcqa_user');
        if (stored && user) {
            const currentFullUser = JSON.parse(stored);
            const updatedFullUser = { ...currentFullUser, ...updates };

            // Update State
            setUser({ ...user, ...updates });
            // Update Storage
            localStorage.setItem('kcqa_user', JSON.stringify(updatedFullUser));
        }
    };

    const changePassword = (currentPass: string, newPass: string): boolean => {
        const stored = localStorage.getItem('kcqa_user');
        if (!stored) return false;

        const currentFullUser = JSON.parse(stored);

        // Verify old password
        if (currentFullUser.password !== currentPass) {
            return false;
        }

        // Update password
        const updatedFullUser = { ...currentFullUser, password: newPass };
        localStorage.setItem('kcqa_user', JSON.stringify(updatedFullUser));
        return true;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};
