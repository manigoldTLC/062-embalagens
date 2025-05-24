import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const { product, quantity = 1, selectedColor } = action.payload;
			const cartItemId = selectedColor ? `${product.id}-${selectedColor}` : product.id;

			const existingItem = state.items.find(item => item.cartItemId === cartItemId);

			if (existingItem) {
				existingItem.quantity += quantity;
			} else {
				state.items.push({
					...product,
					quantity,
					selectedColor,
					cartItemId,
				});
			}
		},
		removeItem: (state, action) => {
			const cartItemIdToRemove = action.payload;
			state.items = state.items.filter(item => item.cartItemId !== cartItemIdToRemove);
		},
		updateItemQuantity: (state, action) => {
			const { cartItemId, quantity } = action.payload;
			const itemToUpdate = state.items.find(item => item.cartItemId === cartItemId);
			if (itemToUpdate) {
				itemToUpdate.quantity = Math.max(1, quantity);
			}
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) =>
	state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) =>
	state.cart.items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

export default cartSlice.reducer;