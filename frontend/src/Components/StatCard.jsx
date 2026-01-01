export const StatCard = ({ title, value, icon, iconColor,bgColor }) => {
  return (
    <div className={`${bgColor}  rounded-lg p-5 flex items-center justify-between space-x-2 shadow-sm`}>
      <div className={`p-3 rounded-full ${iconColor}`}>{icon}</div>
        <div>
        <p className="text-sm text-white">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};
