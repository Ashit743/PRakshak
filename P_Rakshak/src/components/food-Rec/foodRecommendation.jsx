import React, { useState, useEffect } from "react";
import BreakfastMenu from '../meal-card/breakfast';
import LunchMenu from '../meal-card/lunch';
import DinnerMenu from '../meal-card/dinner';
import './foodRecommendation.css'
import mockData from '../../mock/foodRecommendation.json'
import { getFoodRecommendation } from "../../service/foodRecommendation";
import Loader from "../loader";



const FoodRecommendations = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {

        setError(null);

        try {
            setLoading(true);
            const response = await getFoodRecommendation();
            console.log(response)
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
            setData(mockData);
            console.log("api failed fetching from mock..");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="food-recommendations">
            <div className="title">
                <h1>DIETARY RECOMMENDATION</h1>
            </div>
            {Object.keys(data).length > 0 ? <div className="container">
                <div className="row">
                    <div className="col">
                        <BreakfastMenu breakfastItems={data.breakfast} />
                    </div>
                    <div className="col">
                        <LunchMenu lunchItems={data.lunch} />
                    </div>
                    <div className="col">
                        <DinnerMenu dinnerItems={data.dinner} />
                    </div>
                </div>
            </div> : loading && <div className="text-center"><Loader /></div>}

        </div>
    );
};

export default FoodRecommendations;