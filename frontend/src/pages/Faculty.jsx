import { useState } from "react";

const FacultyPage = () => {
  const [facultyList, setFacultyList] = useState([
    {
      id: 1,
      name: "Dr. Ramesh Kumar",
      empId: "EMP102",
      branch: "CSE",
      email: "ramesh@college.edu",
      phone: "9876543210",
      role: "Faculty",
      status: "active",
    },
  ]);

  const [form, setForm] = useState({
    honorific: "Dr.",
    name: "",
    empId: "",
    branch: "",
    email: "",
    phone: "",
    role: "Faculty",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addFaculty = () => {
    setFacultyList([
      ...facultyList,
      {
        id: facultyList.length + 1,
        ...form,
        status: "active",
      },
    ]);

    setForm({
      honorific: "Dr.",
      name: "",
      empId: "",
      branch: "",
      email: "",
      phone: "",
      role: "Faculty",
    });
  };

  return (
    <div className="min-h-screen w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Faculty</h1>
      </div>

      {/* Faculty Form */}
      <div className="bg-white border rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Add Faculty
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="honorific"
            value={form.honorific}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          >
            <option>Dr.</option>
            <option>Mr.</option>
            <option>Mrs.</option>
          </select>

          <input
            name="name"
            placeholder="Faculty Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          />

          <input
            name="empId"
            placeholder="EMP ID / Per No"
            value={form.empId}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          />

          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Select Branch</option>
            <option>CSE</option>
            <option>IT</option>
            <option>ECE</option>
          </select>

          <input
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          >
            <option>Faculty</option>
            <option>Admin</option>
          </select>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={addFaculty}
            className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700"
          >
            Add Faculty
          </button>

          <button className="border px-6 py-2 rounded text-sm">
            Bulk Upload
          </button>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Faculty</th>
              <th className="px-4 py-3 text-left">EMP ID</th>
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.map((f) => (
              <tr key={f.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  {f.honorific} {f.name}
                </td>
                <td className="px-4 py-3">{f.empId}</td>
                <td className="px-4 py-3">{f.branch}</td>
                <td className="px-4 py-3">{f.email}</td>
                <td className="px-4 py-3">{f.phone}</td>
                <td className="px-4 py-3">{f.role}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                    Active
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

export default FacultyPage;
