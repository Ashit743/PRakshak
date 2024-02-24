import api from ".";
import doctorslots from '../mock/doctorsSlots.json'

export const getDoctorSlots=async ()=>{
    try {
        // const res=await api.get("/");
        return Promise.resolve(doctorslots)
    } catch (error) {
        return error
    }
}