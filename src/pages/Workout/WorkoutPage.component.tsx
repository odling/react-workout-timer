import { useCallback, useState } from 'react';
import { WorkoutTracker } from '../../components';
import { IWarmup, IWorkout } from '../../types';
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

const workout: IWorkout = {
  rounds: 3,
  restBetweenRounds: 5,
  description: 'Week 1 - Upper Body',
  useDefaultWarmup: true,
  exercises: [
    {
      type: 'exercise',
      description: 'Chinups',
      quantity: 10,
      isRepBased: true,
    },
    {
      type: 'rest',
      description: 'Rest',
      quantity: 30,
    },
    {
      type: 'exercise',
      description: 'Regular Pushups',
      quantity: 15,
      isRepBased: true,
    },
    {
      type: 'rest',
      description: 'Rest',
      quantity: 30,
    },
    {
      type: 'exercise',
      description: '90 Degree Pullup Holds',
      quantity: 15,
    },
    {
      type: 'rest',
      description: 'Rest',
      quantity: 35,
    },
    {
      type: 'exercise',
      description: 'Reverse Chair Dips',
      quantity: 15,
      isRepBased: true,
    },
    {
      type: 'rest',
      description: 'Rest',
      quantity: 45,
    },
    {
      type: 'exercise',
      description: 'Shoulder Press Ups',
      quantity: 10,
      isRepBased: true,
    },

    {
      type: 'exercise',
      description: 'Chinups',
      quantity: 10,
      isRepBased: true,
    },
    {
      type: 'rest',
      description: 'Rest',
      quantity: 30,
    },
    {
      type: 'exercise',
      description: 'Regular Pushups',
      quantity: 15,
      isRepBased: true,
    },
    {
      type: 'rest',
      description: 'Rest',
      quantity: 30,
    },
    {
      type: 'exercise',
      description: '90 Degree Pullup Holds',
      quantity: 15,
    },
    {
      type: 'rest',
      description: 'Rest',
      quantity: 35,
    },
    {
      type: 'exercise',
      description: 'Reverse Chair Dips',
      quantity: 15,
      isRepBased: true,
    },
    {
      type: 'rest',
      description: 'Rest',
      quantity: 45,
    },
    {
      type: 'exercise',
      description: 'Shoulder Press Ups',
      quantity: 10,
      isRepBased: true,
    },
  ],
};

const defaultWarmup: IWarmup = {
  description: 'Warmup',
  rounds: 1,
  restBetweenRounds: 0,
  exercises: [
    {
      description: 'Jumping Jacks',
      quantity: 3,
      type: 'exercise',
    },
    {
      type: 'rest',
      description: 'Rest',
      quantity: 4,
    },
    {
      description: 'Arm Circles',
      quantity: 3,
      type: 'exercise',
    },
  ],
};

type WorkoutMode = 'idle' | 'workout' | 'warmup';

const WorkoutPage = () => {
  const [mode, setMode] = useState<WorkoutMode>('idle');

  const handleStartWorkout = useCallback(() => {
    onWarmupModalClose();
    setMode('workout');
  }, []);

  const handleStartWarmup = useCallback(() => {
    onWarmupModalClose();
    setMode('warmup');
  }, []);

  const handleFinished = useCallback(() => {
    setMode('idle');
  }, []);

  const {
    isOpen: isWarmupModalOpen,
    onOpen: onWarmupModalOpen,
    onClose: onWarmupModalClose,
  } = useDisclosure();

  return (
    <>
      <section className="h-full min-h-[500px] flex justify-center items-center flex-col px-unit-md">
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
          <div className="h-full w-full md:w-80 lg:w-96 flex flex-col items-center">
            <ScrollShadow className="w-full" hideScrollBar size={50}>
              <h1 className="text-foreground font-semibold text-3xl text-center">
                {workout.description}
              </h1>
              <div className="columns-3 mt-unit-md text-foreground">
                <div className="flex flex-col items-center">
                  <span className="font-normal text-xs">Exercises</span>
                  <span className="font-bold text-xl">{workout.exercises.length}</span>
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
              className="mt-auto min-h-unit-xl"
              variant="solid"
              size="md"
              color="success"
              onPress={onWarmupModalOpen}
            >
              Go to workout
            </Button>
          </div>
        )}
      </section>
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

export default WorkoutPage;
