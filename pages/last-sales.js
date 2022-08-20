import React, {useState, useEffect} from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  //Next.js Hook needs to be installed
  const { data, error } = useSWR(
    "https://mrtnprzk-nextjs-course-default-rtdb.europe-west1.firebasedatabase.app/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(true);

  // //1. way without useSWR
  // useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://mrtnprzk-nextjs-course-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  //     ).then(response => response.json()).then(data => {
  //         const transformedSales = []
  //         for (const key in data) {
  //             transformedSales.push({
  //               id: key,
  //               username: data[key].username,
  //               volume: data[key].volume,
  //             });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false)
  //     });

  // }, []);

  //2. way with useSWR
  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failet to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
    const response = await fetch(
        "https://mrtnprzk-nextjs-course-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
    );
    const data = await response.json();

    const transformedSales = [];
    
    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        });
    }

    return {props: {sales: transformedSales}, revalidate: 10};
    
};

export default LastSalesPage;