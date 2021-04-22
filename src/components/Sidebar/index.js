import React from 'react';
import { Grid, GridItem, Flex, Box } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

const Sidebar = ({ newLaunchesCount }) => {
  return (
    <Grid
      h="100%"
      bg="#5429CC"
      width="20%"
      templateRows="repeat(10, 5fr)"
      templateColumns="repeat(5, 1fr)"
      gridColumnEnd=" 3"
    >
      <GridItem
        colSpan={8}
        padding="5"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="#000"
      >
        <Link to="/">SpaceX API GraphQL</Link>
      </GridItem>
      <GridItem colSpan={8} padding="5">
        <Link to="/rockets">Foguetes</Link>
      </GridItem>
      <GridItem colSpan={8} padding="5">
        <Link to="/launches">Lançamentos</Link>
      </GridItem>
      <GridItem
        colSpan={8}
        rowSpan={10}
        alignSelf="flex-end"
        padding="5"
        borderTopWidth="1px"
        borderTopStyle="solid"
        borderTopColor="#000"
      >
        <Flex flexDirection="row" flex="1" justifyContent="space-between">
          <Link to="/new_launches">Novos Lançamentos</Link>
          <Box
            border="2px solid #ddd"
            borderRadius="40%"
            color="#ddd"
            height="100%"
            width="10%"
            textAlign="center"
          >
            {newLaunchesCount}
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Sidebar;
