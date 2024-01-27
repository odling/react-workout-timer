import { useCallback, useEffect, useReducer } from 'react';

type Actions =
  | { type: 'START' }
  | { type: 'RESET'; payload: number }
  | { type: 'PAUSE' }
  | { type: 'TICK'; payload: number };

interface IState {
  canTick: boolean;
  countdown: number;
  isRunning: boolean;
  isPaused: boolean;
}

function reducer(state: IState, action: Actions) {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        canTick: true,
        isRunning: true,
        isPaused: false,
      };
    case 'RESET':
      return {
        ...state,
        countdown: action.payload,
        canTick: false,
        isRunning: false,
        isPaused: false,
      };
    case 'PAUSE':
      return {
        ...state,
        canTick: false,
        isRunning: false,
        isPaused: true,
      };
    case 'TICK':
      return {
        ...state,
        countdown: state.countdown - action.payload,
        isRunning: true,
        isPaused: false,
      };
    /* istanbul ignore next */
    default:
      return state;
  }
}

export interface ICountdownTimerParams {
  /**
   * Countdown time in seconds.
   */
  timer: number;
  /**
   * Default: 1000.
   * Interval between ticks in seconds.
   */
  interval?: number;
  /**
   * Default: false.
   * Determines if the countdown will start ticking on mount. This value has no effect on
   * a timer after it has expired or been reset.
   */
  autostart?: boolean;
  /**
   * Default: false
   * Determines if the countdown will expire immediately when ticking to 0. If false,
   * the timer will first set countdown to 0 and then expire on the next interval tick.
   */
  expireImmediate?: boolean;
  /**
   * Default: true.
   * Reset the countdown to it's initial value after expiration. If false,
   * the countdown will remain at 0 in a non-running state until reset.
   */
  resetOnExpire?: boolean;
  /**
   * Callback fired on countdown expiration.
   */
  onExpire?: () => void | Promise<void>;
  /**
   * Callback fired when countdown is reset, either by setting resetOnExpire to true
   * or explicitly calling the reset method.
   */
  onReset?: () => void;
}

export interface ICountdownTimerResults {
  /**
   * Current value of the countdown.
   */
  countdown: number;
  /**
   * Is the countdown currently ticking.
   */
  isRunning: boolean;
  /**
   * Is the countdown currently paused.
   */
  isPaused: boolean;
  /**
   * Start a non-running and non-expired timer. If countdown has expired and
   * resetOnExpire = false, reset must be called before starting again.
   */
  start: () => void;
  /**
   * Reset a countdown to it's initial state.
   */
  reset: () => void;
  /**
   * Pause a running countdown.
   */
  pause: () => void;
}

/**
 * Create a configurable countdown timer.
 */
export default function useCountdownTimer({
  timer,
  interval = 1,
  autostart = false,
  expireImmediate = false,
  resetOnExpire = true,
  onExpire,
  onReset,
}: ICountdownTimerParams): ICountdownTimerResults {
  const [state, dispatch] = useReducer(reducer, {
    canTick: autostart,
    countdown: timer,
    isRunning: false,
    isPaused: false,
  });

  const start = useCallback(() => {
    dispatch({ type: 'START' });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, []);

  const initStopped = useCallback((time: number) => {
    dispatch({ type: 'RESET', payload: time });
  }, []);

  const reset = useCallback(() => {
    initStopped(timer);
    if (onReset && typeof onReset === 'function') {
      onReset();
    }
  }, [timer, onReset, initStopped]);

  const expire = useCallback(() => {
    initStopped(resetOnExpire ? timer : 0);
    if (onExpire && typeof onExpire === 'function') {
      void onExpire();
    }
  }, [timer, onExpire, resetOnExpire, initStopped]);

  useEffect(() => {
    function tick() {
      if (state.countdown <= 0 || (expireImmediate && state.countdown - interval <= 0)) {
        expire();
      } else {
        dispatch({ type: 'TICK', payload: interval });
      }
    }

    let id: NodeJS.Timeout;
    if (state.canTick) {
      id = setInterval(tick, interval * 1000);
    }
    return () => clearInterval(id);
  }, [
    expire,
    expireImmediate,
    interval,
    state.canTick,
    state.countdown,
    state.isRunning,
    state.isPaused,
  ]);

  return {
    countdown: state.countdown,
    isRunning: state.isRunning,
    isPaused: state.isPaused,
    start,
    reset,
    pause,
  };
}
