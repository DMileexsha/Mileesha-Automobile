// src/Components/ReservedVehicles.jsx
import React, { useState, useEffect, useContext } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import AuthContext from "../Context/AuthContext";
import { Trash2 } from "lucide-react";

export default function ReservedVehicles() {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reservations from Firestore
  const fetchReservations = async () => {
    if (!user) {
      setReservations([]);
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, "reservations"),
        where("reservedBy", "==", user.email)
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((docSnap) => ({
        id: docSnap.id, // must be Firestore document ID
        ...docSnap.data(),
      }));

      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [user]);

  // Delete reservation function
  const handleDelete = async (id) => {
    if (!id) return;

    try {
      await deleteDoc(doc(db, "reservations", id)); // delete by Firestore doc ID
      // Update the UI immediately
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  if (loading) return <p>Loading reservations...</p>;
  if (!user) return <p>Please login to view your reservations.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reserved Vehicles</h2>

      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <ul className="space-y-3">
          {reservations.map((r) => (
            <li
              key={r.id}
              className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{r.vehicleName}</p>
                <p className="text-sm text-gray-500">
                  Reserved on:{" "}
                  {r.reservedAt
                    ? new Date(r.reservedAt).toLocaleString()
                    : "N/A"}
                </p>
                <p className="text-sm">Status: {r.status}</p>
              </div>

              <button
                onClick={() => handleDelete(r.id)}
                className="text-red-500 hover:text-red-700"
                title="Remove reservation"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
