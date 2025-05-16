const addProduct = async (formData) => {
    try {
        const res = await fetch('https://mini-ecom-bdwv.onrender.com/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        return res;
    } catch (error) {
        throw (error);
    }
}

const getProducts = async () => {
    try {
        const response = fetch('https://mini-ecom-bdwv.onrender.com/api/products');
        return response
    } catch (error) {
        throw (error)
    }
}

const searchContextual = async (query) => {
    try {

        const response = fetch('https://mini-ecom-bdwv.onrender.com/api/products/contextual-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });

        return response;
    } catch (error) {
        throw(error)
    }
}

export { addProduct, getProducts, searchContextual }