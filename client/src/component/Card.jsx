import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";


export default function Card() {
  const [state] = useContext(UserContext);
  const [showLogin, setShowLogin]=useState(false);

  // Fetching Film data from database
  let { data: films } = useQuery("filmCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });

  let asceding = [];
  if (films !== undefined) {
    //operator spread
    asceding = [...films];
    //sort use methods descending for value id
    asceding.sort((a, b) => b.id - a.id);
  }
  return (
    <>
      <Container className="">
            <>
             <div className="mt-5">
              <h3 className="fw-bold text-light">Movies</h3>
             </div>
                <div className="d-flex justify-content-start gap-4">
                  {asceding?.map((item) => {
                    return (
                      <NavLink to={`/detail/${item.id}`} className="text-decoration-none">
                        <div className="d-flex justify-content-start gap-4">
                          <div key={item.id} className="mt-2 mb-5 rounded" style={{ width: "200px" }}>
                              <div>
                                <img className="rounded" src={`${item.thumbnailfilm}`} width="200px" height="300px" style={{objectFit:"cover"}} alt="Card"/>
                              </div>
                                <h5 className="fw-bold text-light mt-3">{item.title}</h5>
                                <p className="text-light">{item.year}</p>
                          </div>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
            </>
      </Container>
    </>
  );
}
