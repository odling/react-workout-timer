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
} from '@nextui-org/react';

const workout: IWorkout = {
  rounds: 3,
  restBetweenRounds: 5,
  description: 'Week 1 - Upper Body',
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
    <div className="py-unit-2xl h-full">
      <section className="h-full min-h-[500px] flex justify-center items-center flex-col px-unit-md">
        {mode === 'warmup' ? (
          <WorkoutTracker
            key={'warmupTracker'}
            finishMessage="Warmup finished!"
            finishButtonText="Start workout"
            data={defaultWarmup}
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
            <h2>{workout.description}</h2>
            <Button variant="solid" color="success" size="lg" onPress={onWarmupModalOpen}>
              Go to workout
            </Button>
          </>
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
            <Button color="success" variant="light" onPress={handleStartWarmup}>
              Ok
            </Button>
            <Button color="default" variant="light" onPress={handleStartWorkout}>
              Skip
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WorkoutPage;
