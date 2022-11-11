import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  constructor(private auth: AuthService, private renderer:Renderer2, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  login() {
    
    this.auth.login(this.loginForm.value.login!, this.loginForm.value.password!).subscribe({
      next: (res)=>{
        let isDark = res.theme ==='ciemny' ? true : false
        this.changeTheme(isDark) 
      }, 
      error: (e) => {// tu nie wejdzie bo interceptor bledy ogarnia
        alert('BŁĄD: '+ e.message + ':: ' + e.error.text);
      },
      complete: () => console.info('complete')
    });
  }

  tokenTest(){
    this.auth.tokenTest().subscribe({
      next: (response:any)=>{
        console.log(response)
      }
    })
  }

  logout(){
    this.auth.logout()
  }

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  changeTheme(isDarkMode:boolean) {
    const hostClass = isDarkMode ? 'theme-dark' : 'theme-light'
    this.renderer.setAttribute(this.document.body, 'class', hostClass)
  }
}
