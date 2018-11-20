import AppConfig from '../model/AppConfig';


export default class AreaService {
    static getAreas() {
        return  fetch(AppConfig.api.jobInfoAdminApiUrl + AppConfig.api.endpoint.areas, {
                method: "GET"
            })
            .then(response =>  response.json());                     
        }
        static createArea(area) {
            console.log(area);
            return  fetch(AppConfig.api.jobInfoAdminApiUrl + AppConfig.api.endpoint.addArea, {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify( area)
            
            })
                
        }
        static updateArea(area) {
            console.log(area);
            return  fetch(AppConfig.api.jobInfoAdminApiUrl + AppConfig.api.endpoint.updateArea + area.areaId, {
                method: "PUT",
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify( area)
            
            })
                
        }
    
}