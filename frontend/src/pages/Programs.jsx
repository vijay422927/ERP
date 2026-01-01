import { useState } from "react";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([
    { id: 1, name: "B.Tech", status: "active" },
    { id: 2, name: "M.Tech", status: "inactive" },
    { id: 3, name: "MBA", status: "active" },
  ]);

  const [programName, setProgramName] = useState("");

  const addProgram = () => {
    if (!programName) return;
    setPrograms([
      ...programs,
      {
        id: programs.length + 1,
        name: programName,
        status: "active",
      },
    ]);
    setProgramName("");
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Manage Programs
        </h1>
      </div>

      {/* Add Program */}
      <div className="bg-white border rounded-lg p-4 shadow-sm mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Enter program name"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          className="border rounded px-3 py-2 w-64 text-sm"
        />
        <button
          onClick={addProgram}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          Add Program
        </button>
      </div>

      {/* Programs Table */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">#</th>
              <th className="text-left px-4 py-3">Program Name</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program, index) => (
              <tr key={program.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{program.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      program.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {program.status === "active" ? "Active" : "Inactive"}
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

export default ProgramsPage;
