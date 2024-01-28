import IWorkoutTrackerProps from './WorkoutTracker.interface';
import { Button, CircularProgress, Progress } from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCountdownTimer } from '../../hooks';
import useSound from 'use-sound';
import { useAnimate } from 'framer-motion';
import { IExercise } from '../../types';
import NoSleep from '@marsgames/nosleep.js';
import exerciseStartSound from '../../assets/exercise-start.mp3';
import exerciseEndSound from '../../assets/exercise-end.mp3';
import ChevronLeft from '../../assets/chevron-left.svg?react';
import ChevronRight from '../../assets/chevron-right.svg?react';

const noSleep = new NoSleep(true);
const exercisePrepDuration = 2000;

const WorkoutTracker = (props: IWorkoutTrackerProps) => {
  const { data, onFinished } = { ...defaultProps, ...props };
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
    if (!isStarted) return;
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
  }, [isStarted, exerciseIndex, reset, start, currentExercise.type, playExerciseStartSound]);

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
    const handleStayAwake = async () => {
      await noSleep.enable();
    };
    void handleStayAwake();
    window.addEventListener('blur', pause);
    return () => {
      noSleep.disable();
      window.removeEventListener('blur', pause);
    };
  }, [pause]);

  return (
    <>
      {exerciseIndex < exerciseList.length ? (
        <>
          <div className="h-24 w-64 flex flex-col justify-between items-center pb-4">
            {(exerciseIndex + 1) % (data.exercises.length + 1) !== 0 && (
              <p className="text-foreground font-medium text-lg">{`Round ${currentRound}`}</p>
            )}
            <h2 className="text-foreground font-semibold text-3xl mt-auto">
              {isPaused ? 'Paused' : currentExercise.description}
            </h2>
          </div>
          <Button
            variant="bordered"
            disableRipple
            className="w-64 h-64 flex justify-center p-0 border-none"
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
              color={
                !isRunning ? 'default' : currentExercise.type === 'rest' ? 'primary' : 'danger'
              }
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
        </>
      ) : (
        <div className="w-full h-80 mb-8 flex flex-col gap-unit-lg items-center justify-center">
          <p className="text-foreground text-center text-4xl font-medium">Workout finished!</p>
          <Button variant="solid" color="success" size="lg" onPress={onFinished}>
            Go to workout details
          </Button>
        </div>
      )}
      <div className="w-80 max-w-80 h-24 flex flex-col justify-start items-center">
        <p className="text-foreground font-medium text-lg">{data.description}</p>
        <div className="flex items-center w-full gap-unit-sm">
          <Button
            variant="light"
            isIconOnly
            onPress={handlePreviousClick}
            isDisabled={!isStarted || exerciseIndex === 0}
          >
            <ChevronLeft className="h-unit-md w-unit-md fill-foreground" />
          </Button>
          <Progress
            aria-label="Loading..."
            color={
              exerciseIndex === exerciseList.length
                ? 'success'
                : !isRunning
                  ? 'default'
                  : currentExercise.type === 'rest'
                    ? 'primary'
                    : 'danger'
            }
            value={exerciseIndex / exerciseList.length}
            maxValue={1}
            size="md"
          />
          <Button
            variant="light"
            isIconOnly
            onPress={handleNextClick}
            isDisabled={!isStarted || exerciseIndex === exerciseList.length}
          >
            <ChevronRight className="h-unit-md w-unit-md fill-foreground" />
          </Button>
        </div>
        {exerciseIndex < exerciseList.length && (
          <Button variant="flat" onPress={() => undefined}>
            Quit
          </Button>
        )}
      </div>
    </>
  );
};

const defaultProps = {
  onFinished: () => undefined,
  onQuit: () => undefined,
};
WorkoutTracker.defaultProps = defaultProps;

export default WorkoutTracker;
