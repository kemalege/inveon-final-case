export interface OrderItem {
    courseId: string;
    courseName: string;
    courseDescription: string;
    price: number;
}

export interface PaymentInfo {
    cardType: string;
    last4Digits: string;
    amount: number;
}

export interface Order {
    id: string;
    orderDate: string;
    totalAmount: number;
    orderItems: OrderItem[];
    payment: PaymentInfo;
}
