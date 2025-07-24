import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!isAuthenticated) return <p>Please log in.</p>;

  return (
    <div className="p-4">
      <h2>Welcome, {user.name}</h2>
      <button onClick={() => dispatch(logout())} className="mt-2 bg-red-500 text-white px-4 py-2">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
