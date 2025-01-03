import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { useNavigate } from "react-router";
import { AddToCartHoverCard } from "./AddToCartHoverCard";

export interface CourseItemProps {
    id: string;
    name: string;
    instructor: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    category: {
        id: string;
        name: string;
    };
}

export function CourseItem({ id, name, instructor, description, price, imageUrl, category }: CourseItemProps) {

    const navigate = useNavigate();

    return (
        <HoverCard>
            <div className="flex w-full pb-4 gap-4 border-b border-border last:border-none" onClick={() => navigate(`/course/${id}`)}>
                <HoverCardTrigger asChild>
                    <div className="flex cursor-pointer gap-4 flex-1">
                        <img
                            src={imageUrl ?? "/assets/default-course.jpg"}
                            alt={name}
                            className="w-48 h-36 object-cover"
                        />
                        <div className="flex flex-col flex-1">
                            <h2 className="text-lg font-semibold text-foreground">{name}</h2>
                            <p className="text-muted-foreground text-sm">{instructor}</p>
                            <p className="text-muted-foreground text-sm mt-2">{description}</p>
                            <p className="text-xs text-primary mt-2">Category: {category.name}</p>
                        </div>
                        <div className="flex flex-col justify-start items-end">
                            <p className="font-bold text-primary">{price.toFixed(2)}₺</p>
                        </div>
                    </div>
                </HoverCardTrigger>
            </div>
            <AddToCartHoverCard summary={description} />
        </HoverCard>
    );
}



