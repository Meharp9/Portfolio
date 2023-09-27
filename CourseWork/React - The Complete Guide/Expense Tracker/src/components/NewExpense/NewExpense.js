import { useState } from 'react';

import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

const NewExpense = (props) => {
    const [showForm, setShowForm] = useState(false);

    const toggleFormHandler = () => {
        setShowForm(!showForm);
    }
    
    if (showForm === false) {
        return <div className='new-expense'>
            <button onClick={toggleFormHandler}>Add new Expense</button>
        </div>
    }
    
    const saveExpenseHandler = (enteredExpense) => {
        const expenseData = {
            ...enteredExpense,
            id: Math.random().toString()
        }
        props.onAddExpense(expenseData);
    };

    return <div className="new-expense">
        <ExpenseForm onSaveExpense={saveExpenseHandler} onToggle={toggleFormHandler} />
    </div>
};

export default NewExpense;