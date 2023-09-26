import { useState } from "react";
import classes from './Form.module.css';

const Form = props => {
    const [currentSaving, setCurrentSaving] = useState(1000);
    const [yearlyContribution, setYearlyContribution] = useState(1200);
    const [expectedReturn, setExpectedReturn] = useState(7);
    const [duration, setDuration] = useState(10); 

    const valueChangeHandler = (event) => {
        if (event.target.id === "current-savings") {
            setCurrentSaving(parseFloat(event.target.value));
        } else if (event.target.id === "yearly-contribution") {
            setYearlyContribution(parseFloat(event.target.value));
        } else if (event.target.id === "expected-return") {
            setExpectedReturn(parseFloat(event.target.value));
        } else if (event.target.id === "duration") {
            setDuration(parseFloat(event.target.value))
        }
    }

    const resetData = () => {
        setCurrentSaving('');
        setDuration('');
        setExpectedReturn('');
        setYearlyContribution('');
    }
    
    const newEntryHandler = (event) => {
        event.preventDefault();
        let newInvestment = {
            "current-savings": currentSaving,
            "yearly-contribution": yearlyContribution,
            "expected-return": expectedReturn,
            "duration": duration
        };
        props.onSubmit(newInvestment);
        resetData();
    }

    return <form className={classes.form} onSubmit={newEntryHandler}>
        <div className={classes['input-group']}>
            <p>
                <label htmlFor="current-savings">Current Savings ($)</label>
                <input type="number" id="current-savings" value={currentSaving} onChange={valueChangeHandler}/>
            </p>
            <p>
                <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                <input type="number" id="yearly-contribution" value={yearlyContribution} onChange={valueChangeHandler}/>
            </p>
        </div>
        <div className="input-group">
            <p>
                <label htmlFor="expected-return">
                Expected Interest (%, per year)
                </label>
                <input type="number" id="expected-return" value={expectedReturn} onChange={valueChangeHandler}/>
            </p>
            <p>
                <label htmlFor="duration">Investment Duration (years)</label>
                <input type="number" id="duration" value={duration} onChange={valueChangeHandler}/>
            </p>
        </div>
        <p className={classes.actions}>
            <button type="reset" className={classes.buttonAlt} onClick={resetData}>
                Reset
            </button>
            <button type="submit" className={classes.button}>
                Calculate
            </button>
        </p>
  </form>

};

export default Form;