import { CircularProgress, Progress } from '@nextui-org/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCountdownTimer } from '../../hooks';

const workout = {
  name: 'test',
  items: [
    {
      type: 'exercise',
      name: 'High Knees',
      duration: 3000,
    },
    {
      type: 'break',
      name: 'Rest',
      duration: 4000,
    },
    {
      type: 'exercise',
      name: 'Squats',
      duration: 3000,
    },
  ],
};

const switchDuration = 2000;

const WorkoutPage = () => {
  const [exerciseIndex, setExerciseIndex] = useState(0);

  const exercises = workout.items;
  const { duration, name, type } = exercises[exerciseIndex] ?? {};

  const { countdown, start, reset, pause, isRunning, isPaused } = useCountdownTimer({
    timer: duration,
    resetOnExpire: false,
    expireImmediate: false,
    onExpire: () => {
      if (exerciseIndex < workout.items.length) {
        setExerciseIndex(exerciseIndex + 1);
      }
    },
  });

  const switchTimerRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    reset();
    switchTimerRef.current = setTimeout(
      () => {
        start();
      },
      type === 'exercise' ? switchDuration : 0,
    );
    return () => {
      clearInterval(switchTimerRef.current);
    };
  }, [exerciseIndex, reset, start, type]);

  const handleClick = useCallback(() => {
    if (isPaused) {
      start();
    } else {
      pause();
      clearTimeout(switchTimerRef.current);
    }
  }, [isPaused, pause, start]);

  const isFinished = exerciseIndex === exercises.length;

  return (
    <div className="py-unit-2xl h-full">
      <section className="h-full flex justify-center items-center flex-col px-unit-md">
        {!isFinished ? (
          <>
            <h2 className="text-foreground font-semibold text-3xl h-20">{name}</h2>
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex justify-center">
              <CircularProgress
                onClick={handleClick}
                aria-label="Remaining duration"
                classNames={{
                  svg: 'w-full h-full drop-shadow-md stroke-1',
                  track: 'stroke-white/10',
                  value: 'text-2xl md:text-3xl font-semibold text-foreground',
                }}
                color={!isRunning || type === 'break' ? 'default' : 'danger'}
                value={countdown / 1000}
                valueLabel={
                  isPaused || (!isRunning && type !== 'break') ? (
                    <p className="w-full h-full text-foreground text-2xl font-medium italic flex items-center justify-center">
                      {isPaused ? 'Tap to continue' : 'Get ready!'}
                    </p>
                  ) : null
                }
                maxValue={duration / 1000}
                showValueLabel
                formatOptions={{ unitDisplay: 'short' }}
              />
            </div>
            <div className="w-52 md:w-60 lg:w-64 h-20 gap-unit-sm flex items-end">
              {/* <ButtonGroup className="w-52 md:w-64 lg:w-80 h-20">
                <Button
                  fullWidth
                  color="success"
                  size="sm"
                  className="text-white font-normal text-sm"
                >
                  Pause
                </Button>
              </ButtonGroup> */}
              {exercises.map((_exercise, index) => (
                <Progress
                  key={String(index)}
                  aria-label="Loading..."
                  color="danger"
                  isStriped
                  value={index < exerciseIndex ? 1 : 0}
                  maxValue={1}
                  className="max-w-md"
                  size="md"
                />
              ))}
            </div>
          </>
        ) : (
          <p className="w-full h-full text-foreground text-4xl font-medium italic flex items-center justify-center">
            Workout is complete!
          </p>
        )}
      </section>
    </div>
  );
};

export default WorkoutPage;
