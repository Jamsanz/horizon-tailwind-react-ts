import { gql, TypedDocumentNode } from "@apollo/client";
import { Dashboard } from "graphql/__generated__/graphql";

interface IDashboardData {
  dashboard: Dashboard
}
export const GET_DASHBOARD_DATA: TypedDocumentNode<IDashboardData> = gql`
  query dashboard {
    dashboard {
      totalEarnings
      monthlyEarnings
      categories
      sales
      topings
      products
    }
  }
`;