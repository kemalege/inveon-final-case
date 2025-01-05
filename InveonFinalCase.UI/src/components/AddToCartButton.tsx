import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import { CourseItem, useCart } from '@/pages/cart/context/CartContext';

const AddToCartButton = ({course}: {course: CourseItem}) => {

    const navigate = useNavigate();
    const { addToCart, isInCart} = useCart();

    const addItemToCart = () => {
        addToCart(course);
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