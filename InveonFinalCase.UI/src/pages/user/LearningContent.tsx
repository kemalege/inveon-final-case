import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import CourseCard from "./components/CourseCard";
import ErrorPage from "@/components/Error";

interface Course {
    id: string;
    name: string;
    instructor: string;
    description: string;
    price: number;
    imageUrl: string | null;
    category: { id: string; name: string };
}


export default function LearningContent() {
    const { getDecodedToken } = useAuth();
    const axiosPrivete = useAxiosPrivate();
    const token = getDecodedToken();
    const userId = token?.sub;

    const { data: courses, isLoading, error, isError } = useQuery<Course[]>({
        queryKey: ["purchasedCourses", userId],
        queryFn: () => getPurchasedCourses(userId as string),
        enabled: !!userId,
        retry: 2,
    });

    const getPurchasedCourses = async (userId: string) => {
        if (!userId) throw new Error("User ID is required");
        const response = await axiosPrivete.get(`/courses/user/${userId}/purchased`);
        return response.data;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isError) return <ErrorPage message={(error as any).response.data.title} />;

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className="h-[200px] w-full" />
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">My Learning Content</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {courses?.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}
