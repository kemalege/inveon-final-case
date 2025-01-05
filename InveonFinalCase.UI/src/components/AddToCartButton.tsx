import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import { CourseItem, useCart } from '@/pages/cart/context/CartContext';
import useAuth from '@/hooks/useAuth';

const AddToCartButton = ({course}: {course: CourseItem}) => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart, isInCart, setPendingItem} = useCart();
    

    const addItemToCart = () => {
        if(isAuthenticated) {
            addToCart(course);
        } else{
            setPendingItem(course);
            navigate("/login");
        }
    }

    const buttonContext = isInCart(course.id) ? (
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