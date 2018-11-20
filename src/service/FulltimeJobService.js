import AppConfig from '../model/AppConfig';


export default class FulltimeJobService {
    static getFulltimeJobList() {
        return  fetch(AppConfig.api.jobInfoAdminApiUrl + AppConfig.api.endpoint.fulltimeJobList, {
                method: "GET",
                contentType:"application/json;charset=UTF-8"
            })
            .then(response =>  response.json());                     
        }
    
}