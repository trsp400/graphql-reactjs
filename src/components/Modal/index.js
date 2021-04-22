import { useEffect, useState } from 'react';
import {
  Input,
  Select,
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';

import DateTimePicker from 'react-datetime-picker';

const Modal = ({
  launchData,
  states,
  setStates,
  isModalVisible,
  setIsModalVisible,
  onSave,
}) => {
  const [date, setDate] = useState(new Date());
  const { launchpads, rockets } = launchData;

  useEffect(() => {
    setStates('launchDate', date);
  }, [date]);

  return (
    <ChakraModal
      isOpen={isModalVisible}
      onClose={() => setIsModalVisible(!isModalVisible)}
      isCentered
      scrollBehavior="inside"
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar novo lançamento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired paddingBottom="2">
            <Input
              placeholder="Nome"
              value={states?.launchName}
              onChange={event => setStates('launchName', event?.target?.value)}
            />
          </FormControl>
          <FormControl isRequired paddingBottom="2">
            <FormLabel>Data</FormLabel>
            <DateTimePicker onChange={setDate} value={states?.launchDate} />
          </FormControl>
          <FormControl paddingBottom="2">
            <FormLabel>Local de lançamento</FormLabel>
            <Select
              value={states?.launchSite}
              placeholder="Selecione uma opção"
              onChange={event => setStates('launchSite', event?.target?.value)}
            >
              {launchpads?.length > 0 ? (
                launchpads?.map(site => (
                  <option key={site?.name} value={site?.name}>
                    {site?.name}
                  </option>
                ))
              ) : (
                <option value="No options">
                  Não foram encontrados locais de lançamento
                </option>
              )}
            </Select>
          </FormControl>
          <FormControl paddingBottom="2">
            <FormLabel>Foguete</FormLabel>
            <Select
              placeholder="Selecione uma opção"
              value={states?.launchRocket}
              onChange={event =>
                setStates('launchRocket', event?.target?.value)
              }
            >
              {rockets?.length > 0 ? (
                rockets?.map(rocket => (
                  <option key={rocket?.name} value={rocket?.name}>
                    {rocket?.name}
                  </option>
                ))
              ) : (
                <option value="No options">
                  Não foram encontrados locais de lançamento
                </option>
              )}
            </Select>
          </FormControl>
          <FormControl>
            <Textarea
              placeholder="Descrição do lançamento"
              value={states?.launchDescription}
              onChange={event =>
                setStates('launchDescription', event?.target?.value)
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => setIsModalVisible(!isModalVisible)}
            variant="ghost"
            mr={3}
          >
            Fechar
          </Button>
          <Button colorScheme="blue" onClick={onSave}>
            Cadastrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
