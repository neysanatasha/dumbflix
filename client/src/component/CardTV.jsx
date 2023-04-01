import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Card1 from "../assets/image/Card.png";
import Card2 from "../assets/image/Cardjoker.png";

export default function Card() {
  // Fetching product data from database
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  let asceding = [];
  if (products !== undefined) {
    //operator spread
    asceding = [...products];
    //sort use methods descending for value id
    asceding.sort((a, b) => b.id - a.id);
  }
  return (
    <>
      <Container>
            <>
            <div className="mt-5">
             <h3 className="fw-bold text-light">TV Show</h3>
             </div>
             <div className="d-flex gap-4">
              <div className="mt-2 mb-5 rounded" style={{ width: "200px" }}>
                  <div>
                    <img className="rounded" src={Card1} width={"100%"} alt="Card"/>
                  </div>
                    <h5 className="fw-bold text-light mt-3">The Witcher</h5>
                    <p className="text-light">2019</p>
              </div>
              <div className="mt-2 mb-5 rounded" style={{ width: "200px" }}>
                  <div>
                    <img className="rounded" src={Card2} width={"100%"} alt="Card"/>
                  </div>
                    <h5 className="fw-bold text-light mt-3">The Joker</h5>
                    <p className="text-light">2019</p>
              </div>
            </div>
            </>
      </Container>
    </>
  );
}
