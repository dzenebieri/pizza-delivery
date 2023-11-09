import OrderItem from './OrderItem';
import UpdateOrder from './UpdateOrder';
import { getOrder } from '../../services/apiRestaurant';
import { formatCurrency, formatDate, } from '../../utils/helpers';
import { useFetcher, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  const { id, priority, cart } = order;
  const orderPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const priorityPrice = priority ? orderPrice * 0.2 : 0;
  const totalPrice = orderPrice + priorityPrice;
  const currentTime = new Date();
  const estimatedDeliveryTime = new Date(currentTime.getTime() + 2 * 60000);
  const [remainingTime, setRemainingTime] = useState(2);

  function updateRemainingTime() {
    setRemainingTime((prevRemainingTime) => (prevRemainingTime > 0 ? prevRemainingTime - 1 : 0));
  }

  useEffect(() => {
    const intervalId = setInterval(updateRemainingTime, 60000);
    return () => clearInterval(intervalId);
  }, [remainingTime]);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/pizza-delivery/menu');
  },
    [fetcher]
  );

  return (
    <div className="space-y-8 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-lg font-semibold">Checkout status of the order #{id}</p>

        <div className="space-x-2">
          {priority && (
            <span className="px-3.5 py-1.5 rounded-full bg-red-500 text-xs font-semibold uppercase tracking-wide text-red-50 sm:text-sm">
              Priority
            </span>
          )}
          <span className="px-3.5 py-1.5 rounded-full bg-green-500 text-xs font-semibold uppercase tracking-wide text-green-50 sm:text-sm">
            Preparing order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between rounded-lg border border-[#50C4D9] bg-[#EDFDFF] bg-gradient-to-br from-[#EDFDFF] to-[#C8F3FA] gap-2 px-6 py-5">
        {remainingTime > 0 ? (
          <p className="font-medium text-sm">
            Only  {remainingTime} {remainingTime === 1 ? 'minute' : 'minutes'} left
          </p>
        ) : (
          <p className="font-medium text-sm">
            It's time to pick up! Your 🍕 has been delivered.
          </p>
        )}
        <p className="text-xs text-stone-500">
          Estimated delivery: {formatDate(estimatedDeliveryTime)}
        </p>
      </div>

      <ul className="divide-y divide-stone-400 border-stone-400 border-t border-b">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={fetcher?.data?.find((el) => el.id === item.pizzaId)?.ingredients ?? []}
          />
        ))}
      </ul>

      <div className="space-y-2 py-5 px-6 rounded-lg border border-[#50C4D9] bg-[#EDFDFF] bg-gradient-to-br from-[#EDFDFF] to-[#C8F3FA]">
        <p className='text-lg font-semibold'>Order Summary</p>
        <p className="text-sm font-medium text-stone-600">
          Pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-lg font-bold">
          Total: {formatCurrency(totalPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
