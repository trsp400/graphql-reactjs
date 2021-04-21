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
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';

import NewLaunchesCard from '../../components/NewLaunchCard';
import Spinner from '../../components/Spinner';

const Modal = ({
  launchData,
  states,
  setStates,
  isModalVisible,
  setIsModalVisible,
  onSave,
}) => {
  const { launchpads, rockets } = launchData;

  return (
    <ChakraModal
      isOpen={isModalVisible}
      onClose={() => setIsModalVisible(!isModalVisible)}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar novo lançamento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired paddingBottom="2">
            <Input
              placeholder="Nome"
              value={states?.launchName}
              onChange={event => setStates('launchName', event?.target?.value)}
            />
          </FormControl>
          <FormControl isRequired paddingBottom="2">
            <FormLabel>Data</FormLabel>
            <Input
              placeholder="Formato: dd/mm/yyyy"
              value={states?.launchDate}
              onChange={event => setStates('launchDate', event?.target?.value)}
            />
          </FormControl>
          <FormControl paddingBottom="2">
            <FormLabel>Local de lançamento</FormLabel>
            <Select
              value={states?.launchSite}
              placeholder="Selecione uma opção"
              onChange={event => setStates('launchSite', event?.target?.value)}
            >
              {launchpads?.length > 0 ? (
                launchpads?.map(site => (
                  <option key={site?.name} value={site?.name}>
                    {site?.name}
                  </option>
                ))
              ) : (
                <option value="No options">
                  Não foram encontrados locais de lançamento
                </option>
              )}
            </Select>
          </FormControl>
          <FormControl paddingBottom="2">
            <FormLabel>Foguete</FormLabel>
            <Select
              placeholder="Selecione uma opção"
              value={states?.launchRocket}
              onChange={event =>
                setStates('launchRocket', event?.target?.value)
              }
            >
              {rockets?.length > 0 ? (
                rockets?.map(rocket => (
                  <option key={rocket?.name} value={rocket?.name}>
                    {rocket?.name}
                  </option>
                ))
              ) : (
                <option value="No options">
                  Não foram encontrados locais de lançamento
                </option>
              )}
            </Select>
          </FormControl>
          <FormControl>
            <Textarea
              placeholder="Descrição do lançamento"
              value={states?.launchDescription}
              onChange={event =>
                setStates('launchDescription', event?.target?.value)
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => setIsModalVisible(!isModalVisible)}
            variant="ghost"
            mr={3}
          >
            Fechar
          </Button>
          <Button colorScheme="blue" onClick={onSave}>
            Cadastrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

const NewLaunches = () => {
  const [listLimit, setListLimit] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [launchStates, setLaunchStates] = useState({
    id: Math.random(),
    launchName: '',
    launchDate: '',
    launchSite: '',
    launchRocket: '',
    launchDescription: '',
  });

  const [newLaunches, setNewLaunches] = useState(() => {
    const storedLaunches = JSON.parse(
      localStorage.getItem('@softplan/new_launches'),
    );

    if (storedLaunches) return storedLaunches;

    return [];
  });

  useEffect(() => {
    setLaunchStates({
      id: Math.random(),
      launchName: '',
      launchDate: '',
      launchSite: '',
      launchRocket: '',
      launchDescription: '',
    });

    // const launches = JSON.parse(localStorage.getItem('@softplan/new_launches'));

    // if (launches?.length === 1) {
    //   setNewLaunches([]);
    //   return localStorage.setItem('@softplan/new_launches', JSON.stringify([]));
    // }

    return localStorage.setItem(
      '@softplan/new_launches',
      JSON.stringify(newLaunches),
    );
  }, [newLaunches]);

  const setStates = useCallback(
    (state, value) => {
      setLaunchStates({
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
      setNewLaunches(() => [newLaunches.find(launch => launch.id !== id)]);
      setIsModalVisible(false);
    },
    [newLaunches, setNewLaunches],
  );

  const launchInfo = gql`
    query GetLaucnpads {
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

  console.log(newLaunches);

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
            <Input type="text" placeholder="Pesquisar" w="64" />
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
            <NewLaunchesCard launchData={newLaunches} onDelete={onDelete} />
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default NewLaunches;
