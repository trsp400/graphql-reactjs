import { Flex, Center, Spinner as ChakraSpinner } from "@chakra-ui/react";

const Spinner = () => (
  <Flex
    flex="1"
    w="100%"
    flexDirection="column"
    alignContent="center"
    justifyContent="center"
  >
    <Center>
      <ChakraSpinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  </Flex>
);

export default Spinner;
