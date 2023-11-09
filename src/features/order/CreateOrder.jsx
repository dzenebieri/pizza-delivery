import store from '../../store';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';
import { formatCurrency } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../services/apiRestaurant';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) => /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const { username, status: addressStatus, location, address, error: errorAddress, } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="p-8">
      <p className="mb-7 font-semibold text-sm md:text-lg">Confirm your order!</p>

      <Form method="POST">
        <div className="flex flex-col gap-3 mb-3 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Full Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="flex flex-col gap-3 mb-3 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone Number</label>
          <div className="grow">
            <input className="input w-full placeholder:text-[11px] placeholder:italic md:placeholder:text-xs" name="phone" type="number" placeholder='+39 081 123 4567' required />
            {formErrors?.phone && (
              <p className="rounded-lg p-2.5 mt-2.5 text-xs text-red-700 bg-red-100">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col relative gap-3 mb-4 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow relative">
            <input
              className="input w-full !pr-[140px] placeholder:text-[11px] placeholder:italic md:placeholder:text-xs"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              placeholder='Via Giambattista Marino, 80125 Napoli'
              required
            />
            {addressStatus === 'error' && (
              <p className="rounded-lg p-2.5 mt-2.5 text-xs text-red-700 bg-red-100">
                {errorAddress}
              </p>
            )}

            {!location.latitude && !location.longitude && (
              <span className="absolute z-30 right-[3px] top-[3px]">
                <Button
                  disabled={isLoadingAddress}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get Location
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="toggle mb-8 inline-flex items-center">
          <input
            id="priority"
            name="priority"
            type="checkbox"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className='gap-x-1 font-semibold text-sm md:text-lg'>Priority delivery</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="location"
            value={location.longitude && location.latitude ? `${location.latitude},${location.longitude}` : ''}
          />

          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting ? 'Ordering...' : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form >
    </div >
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = { ...data, cart: JSON.parse(data.cart), priority: data.priority === 'true', };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/pizza-delivery/order/${newOrder.id}`);
}

export default CreateOrder;
