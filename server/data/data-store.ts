import { Timer } from '../entities/timer';
import { dataStore } from '../server';
import {
  RootMutationCreateTimerArgs,
  RootMutationUpdateTimerArgs,
  RootQueryTimersArgs,
} from '../types/generated/graphql';
import timersDefinition from './timers.json';

export default class DataStore {
  private _timers: typeof timersDefinition;

  constructor() {
    this._timers = JSON.parse(JSON.stringify(timersDefinition));
  }

  get timers() {
    return this._timers;
  }

  createTimer({ timer }: RootMutationCreateTimerArgs) {
    const newTimer: typeof timersDefinition[0] = {
      // This is just a pseudo random ID, no need for a real one right now.
      // This should be replaced with a robust uuid
      id: Math.random().toString(),
      ...timer,
    };

    this.timers.push(newTimer);
    return newTimer;
  }

  updateTimer({ timer: timerUpdate }: RootMutationUpdateTimerArgs) {
    const existingTimer = this.timers.find((timer) => timer.id === timerUpdate.id);

    if (!existingTimer) {
      throw new Error(`The timer with the id: ${timerUpdate.id} could not be found`);
    }

    const timerIndex = this.timers.indexOf(existingTimer);

    this._timers[timerIndex] = timerUpdate;
    return timerUpdate;
  }

  getTimersList({ offset, limit, filter }: RootQueryTimersArgs) {
    if (filter) {
      const toLowerCaseFilter = filter.toLowerCase();
      const filteredTimers = this.timers.filter((timer) => timer.description.toLowerCase().includes(toLowerCaseFilter));
      return {
        totalCount: filteredTimers.length,
        timers: filteredTimers.slice(offset, offset + limit).map((timer) => new Timer(timer.id, dataStore)),
      };
    }

    return {
      totalCount: dataStore.timers.length,
      timers: dataStore.timers.slice(offset, offset + limit).map((timer) => new Timer(timer.id, dataStore)),
    };
  }
}
