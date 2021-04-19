import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
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
        <Link to="/">Softplan Challenge</Link>
      </GridItem>
      <GridItem colSpan={8} padding="5">
        <Link to="/launches">Foguetes</Link>
      </GridItem>
      <GridItem colSpan={8} padding="5">
        <Link to="/rockets">Lançamentos</Link>
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
        <Link>Novos Lançamentos</Link>
      </GridItem>
    </Grid>
  );
};

export default Sidebar;
