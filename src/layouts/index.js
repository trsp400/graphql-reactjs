import { Container } from "../styles";

import GlobalStyles from "../styles/globals";

import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <Container>
      <GlobalStyles />
      <Sidebar />
      {children}
    </Container>
  );
};

export default Layout;
