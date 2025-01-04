import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Loading } from "@/components/Loading";
import ErrorPage from "@/components/Error";
import useAuth from "@/hooks/useAuth";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router";

type Course = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: {
        id: string;
        name: string;
    };
};

export default function InstructorPanel() {
    const axiosPrivate = useAxiosPrivate();
    const { getDecodedToken } = useAuth();
    const token = getDecodedToken();
    const instructorId = token?.sub;

    const { data: courses, isLoading, error } = useQuery({
        queryKey: ["instructorCourses", instructorId],
        queryFn: async () => {
            const response = await axiosPrivate.get(`/courses/instructor/${instructorId}`);
            return response.data;
        },
        enabled: !!instructorId,
    });

    if (isLoading) return <Loading />;
    if (error) return <ErrorPage />;

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
                <Link to="/instructor/course/create">
                    <Button variant="default" size="sm">
                        Create New Course
                    </Button>
                </Link>
            </div>

            {courses?.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Course Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course: Course) => (
                            <TableRow key={course.id}>
                                <TableCell>{course.name}</TableCell>
                                <TableCell>{course.category.name}</TableCell>
                                <TableCell>₺{course.price.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Link to={`/instructor/course/${course.id}/edit`}>
                                        <Button variant="outline" size="sm">
                                            <PencilIcon className="w-4 h-4 mr-1" /> Edit
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-muted-foreground">No courses found.</p>
            )}
        </div>
    );
}
