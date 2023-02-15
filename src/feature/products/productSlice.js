import { deleteProducts, fetchProducts, postProducts } from "./productsAPI"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    products: [],
    postSuccess: false,
    deleteSuccess: false,
    isLoading: false,
    isError: false,
    error: ""
}

export const getProducts = createAsyncThunk("products/getProduct", async () => {
    const products = fetchProducts()
    return products
})

export const addProduct = createAsyncThunk("products/addProduct", async (data) => {
    const products = postProducts(data)
    return products
})

export const removeProduct = createAsyncThunk("products/removeProduct", async (id) => {
    const products = deleteProducts(id)
    return products
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        togglePostSuccess: (state, action) => {
            state.postSuccess = false
        },
        toggleDeleteSuccess: (state, action) => {
            state.postSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            }).addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.isLoading = false
                state.isError = false
            }).addCase(getProducts.rejected, (state, action) => {
                state.products = []
                state.isLoading = false
                state.isError = true
                state.error = action.error.message
            })
            .addCase(addProduct.pending, (state, action) => {
                state.isLoading = true
                state.postSuccess = false
                state.isError = false
            }).addCase(addProduct.fulfilled, (state, action) => {
                state.postSuccess = true
                state.isLoading = false
                state.isError = false
            }).addCase(addProduct.rejected, (state, action) => {
                state.products = []
                state.isLoading = false
                state.postSuccess = false
                state.isError = true
                state.error = action.error.message
            })
            .addCase(removeProduct.pending, (state, action) => {
                state.isLoading = true
                state.deleteSuccess = false
                state.isError = false
            }).addCase(removeProduct.fulfilled, (state, action) => {
                state.deleteSuccess = true
                state.isLoading = false
                state.isError = false
            }).addCase(removeProduct.rejected, (state, action) => {
                state.products = []
                state.isLoading = false
                state.deleteSuccess = false
                state.isError = true
                state.error = action.error.message
            })
    }
})

export const { togglePostSuccess, toggleDeleteSuccess } = productsSlice.actions

export default productsSlice.reducer