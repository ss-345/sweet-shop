import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  fetchSweets,
  addSweet,
  updateSweet,
  deleteSweet,
  restockSweet,
} from "../store/slices/sweetsSlice.js";
import SearchBar from "../components/SearchBar.jsx";
import SweetCard from "../components/SweetCard.jsx";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { filteredSweets, loading, error } = useSelector(
    (state) => state.sweets
  );

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [sweetToRestock, setSweetToRestock] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [restockQuantity, setRestockQuantity] = useState("");

  useEffect(() => {
    dispatch(fetchSweets());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSweet) {
        await dispatch(
          updateSweet({
            id: editingSweet.id,
            data: formData,
          })
        ).unwrap();
        setEditingSweet(null);
      } else {
        await dispatch(addSweet(formData)).unwrap();
        setShowAddForm(false);
      }
      setFormData({ name: "", category: "", price: "", quantity: "" });
    } catch (error) {
      // Error is handled by Redux
    }
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString(),
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sweet?")) {
      try {
        await dispatch(deleteSweet(id)).unwrap();
      } catch (error) {
        // Error is handled by Redux
      }
    }
  };

  const handleRestock = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        restockSweet({
          id: sweetToRestock.id,
          quantity: parseInt(restockQuantity),
        })
      ).unwrap();
      setSweetToRestock(null);
      setRestockQuantity("");
    } catch (error) {
      // Error is handled by Redux
    }
  };

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

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage your sweet shop inventory</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            Add New Sweet
          </motion.button>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6"
        >
          {error}
        </motion.div>
      )}

      <SearchBar />

      {/* Add/Edit Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <h2 className="text-lg font-semibold mb-4">
            {editingSweet ? "Edit Sweet" : "Add New Sweet"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Sweet name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Category"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="input-field"
                placeholder="Price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                min="0"
                className="input-field"
                placeholder="Quantity"
              />
            </div>
            <div className="md:col-span-2 flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn-primary"
              >
                {editingSweet ? "Update" : "Add"} Sweet
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingSweet(null);
                  setFormData({
                    name: "",
                    category: "",
                    price: "",
                    quantity: "",
                  });
                }}
                className="btn-secondary"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Sweets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSweets.map((sweet, index) => (
          <motion.div
            key={sweet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {sweet.name}
                </h3>
                <p className="text-sm text-gray-500 capitalize">
                  {sweet.category}
                </p>
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

            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEdit(sweet)}
                className="flex-1 btn-secondary text-sm"
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSweetToRestock(sweet)}
                className="flex-1 btn-primary text-sm"
              >
                Restock
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(sweet.id)}
                className="btn-danger text-sm"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Restock Modal */}
      {sweetToRestock && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-6 w-96"
          >
            <h3 className="text-lg font-semibold mb-4">
              Restock {sweetToRestock.name}
            </h3>
            <form onSubmit={handleRestock}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity to Add
                </label>
                <input
                  type="number"
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(e.target.value)}
                  required
                  min="1"
                  className="input-field"
                  placeholder="Enter quantity"
                />
              </div>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn-primary"
                >
                  Restock
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => {
                    setSweetToRestock(null);
                    setRestockQuantity("");
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;
