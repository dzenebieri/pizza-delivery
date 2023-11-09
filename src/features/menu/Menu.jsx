import MenuItem from './MenuItem';
import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="px-2 divide-y divide-stone-400">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
