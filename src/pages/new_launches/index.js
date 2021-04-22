import React, { useState, useCallback, useEffect } from 'react';
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
  Button,
} from '@chakra-ui/react';

import NewLaunchesCard from '../../components/NewLaunchCard';
import Spinner from '../../components/Spinner';

import Modal from '../../components/Modal';

const NewLaunches = () => {
  const [listLimit, setListLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [launchStates, setLaunchStates] = useState({
    id: Math.random(),
    mission_name: '',
    launch_date_local: new Date(),
    launch_site: { site_name_long: '' },
    rocket: { rocket_name: '' },
    details: '',
  });

  const [newLaunches, setNewLaunches] = useState(() => {
    const storedLaunches = JSON.parse(
      localStorage.getItem('@grapql-react-app/new_launches'),
    );

    if (storedLaunches) return storedLaunches;

    return [];
  });

  useEffect(() => {
    setLaunchStates({
      id: Math.random(),
      mission_name: '',
      launch_date_local: new Date(),
      launch_site: { site_name_long: '' },
      rocket: { rocket_name: '' },
      details: '',
    });

    return localStorage.setItem(
      '@grapql-react-app/new_launches',
      JSON.stringify(newLaunches),
    );
  }, [newLaunches]);

  const setStates = useCallback(
    (value, state, subState) => {
      if (subState) {
        return setLaunchStates({
          ...launchStates,
          [state]: { [subState]: value },
        });
      }

      return setLaunchStates({
        ...launchStates,
        [state]: value,
      });
    },
    [launchStates, setLaunchStates],
  );

  const onSave = useCallback(() => {
    setNewLaunches([...newLaunches, launchStates]);

    setIsModalVisible(false);
  }, [newLaunches, setNewLaunches, launchStates]);

  const onDelete = useCallback(
    id => {
      localStorage.setItem(
        '@grapql-react-app/new_launches',
        JSON.stringify(newLaunches.filter(launch => launch.id !== id)),
      );
      setNewLaunches(() => newLaunches.filter(launch => launch.id !== id));
      setIsModalVisible(false);
    },
    [newLaunches, setNewLaunches],
  );

  const launchInfo = gql`
    query GetLauchpads {
      launchpads {
        name
      }
      rockets {
        name
      }
    }
  `;

  const { loading, error, data } = useQuery(launchInfo);

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

  const { rockets, launchpads } = data;

  return (
    <Flex flexDirection="column" flex="1" w="100%" overflow="auto">
      <Modal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        launchData={{ rockets, launchpads }}
        states={launchStates}
        setStates={setStates}
        onSave={onSave}
      />
      <Flex padding="10" flexDirection="row" justifyContent="space-between">
        <Heading fontSize="3xl">Novos Lançamentos</Heading>
        <Button
          paddingLeft="5"
          colorScheme="purple"
          variant="outline"
          onClick={() => setIsModalVisible(!isModalVisible)}
        >
          Novo +
        </Button>
        <Flex justifyContent="space-around" w="50%">
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
            {newLaunches.length > 0 ? (
              <NewLaunchesCard
                search={search}
                launchData={newLaunches}
                onDelete={onDelete}
              />
            ) : (
              <Heading fontSize="x-large">Sem informações...</Heading>
            )}
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default NewLaunches;
