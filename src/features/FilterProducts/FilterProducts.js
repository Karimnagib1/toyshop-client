import {React, useEffect,useState, useRef} from 'react';

import './FilterProducts.css';
import {useSelector, useDispatch} from 'react-redux';
import {selectFilteredProducts, selectProducts, setFilteredProducts} from '../Products/ProductsSlice';




const FilterProducts = () => {
    
    let [min, setMin] = useState(0);
    let [max, setMax] = useState(10000);
    let [category, setCategory] = useState('');
    let [brand, setBrand] = useState('');
    let [categoriesD, setCategoriesD] = useState([]);
    let [brandsD, setBrandsD] = useState([]);
    let products = useSelector(selectProducts);
    let filteredProducts = useSelector(selectFilteredProducts);
    let dispatch = useDispatch();
    let categories = useRef([]);
    let brands = useRef([]);

    const handleMinChange = (e) => {
        if(e.target.value === ''){
            return setMin(0);
        }
        setMin(e.target.value);
    }

    const handleMaxChange = (e) => {
        if(e.target.value === ''){
            return setMax(10000);
        }
        setMax(e.target.value);
    }

    const handleCatgoryChange = (e) => {
        if(e.target.value === 'All'){
            return setCategory('');
        }
        setCategory(e.target.value);
    }    
    const handleBrandChange = (e) => {
        if(e.target.value === 'All'){
            return setBrand('');
        }
        setBrand(e.target.value);
    }

    const filterProducts = () => {

        if (category === '' && brand === '') {
            filteredProducts = products.filter( product => {
                return ( (product.price - (product.price * product.discountPercentage/100)) >= min &&  (product.price - (product.price * product.discountPercentage/100)) <= max);
            });
            return dispatch(setFilteredProducts(filteredProducts));
        }
        if (category === '') {
            filteredProducts = products.filter( product => {
                return ( (product.price - (product.price * product.discountPercentage/100)) >= min &&  (product.price - (product.price * product.discountPercentage/100)) <= max && product.brand === brand);
            });
            return dispatch(setFilteredProducts(filteredProducts));
        }
        if (brand === '') {
            filteredProducts = products.filter( product => {
                return ( (product.price - (product.price * product.discountPercentage/100)) >= min &&  (product.price - (product.price * product.discountPercentage/100)) <= max && product.category === category);
            });
            return dispatch(setFilteredProducts(filteredProducts));
        }

        filteredProducts = products.filter(product => {
            return ( (product.price - (product.price * product.discountPercentage/100)) >= min &&  (product.price - (product.price * product.discountPercentage/100)) <= max && product.category === category && product.brand === brand);
        });
        dispatch(setFilteredProducts(filteredProducts));

    };

    useEffect(() => {
        let categoriesSet = new Set();
        products.forEach(product => {
            categoriesSet.add(product.category);            
        });        
        categories.current = [...categoriesSet];
        setCategoriesD(categories.current);
    }, [products,categories, brands]);

    useEffect(() => {
        let brandSet = new Set();
        products.forEach(product => {
            brandSet.add(product.brand);            
        });
        brands.current = [...brandSet];
        setBrandsD(brands.current);
    }, [products , brand]);
    return (
        <div className='filter-products'>
            <h2>Filters</h2>
            <p>Price Range</p>
            <input type = "number" placeholder = "Min" onChange = {handleMinChange} />
            <input type = "number" placeholder = "Max" onChange = {handleMaxChange}/>
            <p>Category</p>
            <select onChange={handleCatgoryChange}>
                <option value = "">All</option>
                {categoriesD.map( category => {
                    return (<option  key = {category} value = {category}>{category}</option>);
                })}
            </select>
            <p>Brand</p>
            <select onChange={handleBrandChange}>
                <option value = "">All</option>
                {brandsD.map( brand => {
                    return (<option  key = {brand} value = {brand}>{brand}</option>);
                })}
            </select>
            <button className = 'btn' onClick = {filterProducts}>Apply Filters</button>
        </div>
    );
};

export default FilterProducts;