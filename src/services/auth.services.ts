import axios, { AxiosInstance } from "axios";
import envVariables from "../env.config";

class AuthService {
    auth: AxiosInstance;
    constructor(){
        this.auth = axios.create({
            baseURL: `${envVariables.REACT_APP_API_URL}`,
            withCredentials: true
        });
    }
    signup(data:any){
        return this.auth.post("/auth/signup", data)
    }
    login(data:any){
        return this.auth.post("/auth/login", data)
    }
    logout(){
        return this.auth.post("/auth/logout")
    }
    isLoggedIn(){
        return this.auth.get("/auth/isLoggedIn")
    }
}

const authService = new AuthService();

export default authService;