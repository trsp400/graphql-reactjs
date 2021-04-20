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
  return launchData > 0 ? (
    launchData.map((launch) => (
      <Flex color="#000" flexDirection="column" border="1px solid #a528cc">
        <Text padding="3">Nome</Text>
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
              <Text>Foguete: ssass</Text>
              <Text>Data de lançamento: 20/04/2020</Text>
              <Text>Local: alalalalla</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    ))
  ) : (
    <Heading fontSize="x-large">Sem informações...</Heading>
  );
};

export default Card;
