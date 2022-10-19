import axios from "axios";


function createAxiosInstance(baseURL){
    const instance = axios.create({baseURL});
    instance.interceptors.request.use(
        function (config) {
          // Add your axios config
          return config;
        },
        function (error) {
          // Intercept errors
          return Promise.reject(error);
        }
      );
    return instance
}


export default createAxiosInstance;