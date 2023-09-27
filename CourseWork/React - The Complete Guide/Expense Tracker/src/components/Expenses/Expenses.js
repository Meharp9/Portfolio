import ExpenseItem from "./ExpenseItem";
import './Expenses.css';
import Card from "../UI/Card";
import ExpensesFilter from "./ExpenseFilter";
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

const Expenses = (props) => {
    const [filterYear, setFilterYear] = useState("2020");

    const filterExpenseHandler = (filterChoice) => {
        setFilterYear(filterChoice);
    };

    const filteredExpenses = props.expenses.filter((expense) => {
        const year = expense.date.getFullYear();
        return year.toString() === filterYear
    });

    

    return (
        <Card className="expenses">
            < ExpensesFilter selected={filterYear} onFilterExpenses={filterExpenseHandler}/>
            < ExpensesChart expenses={filteredExpenses} />
            < ExpensesList expenses={filteredExpenses}/>
        </Card>
    )
};

export default Expenses;