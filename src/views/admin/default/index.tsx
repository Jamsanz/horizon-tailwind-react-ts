import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import Widget from "components/widget/Widget";
import { useQuery } from "@apollo/client";
import { GET_DASHBOARD_DATA } from "graphql/queries/dashboard/get";
import { formatToCurrency } from "utils";

const Dashboard = () => {
  const { data, error, loading } = useQuery(GET_DASHBOARD_DATA);
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Earnings"}
          subtitle={`N ${formatToCurrency(data?.dashboard?.totalEarnings)}`}
          loading={loading}
          error={error?.message}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Earnings this month"}
          subtitle={`N ${formatToCurrency(data?.dashboard?.monthlyEarnings)}`}
          loading={loading}
          error={error?.message}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={`${data?.dashboard?.sales}`}
          loading={loading}
          error={error?.message}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Categories"}
          subtitle={`${data?.dashboard?.categories}`}
          loading={loading}
          error={error?.message}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Products"}
          subtitle={`${data?.dashboard?.products}`}
          loading={loading}
          error={error?.message}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Topings"}
          subtitle={`${data?.dashboard?.topings}`}
          loading={loading}
          error={error?.message}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

    </div>
  );
};

export default Dashboard;
