import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { CourseItem, CourseItemProps } from './components/CourseItem';
import { Pagination } from '@/components/Pagination';
import { Loading } from '@/components/Loading';
import axios from '@/api/axios';
import ErrorPage from '@/components/Error';
import CategoryFilter, { Category } from './components/CategoryFilter';
import { useCategory } from '@/context/category-provider';

const PAGE_SIZE = 4;

const CourseList = () => {
    const [page, setPage] = useState(1);

    const { categories, searchTerm, selectedCategory, setSelectedCategory} = useCategory();

    const fetchCourses = async (page: number, pageSize: number, categoryId?: string, searchTerm?: string) => {
        const response = await axios.get(`/courses`, {
            params: {
                page,
                pageSize,
                categoryId,
                searchTerm
            }
        });
        return response.data;
    };

    const handleCategoryChange = (category: Category | null) => {
        setSelectedCategory(category);
        setPage(1);
    };

    const { data, isLoading, error, isError, refetch } = useQuery({
        queryKey: ["courses", page, PAGE_SIZE, selectedCategory, searchTerm],
        queryFn: () => fetchCourses(page, PAGE_SIZE, selectedCategory?.id, searchTerm),
        retry: 1
    });

    if (isLoading) return <Loading />;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isError) return <ErrorPage message={(error as any).response.data.title} onRetry={refetch} />;

    return (
        <div className="p-8 space-y-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1 space-y-4 border-r border-border pr-6 hidden md:block">
                <h2 className="text-xl font-semibold">Categories</h2>
                <ul className="space-y-2">
                {categories?.map((category: Category) => (
                    <CategoryFilter
                        key={category.id}
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
        </div>
    );
}

export default CourseList;
