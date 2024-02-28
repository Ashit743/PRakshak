import api from ".";
import mockpatientdata from "../../src/mock/appointments.json";
export const getCalendarData = async () => {
  try {
    // const res = await api.get("/");
    return Promise.resolve(mockpatientdata);
  } catch (error) {
    return error;
  }
};
