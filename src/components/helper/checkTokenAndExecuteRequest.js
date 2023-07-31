import { store } from "../../App/store";
import { signOut } from "../../redux/authSlice";
import { toast } from "react-toastify";

export const checkTokenAndExecuteRequest = async (requestFn) => {
  const token = localStorage.getItem('token');

  if (!token) {
    store.dispatch(signOut());
    toast.error('You are not authorized!');
    return;
  }

  try {

    await requestFn();
  } catch (error) {
    if (error.message === 'User not authenticated') {
      toast.error('You are not authorized!');
      store.dispatch(signOut());
    } else {
      console.error('Error executing request:', error);
    }
  }
};
