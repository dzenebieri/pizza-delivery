import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import { clearCart, getCart } from './cartSlice';
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="p-8">
      <LinkButton to="/pizza-delivery/menu" type="cart"><span className="material-symbols-rounded pr-1">menu</span>Menu</LinkButton>

      <p className="mt-4 text-2xl font-semibold md:block hidden">Your Cart List</p>
      <p className="mt-4 text-2xl font-semibold capitalize md:hidden">Your cart list, {username}</p>

      <ul className="mt-1 divide-y divide-stone-400 border-b border-stone-400">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-3">
        <Button to="/pizza-delivery/order/new" type="primary">
          Order pizza
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
