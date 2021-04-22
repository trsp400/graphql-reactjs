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

import RocketCard from '../../components/RocketCard';
import Spinner from '../../components/Spinner';

const Rockets = () => {
  const [listLimit, setListLimit] = useState(10);
  const [search, setSearch] = useState('');
  const rockets = gql`
    query GetRockets {
      rockets(limit: ${listLimit || 10}) {
        name
        stages
        active
        height {
          meters
        }
        diameter {
          meters
        }
        payload_weights {
          kg
        }
        description
        engines {
          type
          number
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(rockets);

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

  return (
    <Flex flexDirection="column" flex="1" w="100%" overflow="auto">
      <Flex padding="10" flexDirection="row" justifyContent="space-between">
        <Heading fontSize="3xl">Foguetes</Heading>
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
            <RocketCard rocketData={data?.rockets} search={search} />
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Rockets;
