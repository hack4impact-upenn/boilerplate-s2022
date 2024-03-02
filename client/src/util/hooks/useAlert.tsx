import { useContext } from 'react';
import AlertContext from '../context/AlertContext.tsx';

const useAlert = () => useContext(AlertContext);

export default useAlert;
