import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../../+state/reducers';
import { GetUsersAction, DeleteUserAction } from '../../+state/actions/user.actions';
import * as userSelectors from '../../+state/selectors/user.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  dataSource: MatTableDataSource<User>;
  displayedColumns = ['userId', 'firstName', 'lastName', 'displayName', 'buttons'];

  loading$: Observable<boolean>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<State>,
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.store.pipe(select(userSelectors.selectUsers))
      .subscribe(users => {
        this.dataSource.data = users;
      });

    this.loading$ = this.store.pipe(select(userSelectors.selectLoading));

  }

  getUsers() {
    this.store.dispatch(new GetUsersAction());
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onEdit(userId: number) {
    this.router.navigate(['./profile', userId], { relativeTo: this.activatedRoute });
  }

  onCreate() {
    this.router.navigate(['./profile'], { relativeTo: this.activatedRoute });
  }

  onDelete(userId: number) {
    this.store.dispatch(new DeleteUserAction(userId.toString()));
  }
}
