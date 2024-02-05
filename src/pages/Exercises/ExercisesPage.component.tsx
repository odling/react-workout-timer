import {
  Divider,
  ScrollShadow,
  Card,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  useDisclosure,
  Input,
  ModalFooter,
} from '@nextui-org/react';
import { useAddExerciseMutation, useGetExercisesQuery } from '../../redux/features/exercisesApi';
import { useCallback } from 'react';

const ExercisesPage = () => {
  const { data: exercisesData } = useGetExercisesQuery();
  console.log(exercisesData);

  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  const [addExercise] = useAddExerciseMutation();
  const handleAddExercise = useCallback(() => {
    void (async () => {
      try {
        await addExercise({ description: 'TEST' }).unwrap();
      } catch (e) {
        console.log(e);
      }
    })();
  }, [addExercise]);

  return (
    <section className="page-wrapper">
      <h1 className="text-foreground font-semibold text-3xl text-center">Exercises</h1>
      <Divider className="my-unit-md" />
      <ScrollShadow className="w-full flex-1 min-h-[200px]" hideScrollBar size={50}>
        {exercisesData && exercisesData.length > 0 && (
          <ul className="flex-1 flex flex-col gap-unit-md px-unit-sm pb-unit-xs">
            {exercisesData.map((exercise) => (
              <li key={exercise.id}>
                <Card shadow="sm" radius="md">
                  <CardBody>
                    <div className="w-full flex justify-between items-center text-foreground gap-unit-sm">
                      <p className="font-bold text-md break-all">{exercise.description}</p>
                    </div>
                  </CardBody>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </ScrollShadow>
      <Divider className="my-unit-md" />
      <Button fullWidth variant="solid" size="md" color="success" onPress={onModalOpen}>
        Add new exercise
      </Button>
      <Modal
        size="lg"
        isOpen={isModalOpen}
        onClose={onModalClose}
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          <ModalHeader>New Exercise</ModalHeader>
          <ModalBody>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <Input
                name="description"
                isRequired
                label="Description"
                placeholder="Enter exercise description"
                type="text"
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              fullWidth
              variant="solid"
              size="md"
              color="success"
              type="submit"
              onPress={handleAddExercise}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default ExercisesPage;
