import useAuth from "@/hooks/useAuth";
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

export interface CourseItem {
    id: string;
    name: string;
    instructor: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    category: {
        id: string;
        name: string;
    };
}

interface CartContextType {
    cart: CourseItem[];
    addToCart: (course: CourseItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalAmount: number;
    isInCart: (courseId: string) => boolean;
    setPendingItem: React.Dispatch<React.SetStateAction<CourseItem | null>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const { isAuthenticated } = useAuth();

    const [cart, setCart] = useState<CourseItem[]>([]);
    const [pendingItem, setPendingItem] = useState<CourseItem | null>(null);

    const addToCart = useCallback((course: CourseItem) => {
        const alreadyInCart = cart.find((item) => item.id === course.id);
        if (alreadyInCart) {
            alert(`${course.name} is already in your cart!`);
            return;
        }
        setCart((prev) => [...prev, course]);
    }, [cart]);

    useEffect(() => {
        if(isAuthenticated && pendingItem){
            addToCart(pendingItem);
            setPendingItem(null);
        }
    }, [isAuthenticated, pendingItem, addToCart]);

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (courseId: string) => cart.some((item) => item.id === courseId);

    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

    const contextValue = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalAmount,
        isInCart,
        setPendingItem
    };

    return (
        <CartContext.Provider value={{ ...contextValue }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
