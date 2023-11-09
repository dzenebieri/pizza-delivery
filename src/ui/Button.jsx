import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base = 'inline-block rounded-full bg-yellow-400 text-stone-800 font-semibold text-sm uppercase ring-stone-800 ring-2 ring-inset disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm hover:shadow-yellow-700 active:shadow-none';

  const styles = {
    primary: base + ' px-5 py-2',
    small: base + ' px-6 py-2 text-xs',
    round: base + ' px-2.5 py-1',
    secondary: ' inline-block rounded-full text-stone-500 font-semibold text-sm uppercase ring-stone-500 ring-2 ring-inset py-2 px-5 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 active:shadow-sm active:shadow-stone-800 disabled:cursor-not-allowed',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
