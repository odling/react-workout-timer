import IWorkoutTrackerProps from './WorkoutTracker.interface';
import { Button, CircularProgress, Progress } from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCountdownTimer } from '../../hooks';
import exerciseStartSound from '../../assets/exercise-start.mp3';
import exerciseEndSound from '../../assets/exercise-end.mp3';
import useSound from 'use-sound';
import ChevronLeft from '../../assets/chevron-left.svg?react';
import ChevronRight from '../../assets/chevron-right.svg?react';
import { useAnimate } from 'framer-motion';
import { IExercise } from '../../types';
// import NoSleep from '@zakj/no-sleep';

// const noSleep = new NoSleep();
const exercisePrepDuration = 2000;

const WorkoutTracker = (props: IWorkoutTrackerProps) => {
  const { data } = { ...defaultProps, ...props };
  const exerciseList = useMemo(
    () =>
      new Array<IExercise[]>(data.rounds).fill(data.exercises).flatMap((exercises, roundIndex) => {
        if (roundIndex < data.rounds - 1) {
          return [
            ...exercises,
            {
              type: 'rest',
              description: `Round ${roundIndex + 1} cleared!`,
              quantity: data.restBetweenRounds,
            } as IExercise,
          ];
        }
        return exercises;
      }),
    [data],
  );

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const currentExercise = exerciseList[exerciseIndex] ?? {};
  const currentRound = Math.floor(exerciseIndex / (data.exercises.length + 1)) + 1;
  const [isStarted, setIsStarted] = useState(false);
  const isFinished = exerciseIndex === exerciseList.length;

  const [playExerciseStartSound] = useSound(exerciseStartSound);
  const [playExerciseEndSound] = useSound(exerciseEndSound);

  const [scope, animate] = useAnimate();
  const animateExerciseEnd = useCallback(
    () =>
      animate([
        ['svg', { opacity: 0, rotateY: 90 }, { duration: 0.35, ease: 'easeIn' }],
        ['svg', { opacity: 1, rotateY: 180 }, { duration: 0.65, ease: 'easeInOut' }],
      ]),
    [animate],
  );

  const handleExpire = useCallback(async () => {
    if (exerciseIndex < exerciseList.length) {
      setExerciseIndex(exerciseIndex + 1);
      playExerciseEndSound();
      await animateExerciseEnd();
    }
  }, [exerciseIndex, exerciseList.length, animateExerciseEnd, playExerciseEndSound]);

  const { countdown, start, reset, pause, isRunning, isPaused } = useCountdownTimer({
    timer: currentExercise.isRepBased ? 9999 : currentExercise.quantity,
    resetOnExpire: false,
    expireImmediate: false,
    onExpire: handleExpire,
  });

  const switchTimerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (!isStarted || isFinished) return;
    reset();
    switchTimerRef.current = setTimeout(
      () => {
        start();
        currentExercise.type === 'exercise' && playExerciseStartSound();
      },
      currentExercise.type === 'exercise' ? exercisePrepDuration : 0,
    );
    return () => {
      clearInterval(switchTimerRef.current);
    };
  }, [
    isStarted,
    exerciseIndex,
    reset,
    start,
    currentExercise.type,
    playExerciseStartSound,
    isFinished,
  ]);

  const handlePreviousClick = useCallback(() => {
    if (exerciseIndex <= 0) return;
    /** if previous exercise is a rest between rounds */
    if (exerciseIndex % (data.exercises.length + 1) === 0) {
      setExerciseIndex(exerciseIndex - 2);
    } else {
      setExerciseIndex(exerciseIndex - 1);
    }
  }, [exerciseIndex, data.exercises.length]);

  const handleNextClick = useCallback(() => {
    if (exerciseIndex >= exerciseList.length) return;
    setExerciseIndex(exerciseIndex + 1);
  }, [exerciseIndex, exerciseList.length]);

  const handleClick = useCallback(async () => {
    if (!isStarted) {
      setIsStarted(true);
      return;
    }
    if (isPaused) {
      start();
      return;
    }
    if (currentExercise.isRepBased) {
      reset();
      handleNextClick();
      await animateExerciseEnd();
      return;
    }
    pause();
    clearTimeout(switchTimerRef.current);
  }, [
    isStarted,
    isPaused,
    pause,
    start,
    currentExercise.isRepBased,
    handleNextClick,
    animateExerciseEnd,
    reset,
  ]);

  useEffect(() => {
    const handleStayAwake = () => {
      // noSleep.enable();
    };
    handleStayAwake();
    window.addEventListener('blur', pause);
    return () => {
      // noSleep.disable();
      window.removeEventListener('blur', pause);
    };
  }, [pause]);

  return !isFinished ? (
    <>
      <div className="h-24 flex flex-col justify-between items-center pb-4">
        {(exerciseIndex + 1) % (data.exercises.length + 1) !== 0 && (
          <p className="text-foreground font-medium text-lg">{`Round ${currentRound}`}</p>
        )}
        <h2 className="text-foreground font-semibold text-3xl mt-auto">
          {isPaused ? 'Paused' : currentExercise.description}
        </h2>
      </div>
      <Button
        isIconOnly
        variant="bordered"
        disableRipple
        className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex justify-center p-0 border-none"
        onPress={() => void handleClick()}
      >
        <CircularProgress
          ref={scope}
          aria-label="Remaining duration"
          classNames={{
            svg: `w-full h-full drop-shadow-md stroke-1 scale-x-flip`,
            track: 'stroke-white/10',
            value: 'text-2xl md:text-3xl font-semibold text-foreground',
          }}
          color={!isRunning ? 'default' : currentExercise.type === 'rest' ? 'primary' : 'danger'}
          value={currentExercise.isRepBased ? 1 : countdown / currentExercise.quantity}
          valueLabel={
            !isStarted || isPaused || (!isRunning && currentExercise.type !== 'rest') ? (
              <p className="w-full h-full text-foreground text-2xl font-medium italic flex items-center justify-center select-none">
                {!isStarted ? 'Tap to start' : isPaused ? 'Tap to continue' : 'Get ready!'}
              </p>
            ) : (
              <p className="w-full h-full text-foreground text-3xl font-medium flex items-center justify-center select-none">
                {currentExercise.isRepBased
                  ? `${currentExercise.quantity} reps`
                  : String(countdown)}
              </p>
            )
          }
          maxValue={1}
          showValueLabel
        />
      </Button>
      <div className="w-full h-24 md:w-60 lg:w-64 flex items-end">
        <div className="flex items-center w-full gap-unit-sm">
          <Button
            variant="light"
            isIconOnly
            onPress={handlePreviousClick}
            isDisabled={exerciseIndex === 0}
          >
            <ChevronLeft className="h-unit-md w-unit-md fill-foreground" />
          </Button>
          <Progress
            aria-label="Loading..."
            color={!isRunning ? 'default' : currentExercise.type === 'rest' ? 'primary' : 'danger'}
            value={exerciseIndex / exerciseList.length}
            maxValue={1}
            className="max-w-md"
            size="md"
          />
          <Button variant="light" isIconOnly onPress={handleNextClick}>
            <ChevronRight className="h-unit-md w-unit-md fill-foreground" />
          </Button>
        </div>
      </div>
    </>
  ) : (
    <p className="w-full h-full text-foreground text-4xl font-medium italic flex items-center justify-center">
      Workout is complete!
    </p>
  );
};

const defaultProps = {};
WorkoutTracker.defaultProps = defaultProps;

export default WorkoutTracker;
