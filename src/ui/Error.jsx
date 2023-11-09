import LinkButton from './LinkButton';
import { useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className='flex flex-col gap-2 m-9 font-bold'>
      <p>Something went wrong</p>
      <p className="mt-1 mb-2">{error.data || error.message}</p>
      <LinkButton to="-1" type="cart"><span className="material-symbols-rounded pr-1">arrow_back</span>Go Back</LinkButton>
    </div>
  );
}

export default Error;
