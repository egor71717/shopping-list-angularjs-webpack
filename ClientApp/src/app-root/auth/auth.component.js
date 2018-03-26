const authController = function(authService){
    this.mode = 'login'
    this.reset = () => {
        this.loginForm = { login: "", password: "" }
        this.registerForm = { login: "", password: "", phone: ""}
    } 
    this.reset()
    this.changeMode = (mode) => {
        this.reset()
        this.mode = mode
    }
    this.login = () => {
        authService.login(
            this.loginForm, 
            success => this.reset(),
            reject => this.showError = true
        );
    }
    this.register = () => {
        authService.register(
            this.registerForm, 
            resolve => this.reset(),
            reject => this.showError = true
        );
    }
}
authController.$inject = ['authService'];
export const authComponent = {
    template: require('./auth.component.html'),
    //styleUrls: [require('./auth.component.css')],
    controller: authController
}

import './auth.component.css'