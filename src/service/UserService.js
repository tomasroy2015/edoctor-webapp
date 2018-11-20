import AppConfig from '../model/AppConfig';


export default class UserService {
    static addUser(user) {
        return AppConfig.api.url + AppConfig.api.method.addUser + `?name=${user.name}&email=${user.email}&password=${user.password}&address=${user.address}`;
    }

    static loginUser(user) {
        return AppConfig.api.url + AppConfig.api.method.loginUser + `?email=${user.email}&password=${user.password}`;
    }

    static isLoggedIn() {
        var user = localStorage.getItem(AppConfig.userStorage);
        let isLoggedIn = false;
        if (user !== undefined && user !== null)
            isLoggedIn = true;
        return isLoggedIn;
    }
    static setLoggedInData(user) {
        localStorage.setItem(AppConfig.userStorage, user)
    }
    static logout(){
        localStorage.clear();
    }
    static clearSessionData(){
        localStorage.clear();
    }
}
