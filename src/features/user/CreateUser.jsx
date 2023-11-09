import Button from '../../ui/Button';
import { useState } from 'react';
import { updateName } from './userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;
    dispatch(updateName(username));
    navigate('/pizza-delivery/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-sm text-stone-600 md:text-base">
        👋 Welcome! Please sign in to continue
      </p>

      <input
        className="input w-64 mt-6 mb-4 cc placeholder:!normal-case"
        placeholder="Enter username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
