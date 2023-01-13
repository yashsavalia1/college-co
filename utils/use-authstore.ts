import { useContext } from 'react';
import { AuthContext } from '../pages/_app';

const useAuthStore = () => useContext(AuthContext);

export default useAuthStore;
