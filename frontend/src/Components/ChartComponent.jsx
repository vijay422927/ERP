import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const BranchEnrollmentChart = ({ data = [] }) => {
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm mt-10">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Student Enrollment by Branch
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="branch" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="students" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
