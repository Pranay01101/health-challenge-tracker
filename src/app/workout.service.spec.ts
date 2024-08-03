import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and get workouts', () => {
    const workout = { type: 'Running', minutes: 30 };
    service.saveWorkout(workout);
    const workouts = service.getWorkouts();
    expect(workouts).toContain(workout);
  });

  it('should clear all workouts', () => {
    const workout = { type: 'Running', minutes: 30 };
    service.saveWorkout(workout);
    service.clearWorkouts();
    expect(service.getWorkouts()).toEqual([]);
  });
});
