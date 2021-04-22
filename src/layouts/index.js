import { useEffect, useState } from 'react';
import { Container, MainContainer } from '../styles';

import GlobalStyles from '../styles/globals';

import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
  const [newLaunchesCount, setNewLaunchesCount] = useState(() => {
    const storedLaunches = JSON.parse(
      localStorage.getItem('@grapql-react-app/new_launches'),
    );

    if (storedLaunches) return storedLaunches?.length;

    return '0';
  });

  useEffect(() => {
    function checkNewLaunchesData() {
      const data = JSON.parse(
        localStorage.getdata('@grapql-react-app/new_launches'),
      );

      if (data) {
        return setNewLaunchesCount(data?.length);
      }

      return 0;
    }

    window.addEventListener('storage', checkNewLaunchesData);

    return () => {
      window.removeEventListener('storage', checkNewLaunchesData);
    };
  }, []);

  return (
    <Container>
      <GlobalStyles />
      <Sidebar newLaunchesCount={newLaunchesCount} />
      <MainContainer>{children}</MainContainer>
    </Container>
  );
};

export default Layout;
