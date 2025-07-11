import React, { createContext, useState } from "react";
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { fireDB } from "../DataBase/firebaseConfig"; // your firebase init file
import { toast } from "react-toastify";

const myContext = createContext();

export const MyProvider = ({ children }) => {
  const initialProduct = {
    title: "",
    price: "",
    imageUrl: "",
    category: [],
    location: "",
    description: "",
  };

  const [products, setProducts] = useState(initialProduct);
  const [product, setProduct] = useState([]); // list of products
  const [loading, setLoading] = useState(false);

  // Add Product
  const addProduct = async (callback) => {
    if (!products.title || !products.price || !products.imageUrl || !products.category.length) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, {
        ...products,
        time: new Date(),
      });
      toast.success("Product added successfully");
      setProducts(initialProduct);
      if (callback) callback();
    } catch (error) {
      toast.error("Failed to add product");
      console.error(error);
    }
    setLoading(false);
  };

  // Get all products realtime
  const getProductData = () => {
    setLoading(true);
    const q = query(collection(fireDB, "products"), orderBy("time", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let prodArr = [];
      snapshot.forEach((doc) => {
        prodArr.push({ id: doc.id, ...doc.data() });
      });
      setProduct(prodArr);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return unsubscribe; // caller can use to unsubscribe on unmount
  };

  // Get single product by id
  const getProductById = async (id) => {
    try {
      const docRef = doc(fireDB, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        toast.error("Product not found");
        return null;
      }
    } catch (error) {
      toast.error("Failed to get product");
      console.error(error);
      return null;
    }
  };

  // Update product
  const updateProduct = async (id, callback) => {
    if (!products.title || !products.price || !products.imageUrl || !products.category.length) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(fireDB, "products", id);
      await updateDoc(docRef, {
        ...products,
        time: new Date(),
      });
      toast.success("Product updated successfully");
      setProducts(initialProduct);
      if (callback) callback();
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    }
    setLoading(false);
  };

  // Delete product
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const docRef = doc(fireDB, "products", id);
      await deleteDoc(docRef);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <myContext.Provider
      value={{
        products,
        setProducts,
        product,
        loading,
        addProduct,
        getProductData,
        updateProduct,
        deleteProduct,
        edithandle: setProducts,
        getProductById,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default myContext;
