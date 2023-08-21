
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function App() {
  const categoryList=['Vegetables','Fruits & Nuts','Dairy & Creams','Packages Food','Stables']
  const [products,setProducts]=useState([]);
  const [product,setProduct]=useState({});
 const [productName,setProductName]=useState('');
 const [productPrice,setProductPrice]=useState('');
 const [productOldPrice,setProductOldPrice]=useState('');
 const [productCategory,setProductCategory]=useState('');
 const [productDesc,setProductDesc]=useState('');
 const [id,setId]=useState(0)
 const [show, setShow] = useState(false);
 
  const BASE_URL="https://64e345fabac46e480e788177.mockapi.io/products";
  const handleClose = () => setShow(false);
  //Get Products
  const getProducts = () =>{
    axios.get(BASE_URL).then((res)=>{
      setProducts(res.data);
    })
  }
//Get Product
const getProduct = (id) =>{
  setId(id)
  console.log(id);
  axios.get(BASE_URL+`/${id}`)
  .then((res)=>{
    setProduct(res.data);
    console.log(res.data);
    console.log(typeof(product));
  });
setShow(true);
}
  //Add Product
  const addProduct = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
     let inputs=document.querySelectorAll(".input")
     inputs.forEach(input=>{
      input.value=''
     })
    axios.post(BASE_URL, {
      productName: productName,
      productPrice: productPrice,
      productOldPrice: productOldPrice,
      productCategory: productCategory,
      productDesc: productDesc,
    })
    .then((res) => {
      getProducts(); // Fetch updated product list
    })
    .catch((error) => {
      // Handle error if necessary
    });
  
    // Clear input fields
    // setProductName('');
    // setProductPrice('');
    // setProductOldPrice('');
    // setProductCategory('');
    // setProductDesc('');
  };
  

  //Update Product
  const editProduct = (id) => {
    console.log(id);
    let inputs=document.querySelectorAll(".input1")
    inputs.forEach(input=>{
      input.value=''
     })
    axios.put(BASE_URL+`/${id}`, {
        productName:productName,
        productCategory:productCategory,
        productPrice:productPrice,
        productOldPrice:productOldPrice,
        productDesc:productDesc,
      })
      .then((res) => {
        getProducts();
        console.log(res.data);
        setShow(false); // Close the modal
      });
  };
  

  //Delete Product
  const deleteProduct = (id) =>{
    axios.delete(BASE_URL+`/${id}`).then((res)=>{
      getProducts();
    })
  }
  useEffect(()=>{
    getProducts()
  },[])
  return(
    <div className='App'>
      <h1>Product Details</h1>
     <div className='inputs'>
      <Form  onSubmit={addProduct}>
     <Form.Control type='text' 
     className='input'
      placeholder='Product Name'
      onChange={(e)=>setProductName(e.target.value)}
      />
      <Form.Control type='number' 
      className='input'
      placeholder='Product Price'
      onChange={(e)=>setProductPrice(e.target.value)}
      />
      <Form.Control type='number' 
      className='input'
      placeholder='Product Old Price'
      onChange={(e)=>setProductOldPrice(e.target.value)}
      />
      <Form.Select type='text' 
      className='input'
      placeholder='Product Category'
      onChange={(e)=>setProductCategory(e.target.value)}
      >
        <option value={''}  selected disabled>Choose Category</option>
        {
          categoryList.map((cat)=>{
            return(
              <>
              <option>{cat}</option>
              </>
            )
          })
        }
      </Form.Select>
      <Form.Control type='text' 
      className='input'
      placeholder='Enter Product Description'
      onChange={(e)=>setProductDesc(e.target.value)}
      />
      <Button className="btn btn-success m-3" type='submit'>Add Product</Button>
      </Form>
     </div>
     <table>
      <tr>
        <th>product Name</th>
        <th>product Category</th>
        <th>product Price</th>
        <th>Product OldPrice</th>
        <th>product Description</th>
        <th>Operations</th>
      </tr>
      {
        products.map((product)=>{
          return(
            <tr>
              <td>{product.productName}</td>
              <td>{product.productCategory}</td>
              <td>{product.productPrice}</td>
              <td>{product.productOldPrice}</td>
              <td>{product.productDesc}</td>
              <button className='btn btn-primary m-1' onClick={()=>getProduct(product.id)}>Edit</button>
              <button className='btn btn-danger m-1' onClick={()=>deleteProduct(product.id)}>Delete</button>
            </tr>
          )
        })
      }
     </table>
     
     <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form>

      <Form.Label>Product Name</Form.Label>
      <Form.Control
      className='input1'
  type="text"
  placeholder="Product Name"
  defaultValue={product.productName}
  onChange={(event) => setProductName(event.target.value)}
  autoFocus
/>
      
      <Form.Label>Product Category</Form.Label>
      <Form.Select
      className='input1'
          type="text"
          placeholder="Product Description"
          defaultValue={product.productCategory}
          onChange={(event)=>{
            if(event.target.value === ''){
              setProductCategory(product.productCategory)
            }else{
              setProductCategory(event.target.value)
            }
          }}
        >
      {
        categoryList.map((cat)=>{
          return(
          
        <option>{cat}</option>
      
          )
        })
       
      }
       </Form.Select>

      <Form.Label>Product Price</Form.Label>
      <Form.Control
      className='input1'
        type="number"
        placeholder="Product Price"
        defaultValue={product.productPrice}
        onChange={(event)=>{
          if(event.target.value === ''){
            setProductPrice(product.productPrice)
          }else{
            setProductPrice(event.target.value)
          }
        }}
      />
      <Form.Label>Product Old Price</Form.Label>
      <Form.Control
        type="number"
        className='input1'
        placeholder="Product URL"
        defaultValue={product.productOldPrice}
        onChange={(event)=>{
          if(event.target.value === ''){
            setProductOldPrice(product.productOldPrice)
          }else{
            setProductOldPrice(event.target.value)
          }
        }}
      />
      <Form.Label>Product Description</Form.Label>
      <Form.Control
        type="text"
        className='input1'
        placeholder="Product Description"
        defaultValue={product.productDesc}
        onChange={(event)=>{
          if(event.target.value === ''){
            setProductDesc(product.productDesc)
          }else{
            setProductDesc(event.target.value)
          }
        }}
      />

              </Form>
            </Form.Group>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' type='submit' onClick={()=>editProduct(id)}>Save Changes</Button>

        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default App;
