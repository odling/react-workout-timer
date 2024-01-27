import IWorkoutTrackerProps from './WorkoutTracker.interface';
import { Button, CircularProgress, Progress } from '@nextui-org/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCountdownTimer } from '../../hooks';
import exerciseStartSound from '../../assets/exercise-start.mp3';
import useSound from 'use-sound';
import ChevronLeft from '../../assets/chevron-left.svg?react';
import ChevronRight from '../../assets/chevron-right.svg?react';
import { useAnimate } from 'framer-motion';
import { IExercise } from '../../types';

const exercisePrepDuration = 2000;

const WorkoutTracker = (props: IWorkoutTrackerProps) => {
  const { data } = { ...defaultProps, ...props };
  const exerciseList = new Array<IExercise[]>(data.rounds)
    .fill(data.exercises)
    .flatMap((exercises, roundIndex) => {
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
    });

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const currentExercise = exerciseList[exerciseIndex] ?? {};
  const currentRound = Math.floor(exerciseIndex / (data.exercises.length + 1)) + 1;
  const isFinished = exerciseIndex === exerciseList.length;

  const [isStartSoundLoaded, setIsStartSoundLoaded] = useState(false);
  const handleStartSoundLoaded = useCallback(() => {
    setIsStartSoundLoaded(true);
  }, []);
  const [playExerciseStartSound] = useSound(exerciseStartSound, { onload: handleStartSoundLoaded });

  const [scope, animate] = useAnimate();
  const animateExerciseEnd = useCallback(
    () =>
      animate([
        ['svg', { opacity: 0, rotateY: 90 }, { duration: 0.35, ease: 'easeIn' }],
        ['svg', { opacity: 1, rotateY: 180 }, { duration: 0.65, ease: 'easeInOut' }],
      ]),
    [animate],
  );

  const { countdown, start, reset, pause, isRunning, isPaused } = useCountdownTimer({
    timer: currentExercise.isRepBased ? 9999 : currentExercise.quantity,
    resetOnExpire: false,
    expireImmediate: false,
    onExpire: async () => {
      if (exerciseIndex < exerciseList.length) {
        setExerciseIndex(exerciseIndex + 1);
        await animateExerciseEnd();
      }
    },
  });

  const switchTimerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (isFinished) return;
    reset();
    switchTimerRef.current = setTimeout(
      () => {
        start();
        isStartSoundLoaded && currentExercise.type === 'exercise' && playExerciseStartSound();
      },
      currentExercise.type === 'exercise' ? exercisePrepDuration : 0,
    );
    return () => {
      clearInterval(switchTimerRef.current);
    };
  }, [
    exerciseIndex,
    reset,
    start,
    currentExercise.type,
    playExerciseStartSound,
    isFinished,
    isStartSoundLoaded,
  ]);

  const checkIsRestingBetweenRounds = useCallback(
    (index: number, numberOfExercisesInRound: number) => {
      return (index + 1) % (numberOfExercisesInRound + 1) === 0;
    },
    [],
  );

  const handlePreviousClick = useCallback(() => {
    if (exerciseIndex <= 0) return;
    if (checkIsRestingBetweenRounds(exerciseIndex - 1, data.exercises.length)) {
      setExerciseIndex(exerciseIndex - 2);
    } else {
      setExerciseIndex(exerciseIndex - 1);
    }
  }, [exerciseIndex, checkIsRestingBetweenRounds, data.exercises.length]);

  const handleNextClick = useCallback(() => {
    if (exerciseIndex >= exerciseList.length) return;
    setExerciseIndex(exerciseIndex + 1);
  }, [exerciseIndex, exerciseList.length]);

  const handleClick = useCallback(async () => {
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
    isPaused,
    pause,
    start,
    currentExercise.isRepBased,
    handleNextClick,
    animateExerciseEnd,
    reset,
  ]);

  return !isFinished ? (
    <>
      <div className="h-20 flex flex-col justify-between items-center">
        {!checkIsRestingBetweenRounds(exerciseIndex, data.exercises.length) && (
          <p className="text-foreground font-medium text-lg">{`Round ${currentRound}`}</p>
        )}
        <h2 className="text-foreground font-semibold text-3xl mt-auto">
          {isPaused ? 'Paused' : currentExercise.description}
        </h2>
      </div>
      <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex justify-center" ref={scope}>
        <CircularProgress
          onClick={() => void handleClick()}
          aria-label="Remaining duration"
          classNames={{
            svg: `w-full h-full drop-shadow-md stroke-1 scale-x-flip`,
            track: 'stroke-white/10',
            value: 'text-2xl md:text-3xl font-semibold text-foreground',
          }}
          color={!isRunning ? 'default' : currentExercise.type === 'rest' ? 'primary' : 'danger'}
          value={currentExercise.isRepBased ? 1 : countdown / currentExercise.quantity}
          valueLabel={
            isPaused || (!isRunning && currentExercise.type !== 'rest') ? (
              <p className="w-full h-full text-foreground text-2xl font-medium italic flex items-center justify-center select-none">
                {isPaused ? 'Tap to continue' : 'Get ready!'}
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
      </div>
      <div className="w-full h-20 md:w-60 lg:w-64 flex items-end">
        <div className="flex items-center w-full gap-unit-sm">
          <Button variant="light" isIconOnly onClick={handlePreviousClick}>
            <ChevronLeft className="h-unit-md w-unit-md fill-foreground" />
          </Button>
          {exerciseList.map((_exercise, index) => (
            <Progress
              key={String(index)}
              aria-label="Loading..."
              color={isPaused ? 'default' : 'secondary'}
              value={index < exerciseIndex ? 1 : 0}
              maxValue={1}
              className="max-w-md"
              size="sm"
            />
          ))}
          <Button variant="light" isIconOnly onClick={handleNextClick}>
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
