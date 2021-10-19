import { SET_PENDING_PRODUCT } from '../actions/productAction';
import {
    SET_WISHLIST,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST
} from '../actions/wishlistAction';

const initState = {
    isSet: false,
    items: [],
    searchValue: '',
    count: 0
};

const wishlistReduser = (state = initState, action) => {
    switch (action.type) {
        case SET_WISHLIST:
            return {
                ...state,
                isSet: action.items.length > 0,
                items: [
                    ...action.items.map(item => {
                        return {
                            ...item,
                            isPending: false,
                        };
                    })
                ],
                count: action.items.length
            };
        case ADD_TO_WISHLIST:
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        ...action.item,
                        isPending: !action.item.isPending
                    }
                ],
                count: ++state.count,
                isSet: state.count > 0
            }
        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                items: [
                    ...state.items.filter(item => item.id !== action.id)
                ],
                count: --state.count,
                isSet: state.count > 0,
            }
        case SET_PENDING_PRODUCT:
            return {
                ...state,
                items: [
                    ...state.items.map(item => {
                        if (item.productId === action.id) {
                            return {
                                ...item,
                                isPending: !item.isPending,
                            };
                        }
                        return item;
                    })
                ]
            }
        default:
            return state;
    }
};

export default wishlistReduser;