import { createContext, useContext, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "@/api/axios";

export type Category = {
    id: string;
    name: string;
};

interface CategoryContextType {
    categories: Category[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: Category | null;
    setSelectedCategory: (category: Category | null) => void;
    isLoading: boolean;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const fetchCategories = async (): Promise<Category[]> => {
        const response = await axios.get(`/categories`);
        return response.data;
    };

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
        retry: 2,
    });

    return (
        <CategoryContext.Provider value={{ categories, selectedCategory, setSelectedCategory, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = (): CategoryContextType => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context;
};
