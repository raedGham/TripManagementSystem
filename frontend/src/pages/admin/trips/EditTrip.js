import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct , getProduct} from "../../../services/products/productService"; // Your editProduct API function
import { toast } from "react-toastify";
import {fetchCatgs} from "../../../redux/features/categories/catgSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from '../../../components/products/ProductForm';

const  EditProduct = () => {
  const { id } = useParams(); // product ID from route
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState("")

  const { catgs } = useSelector((state) => state.catg);
  useEffect(() => {
   dispatch(fetchCatgs());
}, [dispatch]);

  // Load product details
  useEffect(() => {
    async function fetchData() {
      try {
        const product = await getProduct(id);
        setName(product.name);
        setCategory(product.category);
        setPrice(product.price);
        setPreview(product.thumbnail?.url || null); // Show existing image
      } catch (err) {
        toast.error("Failed to load product details");
      }
    }
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    
    switch (name) {
      case "name":
        setName(value)
        break;
      case "category":
        setCategory(value)
        break;
      case "price":
          setPrice(value)
          break;  


    }
  
};

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      category,
      price,
      thumbnail, // File or null
    };
    try {
      await updateProduct(id, productData);
      navigate("/products/list"); // Go back to list
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  return (
    
    <ProductForm 
    name={name} 
    category={category} 
    price={price} 
    thumbnail={thumbnail} 
    handleInputChange={handleInputChange} 
    handleImageChange={handleImageChange}  
    addProduct={handleSubmit} 
    title= {"Edit Product"} 
    categories={catgs}
    preview= {preview}/>      
    
  );
}

export default EditProduct;