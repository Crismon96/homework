import { RootMutationCreateTimerArgs, RootMutationUpdateTimerArgs } from '../types/generated/graphql';
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

  updateTimer(timerUpdate: RootMutationUpdateTimerArgs) {
    const existingTimer = this.timers.find((timer) => timer.id === timerUpdate.id);

    if (!existingTimer) {
      throw new Error(`The timer with the id: ${timerUpdate.id} could not be found`);
    }

    const timerIndex = this.timers.indexOf(existingTimer);

    this._timers.splice(timerIndex, 1, timerUpdate);
    return timerUpdate;
  }
}
