import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '../firebaseConfig';

interface AuthContextValue {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    loading: true,
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                console.log('Persistence set to browserLocalPersistence');
            })
            .catch(error => {
                console.error('Error setting persistence:', error);
            });

        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('AuthContext: onAuthStateChanged fired, currentUser =', currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
