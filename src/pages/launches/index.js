import { useState } from "react";
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

import LaunchesCard from "../../components/LaunchCard";
import Spinner from "../../components/Spinner";

const Launches = () => {
  const [listLimit, setListLimit] = useState(10);

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

  return (
    <Flex flexDirection="column" flex="1" w="100%" overflow="auto">
      <Flex padding="10" flexDirection="row" justifyContent="space-between">
        <Heading fontSize="3xl">Lançamentos</Heading>
        <Flex justifyContent="space-around" w="60%">
          <Center>
            <Input type="text" placeholder="Pesquisar" w="64" />
            <Heading paddingLeft="10" fontSize="medium">
              Apresentando:
              <Input
                value={listLimit}
                onChange={(event) => setListLimit(event?.target?.value)}
                placeholder={
                  listLimit <= data?.launchesPast?.length
                    ? data?.launchesPast?.length
                    : listLimit
                }
                type="text"
                maxLength={3}
                w="20"
              />
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
