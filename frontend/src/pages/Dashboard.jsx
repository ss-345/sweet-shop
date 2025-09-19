import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchSweets } from "../store/slices/sweetsSlice.js";
import SearchBar from "../components/SearchBar.jsx";
import SweetCard from "../components/SweetCard.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { filteredSweets, loading, error } = useSelector(
    (state) => state.sweets
  );

  useEffect(() => {
    dispatch(fetchSweets());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sweet Shop</h1>
        <p className="text-gray-600">Browse and purchase delicious sweets</p>
      </motion.div>

      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSweets.length > 0 ? (
          filteredSweets.map((sweet, index) => (
            <motion.div
              key={sweet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SweetCard sweet={sweet} />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <div className="text-6xl mb-4">🍭</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No sweets found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
