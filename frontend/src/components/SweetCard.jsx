import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { purchaseSweet } from "../store/slices/sweetsSlice.js";

const SweetCard = ({ sweet }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handlePurchase = () => {
    if (sweet.quantity > 0) {
      dispatch(purchaseSweet({ id: sweet.id, quantity: 1 }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="card hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{sweet.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{sweet.category}</p>
        </div>
        <span className="text-2xl font-bold text-primary-600">
          ${sweet.price}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Stock:</span>
          <span
            className={`font-medium ${
              sweet.quantity > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {sweet.quantity} {sweet.quantity === 1 ? "piece" : "pieces"}
          </span>
        </div>
      </div>

      {user?.role !== "admin" && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePurchase}
          disabled={sweet.quantity === 0}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            sweet.quantity > 0
              ? "bg-primary-500 hover:bg-primary-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {sweet.quantity > 0 ? "Purchase" : "Out of Stock"}
        </motion.button>
      )}
    </motion.div>
  );
};

export default SweetCard;
