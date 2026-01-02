import { useState } from "react";

const CoursePage = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Data Structures",
      code: "CS301",
      branch: "CSE",
      regulation: "AR23",
      year: "II",
      semester: "I",
      type: "Theory",
      elective: "Core",
      credits: 4,
      status: "active",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    code: "",
    branch: "",
    regulation: "",
    year: "",
    semester: "",
    type: "",
    elective: "",
    credits: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: courses.length + 1, ...form, status: "active" },
    ]);
    setForm({
      name: "",
      code: "",
      branch: "",
      regulation: "",
      year: "",
      semester: "",
      type: "",
      elective: "",
      credits: "",
    });
  };

  return (
    <div className="w-full min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Courses</h1>
        <p className="text-sm text-gray-600">
          Create and manage courses with academic mapping details.
        </p>
      </div>

      {/* Course Form */}
      <div className="bg-white border rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Add New Course
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="name"
            placeholder="Course Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          />

          <input
            name="code"
            placeholder="Course Code"
            value={form.code}
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

          <select
            name="regulation"
            value={form.regulation}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Select Regulation</option>
            <option>AR23</option>
            <option>AR21</option>
          </select>

          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Year</option>
            <option>I</option>
            <option>II</option>
            <option>III</option>
            <option>IV</option>
          </select>

          <select
            name="semester"
            value={form.semester}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Semester</option>
            <option>I</option>
            <option>II</option>
          </select>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Course Type</option>
            <option>Theory</option>
            <option>Lab</option>
            <option>Project</option>
          </select>

          <select
            name="elective"
            value={form.elective}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Elective Type</option>
            <option>Core</option>
            <option>Professional Elective</option>
            <option>Open Elective</option>
          </select>

          <input
            name="credits"
            placeholder="Credits"
            value={form.credits}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={addCourse}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700"
        >
          Add Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Course</th>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-left">Regulation</th>
              <th className="px-4 py-3 text-left">Year/Sem</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Credits</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3">{c.code}</td>
                <td className="px-4 py-3">{c.branch}</td>
                <td className="px-4 py-3">{c.regulation}</td>
                <td className="px-4 py-3">
                  {c.year}/{c.semester}
                </td>
                <td className="px-4 py-3">{c.type}</td>
                <td className="px-4 py-3">{c.credits}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursePage;
