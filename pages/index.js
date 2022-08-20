import Link from 'next/link'; //FileSystem - from Next.js
import fs from 'fs/promises'; //FileSystem - from Next.js
import path from 'path'; 

function HomePage(props) {

  const {products} = props

  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps(context) {

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {destination: "/redirect"}
    };
  };

  if (jsonData.length == 0) {
    return {
      notFound: true
    };
  };

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, //regenerate every 10 sec
    // notFound: true, //if true -> 404 error
    // redirect: {destination: "/redirect"} //redirect to http://localhost:3000/redirect
  };
}

export default HomePage;