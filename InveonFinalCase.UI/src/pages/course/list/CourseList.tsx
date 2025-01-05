// components/CourseList.tsx
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { CourseItem, CourseItemProps } from './components/CourseItem';
import { Pagination } from '@/components/Pagination';
import { Loading } from '@/components/Loading';
import axios from '@/api/axios';
import ErrorPage from '@/components/Error';
import { categories } from '@/components/Header';
import CategoryFilter from './components/CategoryFilter';

const PAGE_SIZE = 4;

const CourseList = () => {
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    const fetchCourses = async (page: number, pageSize: number, categoryId?: string) => {
        const response = await axios.get(`/courses`, {
            params: {
                page,
                pageSize,
                categoryId
            }
        });
        return response.data;
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setPage(1);
    };

    const { data, isLoading, error, isError, refetch } = useQuery({
        queryKey: ["courses", page, PAGE_SIZE, selectedCategory],
        queryFn: () => fetchCourses(page, PAGE_SIZE, selectedCategory),
        retry: 1
    });

    if (isLoading) return <Loading />;
    if (isError) return <ErrorPage message={error.message} onRetry={refetch} />;

    return (
        <div className="p-8 space-y-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1 space-y-4 border-r border-border pr-6 hidden md:block">
                <h2 className="text-xl font-semibold">Categories</h2>
                <ul className="space-y-2">
                {categories.map((category) => (
                    <CategoryFilter
                        category={category}
                        selectedCategory={selectedCategory}
                        handleCategoryChange={handleCategoryChange}
                    />
                ))}
                </ul>
            </div>
            <div className="md:col-span-3 space-y-4">
                {data?.items.map((course: CourseItemProps) => (
                    <CourseItem key={course.id} {...course} />
                ))}
                <Pagination
                    currentPage={data.currentPage}
                    totalPages={Math.ceil(data.totalCount / PAGE_SIZE)}
                    onPageChange={setPage}
                />
            </div>
            <div className="block md:hidden space-y-4">
                <h2 className="text-xl font-semibold">Filter by Category</h2>
                <ul className="space-y-2">
                    {categories.map(category => (
                        <li key={category.id}>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategory === category.id}
                                    onChange={() =>
                                        setSelectedCategory(selectedCategory === category.id ? undefined : category.id)
                                    }
                                />
                                <span>{category.name}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CourseList;
