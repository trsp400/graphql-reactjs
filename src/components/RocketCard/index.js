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
} from "@chakra-ui/react";

const RocketCard = ({ rocketData }) => {
  console.log(rocketData);
  return rocketData?.length > 0 ? (
    rocketData.map((launch) => {
      const {
        name,
        stages,
        active,
        height: { meters: heightMeters },
        diameter: { meters: diameterMeters },
        payload_weights: payloadWeight,
        description,
        engines,
      } = launch;

      return (
        <Flex
          color="#000"
          flexDirection="column"
          border="1px solid #a528cc"
          key={name}
          margin="5"
        >
          <Text padding="3" fontWeight="600">
            Nome: {name}
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
                  <b>Status: </b>
                  {active ? "Ativo" : "Desativado"}
                </Text>

                <Text>
                  <b>Estágios: </b>
                  {stages}
                </Text>
                <Text>
                  <b>Descrição: </b> {description || "Sem descrição..."}
                </Text>
                <Text>
                  <b>Diâmetro: </b> {diameterMeters}M
                </Text>
                <Text>
                  <b>Altura: </b> {heightMeters}M
                </Text>
                {payloadWeight?.length > 0 ? (
                  <>
                    <Text>
                      <b>Capacidade de carga: </b>
                    </Text>

                    {payloadWeight?.map((payload) => (
                      <UnorderedList>
                        <ListItem>Peso: {payload?.kg}KG</ListItem>
                      </UnorderedList>
                    ))}
                  </>
                ) : (
                  <Text>
                    <b>Capacidade de carga: </b> Sem informações...
                  </Text>
                )}

                <Text fontWeight="600">Lista de motores: </Text>
                <UnorderedList>
                  <ListItem>Quantidade: {engines?.number}</ListItem>
                  <ListItem>Tipo: {engines?.type}</ListItem>
                </UnorderedList>
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

export default RocketCard;
