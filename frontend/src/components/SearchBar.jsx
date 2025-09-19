import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  setSearchParams,
  searchSweets,
  clearSearch,
} from "../store/slices/sweetsSlice.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchParams } = useSelector((state) => state.sweets);
  const [localParams, setLocalParams] = useState(searchParams);

  const handleSearch = () => {
    dispatch(setSearchParams(localParams));
    dispatch(searchSweets(localParams));
  };

  const handleClear = () => {
    setLocalParams({ name: "", category: "", priceMin: "", priceMax: "" });
    dispatch(clearSearch());
  };

  const handleInputChange = (field, value) => {
    setLocalParams((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mb-8"
    >
      <h2 className="text-lg font-semibold mb-4">Search Sweets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={localParams.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Search by name..."
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={localParams.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            placeholder="Search by category..."
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            value={localParams.priceMin}
            onChange={(e) => handleInputChange("priceMin", e.target.value)}
            placeholder="Min price..."
            className="input-field"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            value={localParams.priceMax}
            onChange={(e) => handleInputChange("priceMax", e.target.value)}
            placeholder="Max price..."
            className="input-field"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="flex space-x-3 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="btn-primary"
        >
          Search
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClear}
          className="btn-secondary"
        >
          Clear
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
