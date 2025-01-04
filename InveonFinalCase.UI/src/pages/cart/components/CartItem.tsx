import { Button } from "@/components/ui/button";
import { CourseItem } from "../context/CartContext";
import { TagIcon } from "lucide-react";

export interface CartItemProps {
  item: CourseItem;
  removeFromCart: (id: string) => void;
}

export default function CartItem({ item, removeFromCart }: CartItemProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 border-b border-border pb-4 last:border-none">
      <img
        src={item.imageUrl ?? "/assets/default-course.jpg"}
        alt={item.name}
        className="w-36 h-24 object-cover"
      />

      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-base md:text-lg font-semibold">{item.name}</h2>
        <p className="text-sm text-muted-foreground">
          Instructor: {item.instructor}
        </p>
      </div>

      <div className="flex flex-col items-end">
        <div className="text-purple-600 text-base md:text-lg font-bold items-center">
          ₺{item.price.toFixed(2)}
          <TagIcon className="inline w-4 h-4 ml-1 text-purple-600/80" />
        </div>
        <Button
          variant="link"
          className="text-foreground p-0 h-auto mb-1"
          onClick={() => removeFromCart(item.id)}
        >
          Kaldır
        </Button>
      </div>
    </div>
  );
}
