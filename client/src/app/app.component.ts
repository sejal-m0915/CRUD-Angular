import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any[] = [];
  firstName = '';
  lastName = '';
  email = '';
  mobile = '';
  address = '';
  pincode = '';
  editing = false;
  currentUserId: string | null = null;
  shake = false;

  constructor(private userService: UserService) { }
  ngOnInit() {
    this.loadScripts();
    this.fetchUsers();
  }

  loadScripts() {
    const scripts = [
      "https://code.jquery.com/jquery-3.6.0.min.js",
      "https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js",
      "https://cdn.datatables.net/responsive/2.2.7/js/dataTables.responsive.min.js"
    ];

    scripts.forEach((scriptUrl) => {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = false; // Ensure scripts are loaded in order
      document.head.appendChild(script);
    });

    // Ensure styles are loaded
    const styles = [
      "https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css",
      "https://cdn.datatables.net/responsive/2.2.7/css/responsive.dataTables.min.css"
    ];

    styles.forEach((styleUrl) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = styleUrl;
      document.head.appendChild(link);
    });
  }

  async fetchUsers() {
    this.users = await this.userService.getUsers();
    this.initializeDataTable();
  }

  initializeDataTable() {
    const interval = setInterval(() => {
      if (typeof $ !== 'undefined' && $.fn.DataTable) {
        if ($.fn.dataTable.isDataTable('#userTable')) {
          $('#userTable').DataTable().clear().destroy();
        }

        $('#userTable').DataTable({
          responsive: true
        });

        clearInterval(interval);
      }
    }, 100);
  }

  async onSubmit() {
    if (!this.firstName || !this.lastName || !this.email || !this.mobile || !this.address || !this.pincode) {
      // If any of the required fields are empty, add the shake class and return
      this.shake = true;
      return;
    }

    const user = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      mobile: this.mobile,
      address: this.address,
      pincode: this.pincode
    };

    if (this.editing) {
      await this.userService.editUser(this.currentUserId!, user);
    } else {
      await this.userService.addUser(user);
    }
    this.fetchUsers();
    this.resetForm();
  }

  async deleteUser(id: string) {
    await this.userService.deleteUser(id);
    this.fetchUsers();
  }

  public editUser(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      this.firstName = user.first_name;
      this.lastName = user.last_name;
      this.email = user.email;
      this.mobile = user.mobile;
      this.address = user.address;
      this.pincode = user.pincode;
      this.editing = true;
      this.currentUserId = id;
    }
  }

  public resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.mobile = '';
    this.address = '';
    this.pincode = '';
    this.editing = false;
    this.currentUserId = null;
    this.shake = false; // Ensure shake is reset
  }
}
