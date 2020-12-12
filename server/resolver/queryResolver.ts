import { Timer } from '../entities/timer';
import { dataStore } from '../server';
import { RootQueryTimerArgs, RootQueryTimersArgs } from '../types/generated/graphql';

const queryResolver = {
  RootQuery: {
    timer(_: unknown, { id }: RootQueryTimerArgs) {
      return new Timer(id, dataStore);
    },
    timers(_: unknown, paginationParameters: RootQueryTimersArgs) {
      const timersList = dataStore.getTimersList(paginationParameters);
      return timersList;
    },
  },
};

export default queryResolver;
