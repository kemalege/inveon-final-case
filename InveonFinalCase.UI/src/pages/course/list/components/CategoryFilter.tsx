import React from 'react';

export type Category = {
    id: string;
    name: string;
};

interface CategoryFilterProps {
    category: Category;
    selectedCategory: Category | null;
    handleCategoryChange: (id: Category | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ category, selectedCategory, handleCategoryChange }) => {
    const isSelected = selectedCategory?.id === category.id;

    return (
        <li key={category.id}>
            <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCategoryChange(isSelected ? null : category)}
                />
                <span>{category.name}</span>
            </label>
        </li>
    );
};

export default CategoryFilter;
