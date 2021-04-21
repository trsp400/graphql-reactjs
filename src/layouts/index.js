import { Container, MainContainer } from '../styles';

import GlobalStyles from '../styles/globals';

import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
  return (
    <Container>
      <GlobalStyles />
      <Sidebar />
      <MainContainer>{children}</MainContainer>
    </Container>
  );
};

export default Layout;
