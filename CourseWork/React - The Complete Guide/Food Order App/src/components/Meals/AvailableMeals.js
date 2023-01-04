import React, { useEffect, useState } from "react";
import Card from "../UI/Card";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const res = await fetch('https://react-http-92e61-default-rtdb.firebaseio.com/meals.json');
            
            if (!res.ok) {
                throw new Error('Something went Wrong!');
            }

            const resData = await res.json();

            const loadedMeals = [];
            for (const key in resData) {
                loadedMeals.push({
                    id: key,
                    name: resData[key].name,
                    description: resData[key].description,
                    price: resData[key].price,
                })
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    }, []);

    if (isLoading) {
        return <section className={classes.MealsLoading}>
            <p>Loading...</p>
        </section>
    }

    if (httpError) {
        return <section className={classes.mealsError}>
            <p>{httpError}</p>
        </section>
    }

    const mealsList = meals.map(meal => (
        <MealItem 
            id={meal.id}
            key={meal.id} 
            name={meal.name} 
            description={meal.description}
            price={meal.price}
        />
    ));
    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
};

export default AvailableMeals;