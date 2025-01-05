import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import { CourseItem, useCart } from '@/pages/cart/context/CartContext';
import useAuth from '@/hooks/useAuth';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';

const AddToCartButton = ({course}: {course: CourseItem}) => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart, isInCart, setPendingItem} = useCart();

    const axiosPrivate = useAxiosPrivate();

    const { getDecodedToken } = useAuth();
    const token = getDecodedToken();
    const userId = token?.sub;

    const fetchPurchasedCourses = async (userId?: string) => {
        const response = await axiosPrivate.get(`courses/user/${userId}/purchased`, {
        });
        return response.data;
    };

    const { data: purchasedCourses } = useQuery({
        queryKey: ["purchasedCourses"],
        queryFn: () => fetchPurchasedCourses(userId),
        enabled: !!userId,
        retry: 1
    });

    const hasPurchased = purchasedCourses?.some((purchasedCourse: { id: string }) => purchasedCourse.id === course.id);
    

    const addItemToCart = () => {
        if(isAuthenticated) {
            addToCart(course);
        } else{
            setPendingItem(course);
            navigate("/login");
        }
    }

    const buttonContext = hasPurchased ? (
        <Button className="w-full bg-gray-600 text-white" disabled>
          Go To Course
        </Button>
      ) : isInCart(course.id) ? (
        <Button
          className="w-full bg-purple-600 text-white"
          onClick={() => navigate("/cart")}
        >
          Go To Cart
        </Button>
      ) : (
        <Button className="w-full bg-purple-600 text-white" onClick={addItemToCart}>
          Add to Cart
        </Button>
      );

  return (
    buttonContext
  )
}

export default AddToCartButton