import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { logout } from "../store/slices/authSlice.js";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-lg border-b border-gray-200"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 bg-gradient-to-r from-primary-500 to-sweet-500 rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">🍭</span>
            </motion.div>
            <span className="text-xl font-bold text-gray-800">Sweet Shop</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-600">
                  Welcome, <span className="font-medium">{user?.name}</span>
                  {user?.role === "admin" && (
                    <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                      Admin
                    </span>
                  )}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="btn-secondary"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
