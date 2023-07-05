import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
              status: "pending",
              title: "Sending...",
              message: "Sending Cart data",
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                "https://react-http-92e61-default-rtdb.firebaseio.com/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify(cart),
                }
            );
    
            if (!response.ok) {
                throw new Error("Sending Cart data failed");
            }
        };

        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                  status: "success",
                  title: "Success!",
                  message: "Sent Cart data successfully",
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error!",
                  message: "Error in sending cart data",
                })
            );
        }
    };
};

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch("https://react-http-92e61-default-rtdb.firebaseio.com/cart.json"
            );

            if (!response.ok) {
                throw new Error('Could not fetch cart data');
            }

            const data =  await response.json()

            return data;
        };

        try{
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error!",
                  message: "Fetch in cart data Failed!",
                })
            );
        }
    };
};
