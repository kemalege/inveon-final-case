
import React from 'react';

interface Category {
    id: string;
    name: string;
}

interface CategoryFilterProps {
    category: Category;
    selectedCategory: string | undefined;
    handleCategoryChange: (id: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ category, selectedCategory, handleCategoryChange }) => {
    return (
        <li key={category.id}>
            <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={selectedCategory === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                />
                <span>{category.name}</span>
            </label>
        </li>
    );
};

export default CategoryFilter;
