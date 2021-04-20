import { useQuery, gql } from "@apollo/client";

import {
  Grid,
  GridItem,
  Heading,
  Input,
  Flex,
  Center,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

import LaunchesCard from "../../components/LaunchCard";

const Launches = () => {
  const launchesPast = gql`
    query GetExchangeRates {
      launchesPast(limit: 10) {
        mission_name
        launch_date_local
        launch_site {
          site_name_long
        }
        rocket {
          rocket_name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(launchesPast);

  if (loading) return <Progress size="xs" isIndeterminate />;
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
        <Heading fontSize="3xl">Lançamentos</Heading>
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
            <LaunchesCard launchData={data?.launchesPast} />
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Launches;
