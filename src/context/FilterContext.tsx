/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
  useState,
} from "react";

interface IFilterState {
  state: { type: string };
  dispatch: React.Dispatch<IAction>;
  selectedFilterOption: string;
}

type IAction = { type: string; payload: Record<string, string> };

export const FilterContext = createContext<IFilterState>({} as IFilterState);

export const FilterContextProvider = (props: PropsWithChildren) => {
  const [selectedFilterOption, setSelectedFilterOption] = useState("All");

  const reducer = (state: Record<string, string>, action: IAction) => {
    switch (action.type) {
      case "All":
        setSelectedFilterOption("All");
        return { type: "All" };

      case "Pending":
        setSelectedFilterOption("Pending");
        return { type: "Pending" };

      case "Draft":
        setSelectedFilterOption("Draft");
        return { type: "Draft" };

      case "Paid":
        setSelectedFilterOption("Paid");
        return { type: "Paid" };

      default:
        setSelectedFilterOption("All");
        return { type: "All" };
    }
  };
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, { type: "All" });

  return (
    <FilterContext.Provider value={{ state, dispatch, selectedFilterOption }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const filterData = useContext(FilterContext);

  const { state, dispatch, selectedFilterOption } = filterData;

  return { state, dispatch, selectedFilterOption };
};
