import { ShoppingCart } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Order } from "../types";
import { Link } from "react-router";

interface OrderItemProps {
  order: Order;
}

export default function OrderItem({ order }: OrderItemProps) {
  return (
    <Accordion type="single" collapsible className="border-b border-border">
      <AccordionItem value={order.id}>
        <AccordionTrigger className="flex w-full items-center justify-between py-4 gap-6">
          {/* Left Section (Cart Icon and Courses Info) */}
          <div className="flex items-center space-x-4 w-2/5">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <div className="flex flex-col items-start">
                  <p className="font-medium">{order.orderItems.length} courses purchased</p>
                  <p className="text-primary text-sm underline cursor-pointer">
                      View All Courses
                  </p>
              </div>
          </div>

          {/* Date */}
          <span className="w-1/5 text-left self-center">{new Date(order.orderDate).toLocaleDateString()}</span>

          {/* Total Price */}
          <span className="w-1/5 font-semibold text-primary text-left self-center">
              ₺{order.totalAmount.toFixed(2)}
          </span>

          {/* Payment Method */}
          <span className="w-1/5 text-muted-foreground text-left self-center">
              {order.payment.cardType} ****{order.payment.last4Digits}
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 px-8 pb-6">
        {order.orderItems.map((item) => (
          <div key={item.courseId} className="flex justify-between items-center border-t border-border pt-2">
              <Link
                  to={`/course/${item.courseId}`}
                  className="font-medium text-primary hover:underline cursor-pointer"
              >
                  {item.courseName}
              </Link>

              <span className="text-primary font-semibold self-center">
                  ₺{item.price.toFixed(2)}
              </span>
          </div>
        ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

