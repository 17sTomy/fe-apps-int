import { getAccountInfo, login } from '../services/authService.js';
import { useDispatch } from 'react-redux';
import { setAccount } from '../store/slice/accountSlice.js';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      // TODO: remove and replace with the corresponding user data. Mocked to test the connection with backend.
      const data = {
        email: 'matias@gmail.com',
        password: '123456aA',
      };
      const loginResponse = await login(data);
      localStorage.setItem('token', loginResponse.token);

      const infoResponse = await getAccountInfo();
      dispatch(setAccount(infoResponse));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button onClick={onLogin}>Login</button>
    </>
  );
};
