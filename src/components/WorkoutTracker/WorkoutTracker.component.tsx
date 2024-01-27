import IWorkoutTrackerProps from './WorkoutTracker.interface';
import { Button, CircularProgress, Progress } from '@nextui-org/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCountdownTimer } from '../../hooks';
import exerciseStartSound from '../../assets/exercise-start.mp3';
import useSound from 'use-sound';
import ChevronLeft from '../../assets/chevron-left.svg?react';
import ChevronRight from '../../assets/chevron-right.svg?react';
import { useAnimate } from 'framer-motion';

const exercisePrepDuration = 2000;

const WorkoutTracker = (props: IWorkoutTrackerProps) => {
  const { data } = { ...defaultProps, ...props };
  const exercises = data.exercises;

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const { quantity, description, type, repBased } = exercises[exerciseIndex] ?? {};
  const isFinished = exerciseIndex === exercises.length;

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
    timer: repBased ? 9999 : quantity,
    resetOnExpire: false,
    expireImmediate: false,
    onExpire: async () => {
      if (exerciseIndex < exercises.length) {
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
        isStartSoundLoaded && type === 'exercise' && playExerciseStartSound();
      },
      type === 'exercise' ? exercisePrepDuration : 0,
    );
    return () => {
      clearInterval(switchTimerRef.current);
    };
  }, [exerciseIndex, reset, start, type, playExerciseStartSound, isFinished, isStartSoundLoaded]);

  const handlePreviousClick = useCallback(() => {
    if (exerciseIndex > 0) {
      setExerciseIndex(exerciseIndex - 1);
    }
  }, [exerciseIndex]);

  const handleNextClick = useCallback(() => {
    if (exerciseIndex < exercises.length) {
      setExerciseIndex(exerciseIndex + 1);
    }
  }, [exerciseIndex, exercises.length]);

  const handleClick = useCallback(async () => {
    if (isPaused) {
      start();
      return;
    }
    if (repBased) {
      reset();
      handleNextClick();
      await animateExerciseEnd();
      return;
    }
    pause();
    clearTimeout(switchTimerRef.current);
  }, [isPaused, pause, start, repBased, handleNextClick, animateExerciseEnd, reset]);

  return !isFinished ? (
    <>
      <h2 className="text-foreground font-semibold text-3xl h-20">
        {isPaused ? 'Paused' : description}
      </h2>
      <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex justify-center" ref={scope}>
        <CircularProgress
          onClick={() => void handleClick()}
          aria-label="Remaining duration"
          classNames={{
            svg: `w-full h-full drop-shadow-md stroke-1 scale-x-flip`,
            track: 'stroke-white/10',
            value: 'text-2xl md:text-3xl font-semibold text-foreground',
          }}
          color={!isRunning ? 'default' : type === 'rest' ? 'primary' : 'danger'}
          value={repBased ? 1 : countdown / quantity}
          valueLabel={
            isPaused || (!isRunning && type !== 'rest') ? (
              <p className="w-full h-full text-foreground text-2xl font-medium italic flex items-center justify-center select-none">
                {isPaused ? 'Tap to continue' : 'Get ready!'}
              </p>
            ) : (
              <p className="w-full h-full text-foreground text-3xl font-medium flex items-center justify-center select-none">
                {repBased ? `${quantity} reps` : String(countdown)}
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
          {exercises.map((_exercise, index) => (
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
