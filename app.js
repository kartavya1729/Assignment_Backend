const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/products', (req, res) => 
{
    const products = 
    [
        { name: 'Product 1', price: 100 },
        { name: 'Product 2', price: 200 },
        { name: 'Product 3', price: 300 },
    ];

    const searchQuery = req.query.search;

    const filteredProducts = products.filter(product => 
    {
        return searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    });

    res.render('products', { products: filteredProducts, searchQuery });
});


app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
