import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  userId: number;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.createForm();
    this.activatedRoute.params.subscribe(params => {
      const id = +params['id']; // (+) converts string 'id' to a number
      if (id) {
        this.loadUser(id);
      }
    });

  }

  getUser(userId: number) {
    this.router.navigate(['./', userId], { relativeTo: this.activatedRoute });
  }

  revert() {
    if (this.userForm.value.userId) {
      this.getUser(this.userForm.value.userId);
    } else {
      this.userForm.reset();
    }
  }

  private loadUser(userId: number) {
    this.loading = true;
    this.userService.getUser$(userId).subscribe(user => {
      this.userForm.patchValue(user);
    },
      error => {
        this.userForm.reset({ createUser: false });
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
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
    this.userService.saveUser$(user).subscribe(apiUser => {
      if (apiUser && created) {
        this.getUser(apiUser.userId);
      }
      if (!created) {
        this.userForm.reset(apiUser);
      }
      this.saving = false;
    });
  }

}