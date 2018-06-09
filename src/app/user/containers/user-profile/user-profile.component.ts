import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../models/user';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../../+state/reducers';
import { filter, take, switchMap } from 'rxjs/operators';
import * as userSelectors from '../../+state/selectors/user.selectors';
import { SelectUserAction } from '../../+state/actions/user.actions';
import { SaveUserAction } from '../../+state/actions/user.actions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  loading = false;
  saving = false;
  error$: Observable<string>;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) { }

  ngOnInit() {

    this.createForm();
    this.activatedRoute.params
      .subscribe(params => {
        const id = params['id']; // () converts string 'id' to a number
        if (id) {
          this.selectUser(id);
        }
      });

  }

  loadUser() {
    this.store.pipe(
      select(userSelectors.selectSelectedUser),
      filter(user => !!user),
      take(1)
    )
      .subscribe(user => {
        this.userForm.reset(user);
        this.loading = false;
      });
  }

  revert() {
    if (this.userForm.value.userId) {
      this.loadUser();
    } else {
      this.userForm.reset();
    }
  }

  private selectUser(userId: number) {
    this.loading = true;
    this.store.dispatch(new SelectUserAction(userId.toString()));
    this.loadUser();
  }

  private createForm() {
    this.userForm = this.formBuilder.group({
      userId: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      displayName: null
    });
  }

  private prepareUser(): User {
    const userModel = this.userForm.value;

    const saveUser: User = {
      userId: !userModel.userId ? 0 : userModel.userId,
      firstName: userModel.firstName,
      lastName: userModel.lastName,
      displayName: userModel.displayName
    };
    return saveUser;
  }

  onSubmit() {
    this.saving = true;
    const user = this.prepareUser();
    const created = user.userId === 0;
    this.store.dispatch(new SaveUserAction(user));

    this.store.pipe(
      select(userSelectors.selectSaving),
      filter(saving => !saving),
      switchMap(_ => this.store.pipe(select(userSelectors.selectSelectedUser))),
      take(1)
    ).subscribe(user => {
      if (created) {
        this.router.navigate(['./', user.userId], { relativeTo: this.activatedRoute });
      } else {
        this.userForm.reset(user);
      }
      this.saving = false;
    })

  }

}