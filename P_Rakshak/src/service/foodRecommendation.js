import api from ".";
import data from "../mock/mockFoodReccomendation.json";
export const getFoodRecommendation = async () => {
    const res = await api.post(`/recommend`, data);
    return res;
};