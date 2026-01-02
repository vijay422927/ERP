import { useState } from "react";

const RegulationsPage = () => {
  const [regulations, setRegulations] = useState([
    { id: 1, name: "AR23", status: "active" },
    { id: 2, name: "AR21", status: "inactive" },
    { id: 3, name: "AR20", status: "inactive" },
  ]);

  const [regulationName, setRegulationName] = useState("");

  const addRegulation = () => {
    if (!regulationName) return;

    setRegulations([
      ...regulations,
      {
        id: regulations.length + 1,
        name: regulationName.toUpperCase(),
        status: "active",
      },
    ]);

    setRegulationName("");
  };

  return (
    <div className="min-h-screen w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Manage Regulations
        </h1>
      </div>

      {/* Add Regulation */}
      <div className="bg-white border rounded-lg p-4 shadow-sm mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Enter regulation (e.g. AR23)"
          value={regulationName}
          onChange={(e) => setRegulationName(e.target.value)}
          className="border rounded px-3 py-2 w-64 text-sm"
        />
        <button
          onClick={addRegulation}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          Add Regulation
        </button>
      </div>

      {/* Regulations Table */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">#</th>
              <th className="text-left px-4 py-3">Regulation</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {regulations.map((reg, index) => (
              <tr key={reg.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{reg.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      reg.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {reg.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Disable
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegulationsPage;
