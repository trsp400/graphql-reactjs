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
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';

const LaunchCard = ({ launchData, search }) => {
  const launchDataInSearch =
    search?.length > 0
      ? launchData.filter(launch =>
          launch?.mission_name?.toLowerCase().includes(search.toLowerCase()),
        )
      : launchData;

  return launchDataInSearch?.length > 0 ? (
    launchDataInSearch.map(launch => {
      const {
        mission_name,
        launch_date_local,
        launch_site: { site_name_long },
        rocket: { rocket_name },
        details,
        ships,
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
                <Text>
                  <b>Foguete: </b>
                  {rocket_name}
                </Text>
                <Text>
                  <b>Data de lançamento:</b> {formattedLaunchDate}
                </Text>
                <Text>
                  <b>Local: </b>
                  {site_name_long}
                </Text>
                <Text>
                  <b>Descrição: </b> {details || 'Sem descrição...'}
                </Text>
                {ships?.length > 0 ? (
                  <>
                    <Text fontWeight="600">Lista de naves: </Text>
                    {ships?.map(ship => (
                      <Box key={ship?.name}>
                        <hr style={{ height: '4px' }} />
                        <UnorderedList key={ship?.name}>
                          <ListItem>Nome: {ship?.name}</ListItem>
                          <ListItem>Tipo: {ship?.type}</ListItem>
                        </UnorderedList>
                      </Box>
                    ))}
                  </>
                ) : (
                  <Text>
                    <b>Lista de naves: </b>Lista vazia
                  </Text>
                )}
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

export default LaunchCard;
