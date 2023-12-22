import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { compareReducer } from "./reducers/compare";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";
import { statementsReducer } from "./reducers/statements";
import categoryReducer from "./reducers/categories";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    compare: compareReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    statements: statementsReducer,
    categories: categoryReducer,
  },
});

export default Store;
