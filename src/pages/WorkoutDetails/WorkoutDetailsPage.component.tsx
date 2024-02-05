import { useCallback, useState } from 'react';
import { WorkoutTracker } from '../../components';
import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Card,
  CardBody,
  ScrollShadow,
  Divider,
} from '@nextui-org/react';
import { defaultWarmup, workouts } from '../../workoutData';
import { useParams } from 'react-router-dom';

type WorkoutMode = 'idle' | 'workout' | 'warmup';

const WorkoutDetailsPage = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const workout = workouts.find((workout) => workout.id === workoutId);

  const [mode, setMode] = useState<WorkoutMode>('idle');

  const {
    isOpen: isWarmupModalOpen,
    onOpen: onWarmupModalOpen,
    onClose: onWarmupModalClose,
  } = useDisclosure();

  const handleStartWorkout = useCallback(() => {
    onWarmupModalClose();
    setMode('workout');
  }, [onWarmupModalClose]);

  const handleStartWarmup = useCallback(() => {
    onWarmupModalClose();
    setMode('warmup');
  }, [onWarmupModalClose]);

  const handleFinished = useCallback(() => {
    setMode('idle');
  }, []);

  return (
    <>
      {workout && (
        <section className="page-wrapper">
          {mode === 'warmup' ? (
            <WorkoutTracker
              key={'warmupTracker'}
              finishMessage="Warmup finished!"
              finishButtonText="Start workout"
              data={workout.useDefaultWarmup ? defaultWarmup : workout.warmup ?? defaultWarmup}
              onFinished={handleStartWorkout}
              onQuit={handleStartWorkout}
            />
          ) : mode === 'workout' ? (
            <WorkoutTracker
              key={'workoutTracker'}
              finishMessage="Workout finished!"
              finishButtonText="Go to workout details"
              data={workout}
              onFinished={handleFinished}
              onQuit={handleFinished}
            />
          ) : (
            <>
              <h1 className="text-foreground font-semibold text-3xl text-center line-clamp-2 text-ellipsis break-all">
                {workout.description}
              </h1>
              <div className="columns-3 mt-unit-md text-foreground">
                <div className="flex flex-col items-center">
                  <span className="font-normal text-xs">Exercises</span>
                  <span className="font-bold text-xl">
                    {workout.exercises.filter((exercise) => exercise.type === 'exercise').length}
                  </span>
                </div>
                <div className="flex flex-col items-center  ">
                  <span className="font-normal text-xs">Rounds</span>
                  <span className="font-bold text-xl">{workout.rounds}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-normal text-xs">Rest Between</span>
                  <span className="font-bold text-xl">{`${workout.restBetweenRounds}s`}</span>
                </div>
              </div>
              <Divider className="my-unit-md" />
              <ScrollShadow className="w-full flex-1 min-h-[200px]" hideScrollBar size={40}>
                <ul className="flex-1 flex flex-col gap-unit-md px-unit-sm pb-unit-xs">
                  {workout.exercises.map((exercise, index) => {
                    return (
                      <li key={index}>
                        <Card shadow="sm" radius="md">
                          <CardBody>
                            <div className="w-full flex justify-between items-center text-foreground gap-unit-sm">
                              <p className="font-bold text-md break-all">{exercise.description}</p>
                              <div className="flex flex-col items-center">
                                <span
                                  className={`font-semibold text-md text-${exercise.type === 'exercise' ? 'success' : 'primary'}`}
                                >
                                  {exercise.quantity}
                                </span>
                                <span className="font-normal text-xs">
                                  {exercise.isRepBased ? 'Reps' : 'Sec'}
                                </span>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </li>
                    );
                  })}
                </ul>
              </ScrollShadow>
              <Divider className="my-unit-md" />
              <Button
                fullWidth
                variant="solid"
                size="md"
                color="success"
                onPress={onWarmupModalOpen}
              >
                Go to workout
              </Button>
            </>
          )}
        </section>
      )}
      <Modal
        size="xs"
        isOpen={isWarmupModalOpen}
        onClose={onWarmupModalClose}
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Warmup</ModalHeader>
          <ModalBody>
            <p>Do you want to warmup first?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="success" variant="solid" onPress={handleStartWarmup}>
              Yes
            </Button>
            <Button color="default" variant="light" onPress={handleStartWorkout}>
              Skip Warmup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorkoutDetailsPage;
