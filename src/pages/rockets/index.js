import { useQuery, gql } from "@apollo/client";

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
} from "@chakra-ui/react";

import RocketCard from "../../components/RocketCard";
import Spinner from "../../components/Spinner";

const Rockets = () => {
  const rockets = gql`
    query GetRockets {
      rockets(limit: 10) {
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

  console.log(data);

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
        <Flex justifyContent="space-around" w="50%">
          <Center>
            <Input type="text" placeholder="Pesquisar" w="64" />
            <Heading paddingLeft="10" fontSize="medium">
              Apresentando: 10
            </Heading>
          </Center>
        </Flex>
      </Flex>
      <Flex>
        <Grid padding="10" w="80%">
          <GridItem>
            <RocketCard rocketData={data?.rockets} />
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Rockets;
