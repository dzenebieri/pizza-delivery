import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center p-16">
      <span className="mb-4 font-semibold">Your Cart is empty.</span>
      <LinkButton to="/pizza-delivery/menu" type="eCart">Shop today's deals</LinkButton>
    </div>
  );
}

export default EmptyCart;
