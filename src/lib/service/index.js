import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

//GET
export const getProducts = () => {
    return new Promise((onSuccess , onFail) => {
       axios.get('/api/products').then((response,error) => {
          if(!response || error) {
              return onFail(`Response failure : ${error}`);
        }
        onSuccess(response);
       })
       .catch(err => onFail(err));
    });
};
export const getUser = body =>{
    return new Promise((onSuccess, onFail) => {
        axios.get('/api/user', body.email)
        .then((response, error) => {
            if(!response || error) {
                return onFail(`Response failure : ${error}`);
          }
          onSuccess(response.data);
        
        })
        .catch(err => onFail(err));
    })
}
//POST
export const addUser = body => {
    return new Promise((onSuccess, onFail) => {
        axios
        .post("/api/users/add", body)
        .then((response,error) => {
            if(!response || error) {
                return onFail(`Response failure : ${error}`);
          }
          onSuccess(`user profile successfully created`);
        })
        .catch(err => onFail(err));
    });
};

export const addOrder = (body) => {
    return new Promise((onSuccess, onFail) => {
      axios
        .post("/api/orders/add", body)
        .then((response, error) => {
          if (!response || error) {
            return onFail(`Response failure : ${error}`);
          }
          onSuccess(`order successfully saved`);
        })
        .catch((err) => onFail(err));
    });
  };

//stripe
export const processPayment = async (order) => {
    var stripePromise = loadStripe("pk_test_51ITiwQHLhVswwPoQ2gHROUAYBqoa1INQjDcGjwf80sDSayH5679x5257Q6rha66aiq7MlKLlfC8FH2sGPlp9KHcy00drqCq78m");
    const stripe = await stripePromise;
    axios.post("api/create-checkout-session", order).then((response) => {
      const sessionID = response.data.id;
      return stripe.redirectToCheckout({ sessionId: sessionID });
    });
  };