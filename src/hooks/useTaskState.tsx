import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export const useTaskState = () => {
  return useSelector((state: RootState) => state.taskProvider);
};
