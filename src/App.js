import { useQuery, gql } from "@apollo/client";

import Routes from "./routes";

const launchesPast = gql`
  query GetExchangeRates {
    launchesPast(limit: 10) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(launchesPast);

  return <Routes />;
};

export default App;
