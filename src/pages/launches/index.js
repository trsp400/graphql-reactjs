import Card from "../../components/Card";
import { Grid, GridItem } from "@chakra-ui/react";

const Launches = () => {
  return (
    <Grid>
      <GridItem
        padding="10"
        width="20%"
        templateRows="repeat(10, 5fr)"
        templateColumns="repeat(5, 1fr)"
      >
        <Card />
      </GridItem>
    </Grid>
  );
};

export default Launches;
