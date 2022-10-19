import createAxiosInstance from "./AxiosInstance";
import config from '../config'
export class SpotifyService {

    headers = {}
    axiosInstance
    
    constructor() {
        this.axiosInstance=createAxiosInstance(config.api.baseUrl)
    }

    async get(url, queryParams= null) {
        if (!this.apiToken){
            this.apiToken=await this.getAuthToken()
        }
        
        try {
            let response = await this.axiosInstance({
                method: "GET",
                url: url+ this.mapQueryParams(queryParams),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json, text/plain, */*",
                    'Authorization': `Bearer ${this.apiToken}`
                },
              });

            return response.data
        } catch (error) {
            console.log(error)
            if (error.response.status===401){
                console.log("Unauthorized")
            }
            return null
        }
    }
    async getNewReleases() {
        return await this.get("/browse/new-releases")
    }
    async getFeaturedPlaylists() {
        return await this.get("/browse/featured-playlists")
    }
    async geBrowseCategories() {
        return await this.get("/browse/categories")
    }

    async getAuthToken() {

        try{
            //make post request to SPOTIFY API for access token, sending relavent info
            const data = this.mapQueryParams({grant_type:'client_credentials'});
            const auth_token = Buffer.from(`${config.api.clientId}:${config.api.clientSecret}`, 'utf-8').toString('base64');
            
            let response = await this.axiosInstance({
                method: "POST",
                url: config.api.authUrl+data,
                headers: { 
                    'Authorization': `Basic ${auth_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded' 
                  },
                  data:new URLSearchParams({
                    grant_type: 'client_credentials', 
                  })
                // data: data
              });
            //return access token
            return response.data.access_token
            //console.log(response.data.access_token);   
          }catch(error){
            //on fail, log the error in console
            console.log(error);
            if (error.response.status===400){
                console.log("Invalid client")
            }
          }
    }

    mapQueryParams(queryParams) {
        return queryParams
            ? "?"+Object.keys(queryParams).map(function (key) {
                return key + '=' + queryParams[key]
            }).join('&')
            : ""
    }
}