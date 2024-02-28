import React, { useEffect } from "react";
import "../App.css";
import Profile from "../components/Profile";
import UserInfo from "../components/UserInfo";
import VitalSign from "../components/VitalSign";
import TestReports from "../components/TestReports";
import Prescriptions from "../components/Prescriptions";
import { usePatientProfile } from "../context/PatinetContext";
import { getPatientData } from "../service/patientprediction";
export default function Home() {
  const { setpatientProfile } = usePatientProfile();
  useEffect(() => {
    const patientData = async () => {
      const res = await getPatientData();
      if (res.status == 200) {
        setpatientProfile(res.data);
      }
    };
    patientData();
  }, []);
  return (
    <div className="container-fluid">
      {" "}
      {/*main container*/}
      <div className="row">
        {" "}
        {/*main row*/}
        <div className="col-lg-12">
          {/*main column*/}
          <div className="row">
            <div className="col patient-details-wrapper">
              <div className="row">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-12">
                      <Profile />
                    </div>
                    <div className="col-12 mt-3">
                      <UserInfo />
                    </div>
                  </div>
                </div>

                <div className="col patient-data">
                  <div className="row">
                    <div className="col-12">
                      <VitalSign />
                    </div>

                    <div className="col-12">
                      <TestReports />
                    </div>

                    <div className="col-12">
                      <Prescriptions />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
