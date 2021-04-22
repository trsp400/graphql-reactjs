import { useEffect, useState } from 'react';
import { Container, MainContainer } from '../styles';

import GlobalStyles from '../styles/globals';

import Sidebar from '../components/Sidebar';

const Layout = props => {
  const { children } = props;
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
        localStorage.getItem('@grapql-react-app/new_launches'),
      );

      if (data) {
        return setNewLaunchesCount(data?.length);
      }

      return 0;
    }

    window.addEventListener('mousemove', checkNewLaunchesData);

    return () => {
      window.removeEventListener('mousemove', checkNewLaunchesData);
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
