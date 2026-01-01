import { BranchEnrollmentChart } from "../Components/ChartComponent";
import { StatCard } from "../Components/StatCard";
import {
  AcademicCapIcon,
  BookOpenIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  UserIcon
} from "@heroicons/react/24/solid";
const DashboardPage = () => {
   const data = [
    { branch: "CSE", students: 180 },
    { branch: "IT", students: 140 },
    { branch: "ECE", students: 160 },
    { branch: "MECH", students: 110 },
    { branch: "CIVIL", students: 90 },
  ];
  return (
    <div className="bg-white min-h-screen w-full flex flex-col">
      {/* show the statcards */}
      <div className="flex items-center  space-x-5">
        <StatCard
          title=" Total Programs"
          value={3}
          iconColor="bg-black text-white"
          icon={<AcademicCapIcon className="h-6 w-6" />}
          bgColor={"bg-blue-700"}
        />
        <StatCard
          title={"Total Branches"}
          value={15}
          bgColor={"bg-violet-600"}
          icon={<BuildingLibraryIcon className="h-6 w-6" />}
          iconColor={"bg-black text-white"}
        />
        <StatCard
          title={"Total Courses"}
          value={40}
          bgColor={"bg-yellow-500"}
          icon={<BookOpenIcon className="h-6 w-6 " />}
          iconColor={"bg-black text-white"}
        />
        <StatCard
          title={"Total Faculty"}
          value={45}
          bgColor={"bg-green-600"}
          icon={<UserGroupIcon className="h-6 w-6" />}
          iconColor={"bg-black text-white"}
        />
         <StatCard
          title={"Total Students"}
          value={1145}
          bgColor={"bg-gray-600"}
          icon={<UserIcon className="h-6 w-6" />}
          iconColor={"bg-black text-white"}
        />
      </div>
     <div className=" flex items-center  space-x-5 ">
      <BranchEnrollmentChart data={data} />
     </div>
    </div>
  );
};

export default DashboardPage;
