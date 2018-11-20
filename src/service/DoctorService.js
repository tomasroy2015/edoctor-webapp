import AppConfig from '../model/AppConfig';


export default class DoctorService {
    static getDoctorsList() {
        return  fetch(AppConfig.api.adminProfileAPiUrl + AppConfig.api.endpoint.doctorList, {
                method: "GET",
                contentType:"application/json;charset=UTF-8"
            })
            .then(response =>  response.json());                     
        }
    
}