import AddToCartButton from "@/components/AddToCartButton";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const CourseDetail = () => {
    const axiosPrivate = useAxiosPrivate();

    const fetchCourseById = async (id: string) => {
        const response = await axiosPrivate.get(`/courses/${id}`);
        return response.data;
    };

    const { courseId } = useParams<{ courseId: string }>();

    const { data, isLoading, error } = useQuery({
        queryKey: ["course", courseId],
        queryFn: () => fetchCourseById(courseId as string),
        enabled: !!courseId,
    });

    if (isLoading) return <Loading />;
    if (error) return <p>Error loading course details.</p>;

    const { name, description, instructor, category, price, imageUrl } = data;

    return (
        <div>
            <div className="w-full bg-zinc-900 text-white p-8 relative">
                <div className="max-w-5xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold">{name}</h1>
                <p className="text-lg">{description}</p>
                <p className="text-sm">
                    Created by <span className="font-semibold">{instructor}</span>
                </p>
                <p className="text-sm">Category: {category.name}</p>
                </div>
                <div className="
                    mt-4 md:mt-0 lg:mr-80 md:mr-0
                    md:absolute md:top-8 md:right-8
                    w-full md:w-[350px]
                    bg-card text-foreground p-0.5
                    shadow-lg
                "
                >
                    <img
                        src={imageUrl ?? "/assets/default-course.jpg"}
                        alt={name}
                        className="w-full object-cover"
                    />

                    <div className="text-right space-y-2 p-4">
                        <p className="text-lg font-semibold text-primary">
                        ₺{price.toFixed(2)}
                        </p>
                        <AddToCartButton course={data} />
                        <Button variant="outline" className="w-full">
                          Buy Now
                        </Button>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-border bg-card p-6 shadow-sm space-y-4">
                    <h2 className="text-xl font-semibold">What You'll Learn</h2>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Learn the fundamentals of {name}.</li>
                    <li>Master advanced concepts with hands-on projects.</li>
                    <li>Develop real-world projects using {category.name} technologies.</li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
