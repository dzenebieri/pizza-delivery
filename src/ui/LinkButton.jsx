import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to, type }) {
  const navigate = useNavigate();
  const styles = {
    eCart: 'font-semibold text-blue-500 transition-all duration-500 hover:text-blue-600 hover:underline',
    cart: 'inline-flex p-2 shadow shadow-blue-500 rounded-lg text-base text-blue-500 transition-all duration-500 hover:bg-blue-100 hover:text-blue-600 hover:shadow-blue-600 active:shadow-none',
  };

  if (to === '-1')
    return (
      <button className={styles[type]} onClick={() => navigate(-1)}>{children}</button>
    );

  return (
    <Link to={to} className={styles[type]}>{children}</Link>
  );
}

export default LinkButton;
