import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  dataSource: MatTableDataSource<User>;
  displayedColumns = ['userId', 'firstName', 'lastName', 'displayName', 'buttons'];

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers$().subscribe(e => {
      this.dataSource.data = e;
    });
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
    this.userService.deleteUser$(userId).subscribe(e => this.getUsers());
  }
}
