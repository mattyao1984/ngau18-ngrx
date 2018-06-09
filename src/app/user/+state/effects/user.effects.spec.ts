import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserEffects } from './user.effects';
import { GetUsersAction, LoadUsersAction } from '../actions/user.actions';
import { User } from '../../models/user';
import { hot, cold } from 'jasmine-marbles';
import { UserService } from '../../user.service';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromRoot from '../../+state/reducers';

fdescribe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let metadata: EffectsMetadata<UserEffects>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers
        }),
      ],
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', ['getUsers$'])
        }
      ]
    });

    effects = TestBed.get(UserEffects);
    metadata = getEffectsMetadata(effects);
  });

  function setup() {
    return {
      userService: TestBed.get(UserService) as jasmine.SpyObj<UserService>
    }
  }

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('get$', () => {

    it('should return a LoadUsersAction on success', () => {

      // Arrange
      const { userService } = setup();
      const users: User[] = [
        { userId: 1, firstName: 'John', lastName: 'Smith', displayName: 'John' },
        { userId: 2, firstName: 'Foo', lastName: 'Bar', displayName: 'Hello World' }
      ];
      const action = new GetUsersAction();
      const completion = new LoadUsersAction(users);

      // Act
      actions$ = hot('--a--', { a: action });
      const response = cold('--b|', { b: users });
      const expected = cold('----c', { c: completion });
      userService.getUsers$.and.returnValue(response);

      // Assert
      expect(effects.get$).toBeObservable(expected);
      expect(userService.getUsers$).toHaveBeenCalled();

    })

  });

  describe('delete$', () => {

    it('should register that does not dispatch an action', () => {

      // Arrange

      // Act

      // Assert
      expect(metadata.delete$).toEqual({ dispatch: false });

    });

  })

});
