import {
  AddToCartAction,
  RemoveFromCartAction,
  SaveShippingAddressAction,
} from "../actions/cartActions";
import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

type CartItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type State = {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
};

const initialState: State = {
  cartItems: [],
  shippingAddress: {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
};

type Action =
  | AddToCartAction
  | RemoveFromCartAction
  | SaveShippingAddressAction
  | { type: typeof CART_EMPTY }; // this is ugly, never do that, just showing you it's possible lol

export const cartReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem: any = state.cartItems.find(
        (x: CartItem) => x.productId === item.productId
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x: CartItem) =>
            x.productId === existItem.productId ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x: CartItem) => x.productId !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_EMPTY:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
