import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const courseSchema = z.object({
    name: z.string().min(3, "Course name must be at least 3 characters."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    price: z.coerce.number().positive("Price must be a positive number."),
    imageUrl: z.string().url("Image URL must be a valid URL."),
    categoryId: z.string().uuid("Please select a valid category."),
});

const categories = [
    { id: "B52FE623-0B28-46DD-88C2-983A0C724990", name: "Software Development" },
    { id: "A4CFE623-1B45-46DD-99C2-983A0C724221", name: "Design" },
    { id: "C3D4E623-0B28-99DD-11C2-983A0C724322", name: "Health and Fitness" },
    { id: "D52FE111-0B28-22DD-55C2-983A0C724933", name: "Music" }
];

type CourseFormValues = z.infer<typeof courseSchema>;

interface CourseFormProps {
    courseId?: string;
}

export default function CourseForm({ courseId }: CourseFormProps) {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<CourseFormValues>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            imageUrl: "https://via.placeholder.com/150",
            categoryId: "",
        }
    });

    const { data: courseData, isLoading } = useQuery({
        queryKey: ["course", courseId],
        queryFn: async () => {
            const response = await axiosPrivate.get(`/courses/${courseId}`);
            return response.data;
        },
        enabled: !!courseId,
    });

    useEffect(() => {
        if (courseData) {
            setValue("name", courseData.name);
            setValue("description", courseData.description);
            setValue("price", courseData.price);
            setValue("imageUrl", courseData.imageUrl);
            setValue("categoryId", courseData.category.id);
        }
    }, [courseData, setValue]);

    const mutation = useMutation({
        mutationFn: async (data: CourseFormValues) => {
            if (courseId) {
                return axiosPrivate.put(`/courses`, {...data, id: courseId});
            }
            return axiosPrivate.post("/courses", data);
        },
        onSuccess: () => {
            toast({
                title: courseId ? "Course Updated!" : "Course Created!",
                description: "The course was successfully processed.",
            });
            navigate("/instructor/dashboard");
            reset();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: "Operation Failed",
                description: error.response?.statusText || "An error occurred.",
            });
        }
    });

    const onSubmit = (data: CourseFormValues) => mutation.mutate(data);

    return (
        <div className="max-w-lg mx-auto p-8 space-y-6">
            <h1 className="text-3xl font-bold">{courseId ? "Edit Course" : "Create a New Course"}</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input placeholder="Course Name" {...field} />}
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <Input placeholder="Course Description" {...field} />}
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                <Controller
                    name="price"
                    control={control}
                    render={({ field }) => <Input type="number" placeholder="Price" {...field} />}
                />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}

                <Controller
                    name="imageUrl"
                    control={control}
                    render={({ field }) => <Input placeholder="Image URL" {...field} />}
                />
                {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}

                <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
                <Button type="submit" className="w-full" disabled={mutation.isPending || isLoading}>
                    {mutation.isPending ? "Processing..." : courseId ? "Update Course" : "Create Course"}
                </Button>
            </form>
        </div>
    );
}
