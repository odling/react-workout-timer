interface IAppConfig {
  /** Prep duration before exercise starts in seconds */
  exercisePrepDuration: number;
}

const appConfig: IAppConfig = {
  exercisePrepDuration: 2,
};

export default appConfig;
