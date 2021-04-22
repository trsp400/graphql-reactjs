import React from 'react';

import { Flex, Box, Badge, Image, Center } from '@chakra-ui/react';

const Home = () => {
  return (
    <Flex
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
      flex="1"
      w="100%"
      overflow="auto"
    >
      <Center>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image
            src="https://avatars.githubusercontent.com/u/53320507?v=4"
            alt="Thiago Robles"
          />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                Software Developer
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                Thiago Robles
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              paddingLeft="1"
            >
              GraphQL React Challenge
            </Box>

            <Box d="flex" mt="2" alignItems="center">
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                Nodejs, React
              </Box>
            </Box>
          </Box>
        </Box>
      </Center>
    </Flex>
  );
};

export default Home;
