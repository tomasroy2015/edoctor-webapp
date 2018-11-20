import AppConfig from '../model/AppConfig';


export default class AdvertisementService {
    static getAdvertisement() {
        return  fetch(AppConfig.api.advertiseApiUrl + AppConfig.api.endpoint.advertise, {
                method: "GET"
            })
            .then(response =>  response.json());                     
        }
    
}