import api from ".";

export const sendotp = async (number) => {
  try {
    const res = await api.post("/sendotp", {
      number,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const verifyotp = async (number, otp) => {
  try {
    const res = await api.post("/verifyotp", {
      number,
      otp,
    });
    return res;
  } catch (error) {
    return error;
  }
};
