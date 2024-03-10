import { mlapi } from ".";
import mockpridiction from "../mock/prediction.json";
export const getPatientData = async () => {
    const res = await mlapi.post(`/predict`, mockpridiction);
    return res;

};
