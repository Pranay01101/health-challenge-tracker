import { Component, Input, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatListModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnChanges {
  @Input() workouts: { username: string, type: string, minutes: number }[] = [];

  searchTerm: string = '';
  filterType: string = '';
  workoutTypes = ['Running', 'Cycling', 'Swimming'];
  filteredWorkouts: { username: string, type: string, minutes: number }[] = [];
  paginatedWorkouts: { username: string, type: string, minutes: number }[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['workouts']) {
      this.filterWorkouts();
    }
  }

  filterWorkouts() {
    this.filteredWorkouts = this.workouts.filter(workout =>
      workout.type.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.filterType === '' || workout.type === this.filterType)
    );
    this.paginateWorkouts();
  }

  paginateWorkouts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedWorkouts = this.filteredWorkouts.slice(start, end);
    this.totalPages = Math.ceil(this.filteredWorkouts.length / this.itemsPerPage);
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateWorkouts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateWorkouts();
    }
  }
}
