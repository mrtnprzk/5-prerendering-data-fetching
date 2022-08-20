import React from "react";
import fs from "fs/promises"; //FileSystem - from Next.js
import path from "path"; 

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  // //only if fallback = true
  // if (!loadedProduct) {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

async function getData() {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data;
}

export async function getStaticProps(context) { //It is Function of Next.js so needs to be spelled properly
    const { params } = context;
    const productId = params.pid //pid -> file name

    const data = await getData();

    const product = data.products.find((product) => product.id === productId);

    if (!product) {
        return {notFound: true}
    };

    return {
        props: {
            loadedProduct: product
        }
    }
}

//This must be in for every [route] file
export async function getStaticPaths() { //It is Function of Next.js so needs to be spelled properly
    const data = await getData();
    const ids = data.products.map(product => product.id);
    const pathsWithParams = ids.map(id => ({params: {pid: id}}))

    return {
      paths: pathsWithParams,
      fallback: false, //we can use true/false/"blocking"
    };
}

export default ProductDetailPage;