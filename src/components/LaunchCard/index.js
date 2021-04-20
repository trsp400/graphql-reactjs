import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Box,
  Text,
  Heading,
} from "@chakra-ui/react";

const Card = ({ launchData }) => {
  console.log(launchData);
  return launchData?.length > 0 ? (
    launchData.map((launch) => {
      const {
        mission_name,
        launch_date_local,
        launch_site: { site_name_long },
        rocket: { rocket_name },
      } = launch;

      const launchDate = new Date(launch_date_local);
      const formattedLaunchDate = `${launchDate.getDay()}/${launchDate.getMonth()}/${launchDate.getFullYear()}`;
      return (
        <Flex
          color="#000"
          flexDirection="column"
          border="1px solid #a528cc"
          key={mission_name}
          margin="5"
        >
          <Text padding="3" fontWeight="600">
            Nome: {mission_name}
          </Text>
          <Accordion
            allowMultiple
            outlineColor="#a528cc"
            ringColor="#a528cc !important"
            boxShadow="none !important"
          >
            <AccordionItem>
              <h2>
                <AccordionButton
                  boxShadow="none !important"
                  borderTop="1px solid #a528cc"
                >
                  <Box textAlign="left">Detalhes</Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Text>Foguete: {rocket_name}</Text>
                <Text>Data de lançamento: {formattedLaunchDate}</Text>
                <Text>Local: {site_name_long}</Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      );
    })
  ) : (
    <Heading fontSize="x-large">Sem informações...</Heading>
  );
};

export default Card;
