import { Type } from "./actiontype";

export const initialState = {
    basket: [],
}

export const reducer = (state, action) => {
    switch (action.type) {
        case Type.ADD_TO_BASKET:
            // Check if the item exists
            const existingItem = state.basket.find((item) => item.id === action.item.id);
            
            if (!existingItem) {
                // Item doesn't exist - add new item
                return {
                    ...state,
                    basket: [...state.basket, { ...action.item, amount: 1 }]
                };
            } else {
                // Item exists - increase amount
                const updatedBasket = state.basket.map((item) => {
                    return item.id === action.item.id 
                        ? { ...item, amount: item.amount + 1 } 
                        : item;
                });
                return {
                    ...state,
                    basket: updatedBasket
                };
            }

        default:
            return state;
    }
}