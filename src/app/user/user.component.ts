import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from './+state/reducers';
import { GetUsersAction } from './+state/actions/user.actions';
import * as userSelectors from './+state/selectors/user.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.pipe(
      select(userSelectors.selectAnyUsers)
    ).subscribe(any => {
      if (!any) {
        this.store.dispatch(new GetUsersAction());
      }
    });

  }

}
