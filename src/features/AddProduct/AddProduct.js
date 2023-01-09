import {React, useEffect, useState} from "react";
import "./AddProduct.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState(0);
  const [category, setCategory] = useState(0);
  const [thumbnail, setThumbnail] = useState(0);

  useEffect(() => {
    const myNav = document.getElementById("mynav");
    myNav.classList.add("nav-colored");
    myNav.classList.remove("nav-transparent");
  }, []);


  const handleFileChange = (e) =>{
    setThumbnail(e.target.files[0]);
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('price', price);
    data.append('discount', discount);
    data.append('stock', stock);
    data.append('brand', brand);
    data.append('category', category);
    data.append('thumbnail', thumbnail);
    const response = await axios.post('https://toyshop-ekqp.onrender.com/products/add-product', data);
    if (response.status === 200){
      navigate('/');
    } else {
      alert("Something went wrong!");
    }
  }

  return (
    <div className="content-wrap">
      <div className = "add-product-c">
        <form className="add-product-f" onSubmit = {handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input type="text" placeholder="Product title" id="title"  onChange = {(e)=> setTitle(e.target.value)}/>
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            placeholder="Enter the product description"
            onChange= { (e) => setDescription(e.target.value)}
          ></textarea>
          <label htmlFor ="price">Price: </label>
          <input
            type="Number"
            placeholder="Product price" 
            id="price"
            step="0.1"
            onChange = {(e) => setPrice(e.target.value)}
          />
          <label htmlFor="discount">Discount %: </label>
          <input
            type="Number"
            placeholder="Discount percentage"
            id="discount"
            step="1"
            min = "0"
            max = "100"
            onChange = {(e) => {setDiscount(e.target.value)}}
          />
          <label htmlFor="stock">Stock: </label>
          <input
            type="Number"
            placeholder="Product price"
            id="discount"
            step="1"
            onChange={e => setStock(e.target.value)}
          />
          <label htmlFor="brand">Brand: </label>
          <input type="text" id="brand" onChange = {e => setBrand(e.target.value)}/>

          <label htmlFor="category">Select Category: </label>
          <input type='text' id='category' onChange = {e => setCategory(e.target.value)} />

          <label htmlFor = "thumbnail"> Upload product thumbnail: </label>
          <input type="file" id="thumbnail" onChange={handleFileChange}/>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
