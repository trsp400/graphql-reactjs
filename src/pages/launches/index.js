import Card from "../../components/Card";
import { Grid, GridItem, Heading, Input, Flex, Center } from "@chakra-ui/react";

const Launches = () => {
  return (
    <Flex flexDirection="column" flex="1" w="100%">
      <Flex padding="10" flexDirection="row" justifyContent="space-between">
        <Heading fontSize="3xl">Launches</Heading>
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
            <Card />
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Launches;
