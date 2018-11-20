import AppConfig from '../model/AppConfig';


export default class ParttimeJobService {
    static getPartttimeJobList() {
        return  fetch(AppConfig.api.jobInfoAdminApiUrl + AppConfig.api.endpoint.parttimeJobList, {
                method: "GET",
                contentType:"application/json;charset=UTF-8"
            })
            .then(response =>  response.json());                     
        }
    
}