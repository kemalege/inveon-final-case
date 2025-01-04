import { useParams } from "react-router";
import CourseForm from "./components/CourseForm";

export default function EditCourse() {
    const { courseId } = useParams<{ courseId: string }>();

    return (
        <div className="max-w-3xl mx-auto p-8">
            <CourseForm courseId={courseId} />
        </div>
    );
}
