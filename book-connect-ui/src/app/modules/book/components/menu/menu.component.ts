import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {UserControllerService} from "../../../../services/services/user-controller.service";
import {TokenService} from "../../../../services/token/token.service";
import SockJS from 'sockjs-client';
import {Stomp} from "@stomp/stompjs";
import {Notification} from "./notification";
import {ToastrService} from "ngx-toastr";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {


  socketClient: any = null;
  private notificationSubscription: any;
  unreadNotificationsCount = 0;
  notifications: Array<Notification> = [];


  constructor(private router: Router,
              private user: UserControllerService,
              private tokenService: TokenService,
              private toastService: ToastrService) {
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  ngOnInit(): void {
    this.getLoggedUser();
    this.navigationHandler();
    if (this.tokenService.TokenSub) {
      let ws = new SockJS('http://localhost:8080/api/v1/ws');
      this.socketClient = Stomp.over(() => ws);
      this.socketClient.connect({'Authorization:': 'Bearer ' + this.tokenService.token}, () => {
        this.notificationSubscription = this.socketClient.subscribe(
          `/user/${this.tokenService.TokenSub}/notification`,
          (message: any) => {
            const notification: Notification = JSON.parse(message.body);
            if (notification) {
            this.notifications.unshift(notification);
              switch (notification.status) {
                case 'BORROWED':
                  this.toastService.info(notification.message, notification.bookTitle);
                  break;
                case 'RETURNED':
                  this.toastService.warning(notification.message, notification.bookTitle);
                  break;
                case 'RETURN_APPROVED':
                  this.toastService.success(notification.message, notification.bookTitle);
                  break;

              }
              this.unreadNotificationsCount++;

            }
          }
        )
      });
    }
  }

  private navigationHandler() {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  googleBook() {
    this.router.navigate(['googleBooks']);
  }

  getLoggedUser() {
    this.user.getLoggedInUser().subscribe({
      next: (val) => {
        this.loggedUser = val.name as string;
      }
    })
  }


  loggedUser: string = '';

}
