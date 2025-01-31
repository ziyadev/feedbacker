import { create } from 'zustand';

interface Error {
  code: string;
}
interface ErrorsState {
  errors: Error[];
  addError: (by: Error) => void;
}

const useErrors = create<ErrorsState>()((set) => ({
  errors: [],
  addError: (err) => set((state) => ({ errors: [...state.errors, err] })),
}));

export default useErrors;
