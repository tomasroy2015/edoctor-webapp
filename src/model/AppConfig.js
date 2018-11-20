const address = 'http://localhost:4000/';

export default class AppConfig {
    static get apiURL(){
        return address;
    }
    static get userStorage(){
        return 'userStorage';
    }
    static get api(){
       return {
            advertiseApiUrl:'http://localhost:4000/',
            jobInfoAdminApiUrl:'http://localhost:8080/',
            adminProfileAPiUrl:'http://192.168.3.227:8080/',
            endpoint:{
                addUser:"user/add",
                loginUser:'user',
                advertise:'advertisement',
                fulltimeJobList:"job/fulltime/list",
                parttimeJobList:"job/parttime/list",
                hospitalList:"hospital/all",
                doctorList:"doctor/all?size=100",
                studentList:"student/all",
                areas:"area/list",
                addArea:"area/add",
                updateArea:"area/"
            }
        }
    }
}
