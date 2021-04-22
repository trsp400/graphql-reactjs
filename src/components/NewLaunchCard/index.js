import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Box,
  Text,
  IconButton,
} from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';

const NewLaunchCard = ({ launchData, onDelete, search }) => {
  const launchDataInSearch =
    search?.length > 0
      ? launchData.filter(launch =>
          launch.mission_name?.toLowerCase().includes(search.toLowerCase()),
        )
      : launchData;

  return launchDataInSearch.map(launch => {
    const {
      id,
      mission_name,
      launch_date_local,
      launch_site: { site_name_long },
      rocket: { rocket_name },
      details,
    } = launch;

    const newlaunch_date_local = new Date(launch_date_local);
    const formattedlaunch_date_local = `${newlaunch_date_local.getDay()}/${newlaunch_date_local.getMonth()}/${newlaunch_date_local.getFullYear()}`;
    return (
      <Flex
        color="#000"
        flexDirection="column"
        border="1px solid #a528cc"
        key={id}
        margin="5"
      >
        <Flex color="#000" flexDirection="row" justifyContent="space-between">
          <Text padding="3" fontWeight="600">
            Nome: {mission_name}
          </Text>
          <IconButton
            margin="2"
            colorScheme="red"
            aria-label="Delete Launch"
            icon={<DeleteIcon />}
            onClick={() => onDelete(id)}
          />
        </Flex>
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
                <b>Data de lançamento:</b> {formattedlaunch_date_local}
              </Text>
              <Text>
                <b>Local: </b>
                {site_name_long}
              </Text>
              <Text>
                <b>Descrição: </b> {details || 'Sem descrição...'}
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    );
  });
};

export default NewLaunchCard;
