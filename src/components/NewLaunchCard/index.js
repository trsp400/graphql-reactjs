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
          launch.launchName?.toLowerCase().includes(search.toLowerCase()),
        )
      : launchData;

  return launchDataInSearch.map(launch => {
    const {
      id,
      launchName,
      launchDate,
      launchSite,
      launchRocket,
      launchDescription,
    } = launch;

    const newLaunchDate = new Date(launchDate);
    const formattedLaunchDate = `${newLaunchDate.getDay()}/${newLaunchDate.getMonth()}/${newLaunchDate.getFullYear()}`;
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
            Nome: {launchName}
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
                {launchRocket}
              </Text>
              <Text>
                <b>Data de lançamento:</b> {formattedLaunchDate}
              </Text>
              <Text>
                <b>Local: </b>
                {launchSite}
              </Text>
              <Text>
                <b>Descrição: </b> {launchDescription || 'Sem descrição...'}
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    );
  });
};

export default NewLaunchCard;
