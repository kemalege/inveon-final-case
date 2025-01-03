// components/CourseList.tsx
import React, { useState } from 'react';
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { CourseItem, CourseItemProps } from './components/CourseItem';
import { Pagination } from '@/components/Pagination';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { Loading } from '@/components/Loading';

const PAGE_SIZE = 4;

const CourseList = () => {
    const [page, setPage] = useState(1);

    const axiosPrivate = useAxiosPrivate();

    const fetchCourses = async (page: number, pageSize: number, categoryId?: string) => {
        const response = await axiosPrivate.get(`/courses`, {
            params: {
                page,
                pageSize,
                categoryId
            }
        });
        return response.data;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["courses", page, PAGE_SIZE],
        queryFn: () => fetchCourses(page, PAGE_SIZE),
        placeholderData: keepPreviousData,
        retry: 1 
    });

    if (isLoading) return <Loading />;
    if (error) return <p>Error loading courses!</p>;

    return (
        <div className="p-8 space-y-4 max-w-5xl mx-auto">
            {data?.items.map((course: CourseItemProps) => (
                <CourseItem key={course.id} {...course} />
            ))}

            <Pagination
                currentPage={data.currentPage}
                totalPages={Math.ceil(data.totalCount / PAGE_SIZE)}
                onPageChange={setPage}
            />
        </div>
    );
}

export default CourseList;
