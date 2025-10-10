// src/Components/ReconditionedVehicles.jsx
import React, { useState, useEffect, useContext } from "react";
import { ChevronRight, ChevronLeft, Calendar, Wrench } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

import toyota from "../assets/toyota.png";
import hondafit from "../assets/hondafit.png";
import wagonr from "../assets/wagonr.png";

import { db } from "../Firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import AuthContext from "../Context/AuthContext";
import ReservedVehicles from "./ReservedVehicles";

// Dummy vehicle data
const vehiclesData = [
  {
    id: 1,
    name: "Toyota Aqua",
    model: "2019",
    originalPrice: "LKR 5.2M",
    expectedPrice: "LKR 4.8M",
    price: "LKR 4.8M",
    status: "Under Maintenance",
    progress: 75,
    completionDate: "2025-08-15",
    workRemaining: ["Engine tuning", "Paint job", "Tire replacement"],
    image: toyota,
  },
  {
    id: 2,
    name: "Honda Fit",
    model: "2018",
    originalPrice: "LKR 4.5M",
    expectedPrice: "LKR 4.2M",
    price: "LKR 4.2M",
    status: "Ready",
    progress: 100,
    completionDate: "2025-07-10",
    workRemaining: [],
    image: hondafit,
  },
  {
    id: 3,
    name: "Wagon R",
    model: "2016",
    originalPrice: "LKR 5.8M",
    expectedPrice: "LKR 5.5M",
    price: "LKR 5.5M",
    status: "In Progress",
    progress: 50,
    completionDate: "2025-09-01",
    workRemaining: ["Dashboard replacement", "AC fix"],
    image: wagonr,
  },
];

// Helper: Status color
const getStatusColor = (status) => {
  switch (status) {
    case "Ready":
      return "bg-[#334443] text-white";
    case "Under Maintenance":
      return "bg-[#3E0703] text-white";
    case "In Progress":
      return "bg-[#B6771D] text-black";
    default:
      return "bg-gray-500 text-white";
  }
};

export default function ReconditionedVehicles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [vehicles, setVehicles] = useState(vehiclesData);
  const [reservingId, setReservingId] = useState(null); // track which car is reserving
  const [activeTab, setActiveTab] = useState("Vehicles");

  const vehicle = vehicles[currentIndex];
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Navigate next / prev
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % vehicles.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length);

  // Check if user already reserved
  useEffect(() => {
    const checkAlreadyReserved = async () => {
      if (!user) return;
      const q = query(
        collection(db, "reservations"),
        where("reservedBy", "==", user.email),
        where("vehicleName", "==", vehicle.name)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        setVehicles((prev) =>
          prev.map((v) =>
            v.id === vehicle.id ? { ...v, reserved: true } : v
          )
        );
      }
    };
    checkAlreadyReserved();
  }, [user, currentIndex, vehicle.id, vehicle.name]);

  // Reserve a vehicle
  const handleReserve = async (veh) => {
    if (!user) {
      alert("Please login to reserve a vehicle.");
      navigate("/signin");
      return;
    }

    if (veh.reserved || reservingId === veh.id) return;

    try {
      setReservingId(veh.id); // mark only this vehicle as reserving

      await addDoc(collection(db, "reservations"), {
        vehicleId: veh.id,
        vehicleName: veh.name,
        reservedBy: user.email,
        reservedAt: Date.now(),
        status: "Pending",
      });

      setVehicles((prev) =>
        prev.map((v) => (v.id === veh.id ? { ...v, reserved: true } : v))
      );
    } catch (e) {
      console.error("Reserve error:", e);
    } finally {
      setReservingId(null); // done reserving
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-gradient-to-r from-gray-900 to-gray-900 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab("Vehicles")}
              className={`flex flex-col items-center transition-all duration-300 ${
                activeTab === "Vehicles"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Vehicles
              {activeTab === "Vehicles" && <div className="h-0.5 w-full bg-white mt-1" />}
            </button>
            <button
              onClick={() => setActiveTab("My Reservations")}
              className={`flex flex-col items-center transition-all duration-300 ${
                activeTab === "My Reservations"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              My Reservations
              {activeTab === "My Reservations" && (
                <div className="h-0.5 w-full bg-white mt-1" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-start p-4 lg:p-8">
        {activeTab === "Vehicles" ? (
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row w-full max-w-7xl h-full lg:h-[80vh] relative">
            {/* Go Back */}
            <div className="absolute top-[80px] left-4 lg:left-8 z-20">
              <Link to="/#home" className="text-gray-600 hover:text-black">
                <ChevronLeft size={32} />
              </Link>
            </div>

            {/* Vehicle Image */}
            <div className="relative flex-1 flex items-center justify-center p-4 lg:p-8 bg-white">
              <button
                onClick={handlePrev}
                className="absolute left-2 lg:left-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black"
              >
                <ChevronLeft size={24} />
              </button>
              <img
                src={vehicle.image || "/placeholder.svg"}
                alt={vehicle.name}
                className="w-full h-auto object-contain rounded-xl"
              />
              <button
                onClick={handleNext}
                className="absolute right-2 lg:right-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black"
              >
                <ChevronRight size={24} />
              </button>
              <div
                className={`absolute top-4 right-4 px-3 py-1 text-sm rounded-full font-semibold ${getStatusColor(
                  vehicle.status
                )}`}
              >
                {vehicle.status}
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="flex-1 lg:flex-[0_0_400px] p-6 bg-gradient-to-r from-gray-900 to-gray-900 text-white flex flex-col justify-between">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{vehicle.name}</h2>
                <p className="text-sm text-gray-400 mb-6">Model: {vehicle.model}</p>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Original:</span>
                    <span className="line-through text-gray-500">{vehicle.originalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-[#B6771D] font-bold">Expected:</span>
                    <span className="text-[#B6771D]  font-bold">{vehicle.expectedPrice}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-gray-300">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm">
                      Ready by {new Date(vehicle.completionDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Wrench size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm">{vehicle.workRemaining.length} tasks remaining</span>
                  </div>
                </div>

                {vehicle.workRemaining.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Remaining Work:</p>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.workRemaining.slice(0, 2).map((work, i) => (
                        <span key={i} className="px-3 py-1 text-xs rounded border border-gray-600 text-gray-300">
                          {work}
                        </span>
                      ))}
                      {vehicle.workRemaining.length > 2 && (
                        <span className="px-3 py-1 text-xs rounded border border-gray-600 text-gray-300">
                          +{vehicle.workRemaining.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Reserve Button */}
              <button
                onClick={() => handleReserve(vehicle)}
                disabled={vehicle.reserved || reservingId === vehicle.id}
                className={`w-full py-3 rounded-lg font-semibold text-base mt-6 transition-colors duration-300 ${
                  vehicle.reserved || reservingId === vehicle.id
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-gray-900 to-gray-700 hover:bg-white-600 text-white"
                }`}
              >
                {vehicle.reserved
                  ? "Reserved"
                  : reservingId === vehicle.id
                  ? "Reserving..."
                  : "Reserve Now"}
              </button>
            </div>
          </div>
        ) : (
          // My Reservations Section
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl p-6">
            <ReservedVehicles />
          </div>
        )}
      </div>
    </div>
  );
}
