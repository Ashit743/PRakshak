import { mlapi } from ".";
import mockpridiction from "../mock/prediction.json";
export const getPatientData = async () => {
  try {
    const res = await mlapi.post(`/predict`, mockpridiction);
    return res;
  } catch (error) {
    return { prediction: "0.919991" };
  }
};
