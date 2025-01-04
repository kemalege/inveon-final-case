import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface Course {
    id: string;
    name: string;
    instructor: string;
    description: string;
    price: number;
    imageUrl: string | null;
    category: { id: string; name: string };
}

export default function CourseCard({ course }: { course: Course }) {
    return (
        <Card className="relative overflow-hidden rounded-none">
            <div className="w-full h-40 bg-muted flex items-center justify-center">
                <img
                    src={course.imageUrl ?? "/assets/default-course.jpg"}
                    alt={course.name}
                    className="object-cover w-full h-full"
                />
            </div>

            <CardContent className="p-4 space-y-1">
                <h2 className="text-lg font-semibold">{course.name}</h2>
                <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                <p className="text-sm text-muted-foreground">Category: {course.category.name}</p>
            </CardContent>

            {/* <CardFooter className="p-4 flex justify-end">
                <Button variant="default">Start Course</Button>
            </CardFooter> */}
            <Button
                variant="ghost"
                className="absolute top-2 right-2 p-2"
                size="icon"
            >
                <MoreHorizontal className="w-5 h-5" />
            </Button>
        </Card>
    );
}
