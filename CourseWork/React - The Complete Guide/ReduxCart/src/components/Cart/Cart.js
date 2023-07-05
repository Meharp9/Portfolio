import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const itemList = useSelector(state => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {itemList.map(items => (
            <CartItem
              item={{ id: items.itemId, title: items.title, quantity: items.quantity, total: items.totalPrice, price: items.price}} 
              key={items.itemId}
            />
          )
        )}

      </ul>
    </Card>
  );
};

export default Cart;
