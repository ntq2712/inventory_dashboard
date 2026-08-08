import { Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter, type VehicleFilterState } from "../store/vehicleFilterSlice";
import styles from "./vehicleList.module.css";

interface SearchInputProps {
  filters: VehicleFilterState;
  setCurrentPage: (page: number) => void;
}

function SearchInput({ filters, setCurrentPage }: SearchInputProps) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState(filters.searchText);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText !== filters.searchText) {
        dispatch(setFilter({ searchText: searchText }));
        setCurrentPage(1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText, dispatch, filters.searchText, setCurrentPage]);

  return (
    <Input
      placeholder="Search..."
      className={styles["search-input"]}
      value={searchText}
      onChange={(event) => setSearchText(event.target.value)}
    />
  );
}

export default SearchInput;
