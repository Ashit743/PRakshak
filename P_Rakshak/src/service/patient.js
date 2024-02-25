import api from ".";
export const getPatientById = async () => {
  try {
    const res = await api.post("/patientData", sessionStorage.getItem("phno"));
    return res;
  } catch (error) {
    return error;
  }
};
