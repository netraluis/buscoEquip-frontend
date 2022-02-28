import axios, { AxiosInstance } from "axios";
import envVariables from "../env.config";

class MatchService {
    match: AxiosInstance;
    constructor(){
        this.match = axios.create({
            baseURL: `${envVariables.REACT_APP_API_URL}`,
            withCredentials: true
        });
    }
    create(data:any){
        return this.match.post("/match", data)
    }
    decide(data:any){
        return this.match.post(`/match/${data.matchId}`)
    }
    get(){
        return this.match.get("/match")
    }
}

const matchService = new MatchService();

export default matchService;