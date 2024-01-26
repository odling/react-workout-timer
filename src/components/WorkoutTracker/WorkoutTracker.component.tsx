import IWorkoutTrackerProps from './WorkoutTracker.interface';
import { Button, CircularProgress, Progress } from '@nextui-org/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCountdownTimer } from '../../hooks';
import exerciseStartSound from '../../assets/exercise-start.mp3';
import useSound from 'use-sound';
import ChevronLeft from '../../assets/chevron-left.svg?react';
import ChevronRight from '../../assets/chevron-right.svg?react';

const exercisePrepDuration = 2000;

const WorkoutTracker = (props: IWorkoutTrackerProps) => {
  const { data } = { ...defaultProps, ...props };
  const exercises = data.items;

  const [isStarted, setIsStarted] = useState(false);
  const handleStartWorkout = useCallback(() => {
    setIsStarted(true);
  }, []);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const { duration, name, type } = exercises[exerciseIndex] ?? {};
  const isFinished = exerciseIndex === exercises.length;

  const [playExerciseStartSound] = useSound(exerciseStartSound);

  const { countdown, start, reset, pause, isRunning, isPaused } = useCountdownTimer({
    timer: duration,
    resetOnExpire: false,
    expireImmediate: false,
    onExpire: () => {
      if (exerciseIndex < exercises.length) {
        setExerciseIndex(exerciseIndex + 1);
      }
    },
  });

  const switchTimerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (!isStarted || isFinished) return;
    reset();
    switchTimerRef.current = setTimeout(
      () => {
        start();
        playExerciseStartSound();
      },
      type === 'exercise' ? exercisePrepDuration : 0,
    );
    return () => {
      clearInterval(switchTimerRef.current);
    };
  }, [exerciseIndex, reset, start, type, playExerciseStartSound, isFinished, isStarted]);

  const handleClick = useCallback(() => {
    if (isPaused) {
      start();
    } else {
      pause();
      clearTimeout(switchTimerRef.current);
    }
  }, [isPaused, pause, start]);

  const handlePreviousClick = useCallback(() => {
    if (exerciseIndex > 0) {
      setExerciseIndex(exerciseIndex - 1);
    }
  }, [exerciseIndex]);

  const handleNextClick = useCallback(() => {
    if (exerciseIndex < exercises.length) {
      setExerciseIndex(exerciseIndex + 1);
    }
  }, [exerciseIndex]);

  return !isStarted ? (
    <Button
      color="success"
      size="lg"
      className="text-white font-normal text-lg"
      onClick={handleStartWorkout}
    >
      Start
    </Button>
  ) : !isFinished ? (
    <>
      <h2 className="text-foreground font-semibold text-3xl h-20">{isPaused ? 'Paused' : name}</h2>
      <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex justify-center">
        <CircularProgress
          onClick={handleClick}
          aria-label="Remaining duration"
          classNames={{
            svg: 'w-full h-full drop-shadow-md stroke-1',
            track: 'stroke-white/10',
            value: 'text-2xl md:text-3xl font-semibold text-foreground',
          }}
          color={!isRunning ? 'default' : type === 'break' ? 'primary' : 'danger'}
          value={(duration - countdown) / 1000}
          valueLabel={
            isPaused || (!isRunning && type !== 'break') ? (
              <p className="w-full h-full text-foreground text-2xl font-medium italic flex items-center justify-center">
                {isPaused ? 'Tap to continue' : 'Get ready!'}
              </p>
            ) : (
              String(countdown / 1000)
            )
          }
          maxValue={duration / 1000}
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
