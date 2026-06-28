import {
  LayoutDashboard,
  GitBranch,
  ShieldAlert,
  History,
  LogOut,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

const Sidebar = () => {

  const navigate = useNavigate();

  // =========================
  // Logout Function
  // =========================
  const handleLogout = async () => {
    try {

      await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          withCredentials: true,
        }
      );

      // Clear local navigation
      navigate("/");

    } catch (error) {

      console.log(
        "Logout Error:",
        error
      );
    }
  };

  return (

    <div className="w-72 bg-[#0d1117] border-r border-gray-800 min-h-screen flex flex-col justify-between p-6">

      {/* ========================= */}
      {/* TOP SECTION */}
      {/* ========================= */}

      <div>

        {/* Logo */}
        <div className="flex items-center gap-4 mb-14">

          <div className="bg-yellow-400 text-black font-black text-xl w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">

            C

          </div>

          <div>

            <h1 className="text-3xl font-black text-white tracking-tight">

              CodeSentinel

            </h1>

            <p className="text-gray-500 text-sm">

              AI PR Reviewer

            </p>

          </div>

        </div>

        {/* Navigation */}
        <div className="space-y-4">

          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            title="Dashboard"
            to="/dashboard"
          />

          <SidebarItem
            icon={<GitBranch size={20} />}
            title="Repositories"
            to="/repositories"
          />

          <SidebarItem
            icon={<ShieldAlert size={20} />}
            title="AI Reviews"
            to="/reviews"
          />

          <SidebarItem
            icon={<History size={20} />}
            title="History"
            to="/history"
          />

        </div>

      </div>

      {/* ========================= */}
      {/* BOTTOM SECTION */}
      {/* ========================= */}

      <div className="space-y-4">

        {/* Divider */}
        <div className="border-t border-gray-800"></div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-4 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition duration-300"
        >

          <LogOut size={20} />

          <span className="font-semibold">

            Logout

          </span>

        </button>

      </div>

    </div>
  );
};

// =========================
// Sidebar Item Component
// =========================
const SidebarItem = ({
  icon,
  title,
  to,
}) => {

  return (

    <NavLink
      to={to}
      className={({ isActive }) =>

        `flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
          isActive
            ? "bg-yellow-400 text-black shadow-lg"

            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`
      }
    >

      <div className="group-hover:scale-110 transition">

        {icon}

      </div>

      <span className="font-semibold text-lg">

        {title}

      </span>

    </NavLink>
  );
};

export default Sidebar;