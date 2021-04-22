import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import {
  Grid,
  GridItem,
  Heading,
  Input,
  Flex,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Select,
} from '@chakra-ui/react';

import LaunchesCard from '../../components/LaunchCard';
import Spinner from '../../components/Spinner';

const Launches = () => {
  const [listLimit, setListLimit] = useState(10);
  const [search, setSearch] = useState('');

  const [newLaunches] = useState(() => {
    const storedLaunches = JSON.parse(
      localStorage.getItem('@grapql-react-app/new_launches'),
    );

    if (storedLaunches) return storedLaunches;

    return [];
  });

  const launchesPast = gql`
    query getLaunches {
      launchesPast(limit: ${listLimit || 10}, order: "launch_date_utc") {
        mission_name
        launch_date_local
        launch_site {
          site_name_long
        }
        rocket {
          rocket_name
        }
        launch_date_utc
        details
        ships {
          name
          type
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(launchesPast);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Ops!</AlertTitle>
        <AlertDescription>
          Houve um erro ao realizar o carregamento das informações!
        </AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  }

  const launches = [...data?.launchesPast, ...newLaunches];

  return (
    <Flex flexDirection="column" flex="1" w="100%" overflow="auto">
      <Flex padding="10" flexDirection="row" justifyContent="space-between">
        <Heading fontSize="3xl">Lançamentos</Heading>
        <Flex justifyContent="space-around" w="60%">
          <Center>
            <Input
              type="text"
              placeholder="Pesquisar"
              w="64"
              onChange={event => setSearch(event?.target?.value)}
            />
            <Heading paddingLeft="10" paddingRight="5" fontSize="medium">
              Apresentando:
            </Heading>
            <Select
              value={listLimit}
              onChange={event => setListLimit(event?.target?.value)}
              type="text"
              maxLength={3}
              w="20"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Select>
          </Center>
        </Flex>
      </Flex>
      <Flex>
        <Grid padding="10" w="80%">
          <GridItem>
            <LaunchesCard search={search} launchData={launches} />
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Launches;
