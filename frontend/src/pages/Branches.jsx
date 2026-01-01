import { useState } from "react";

const Branchespage = () => {
  const [branches, setBranches] = useState([
    { id: 1, name: "CSE", code: "05", status: "active" },
    { id: 2, name: "IT", code: "12", status: "active" },
    { id: 3, name: "CSE-AIML", code: "42", status: "inactive" },
    { id: 4, name: "CSE-AIDS", code: "45", status: "active" },
  ]);

  const [branchName, setBranchName] = useState("");
  const [branchCode, setBranchCode] = useState("");

  const addBranch = () => {
    if (!branchName || !branchCode) return;

    setBranches([
      ...branches,
      {
        id: branches.length + 1,
        name: branchName,
        code: branchCode,
        status: "active",
      },
    ]);

    setBranchName("");
    setBranchCode("");
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Manage Branches
        </h1>
      </div>

      {/* Add Branch */}
      <div className="bg-white border rounded-lg p-4 shadow-sm mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Branch name (e.g. CSE)"
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
          className="border rounded px-3 py-2 w-56 text-sm"
        />

        <input
          type="text"
          placeholder="Branch code (e.g. 05)"
          value={branchCode}
          onChange={(e) => setBranchCode(e.target.value)}
          className="border rounded px-3 py-2 w-40 text-sm"
        />

        <button
          onClick={addBranch}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          Add Branch
        </button>
      </div>

      {/* Branches Table */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">#</th>
              <th className="text-left px-4 py-3">Branch Name</th>
              <th className="text-left px-4 py-3">Branch Code</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr key={branch.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{branch.name}</td>
                <td className="px-4 py-3">{branch.code}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      branch.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {branch.status === "active" ? "Active" : "Inactive"}
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
export default Branchespage;
