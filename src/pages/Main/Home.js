import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { toggle, toggleBrands } from "../../feature/filter/filterSlice";
import { getProducts } from "../../feature/products/productSlice";

const Home = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const { brands, stock } = filter
  const { products, isLoading } = useSelector(state => state.products)

  useEffect(() => {
    // fetch("http://localhost:5000/products")
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data.data));

    dispatch(getProducts())

  }, [dispatch]);



  const activeClass = "text-white  bg-indigo-500 border-white";

  let content;

  if (isLoading) {
    content = <div>Loading</div>
  }

  if (products) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ))
  }

  if (products && (stock || brands.length)) {
    content = products.filter(pd => {
      if (stock) {
        return pd.status === true
      }
      return pd
    })
      .filter(pd => {
        if (brands.length) {
          return filter.brands.includes(pd.brand)
        }
        return pd
      }).map((product) => (
        <ProductCard key={product.model} product={product} />
      ))
  }

  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${stock ? activeClass : null} `}
          onClick={() => dispatch(toggle())}
        >
          In Stock
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('amd') ? activeClass : null}`}
          onClick={() => dispatch(toggleBrands('amd'))}
        >
          AMD
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('intel') ? activeClass : null}`}
          onClick={() => dispatch(toggleBrands('intel'))}
        >
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {content}
      </div>
    </div>
  );
};

export default Home;
