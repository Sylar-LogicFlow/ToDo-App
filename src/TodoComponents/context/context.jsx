import { createContext, useReducer, useContext } from "react";
import Reducers from "../ReducerCoMp";

export const ContextProvider = createContext([]);

//Use Reducer
export const TodosContext = createContext([]);
export const DispatchContext = createContext([]);

const Providers = ({ children }) => {
  const [Todos, dispatch] = useReducer(Reducers, []);

  return (
    <TodosContext.Provider value={Todos}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export default Providers;

export const useTodos = () => {
  return useContext(TodosContext);
};

export const usedispatch = () => {
  return useContext(DispatchContext);
};
