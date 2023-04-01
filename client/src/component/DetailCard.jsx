import { useParams, useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";
// import { useState } from "react";
import { Container } from "react-bootstrap";
import Eps1 from "../assets/image/Witcher.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useEffect } from "react";
// import Swal from "sweetalert2";

export default function Details(props) {
  const { IsLogin, user } = props;
  const {id} = useParams();


  // Fetching product data from database
  let { data: films } = useQuery("filmCache", async () => {
    const response = await API.get(`/film/${id}`);
    return response.data.data;
  });

  return (
    <>
      <div>
        <Container className="justify-content-center pt-5 mt-4">
          <div>
            <iframe width="1300" height="720" src={films?.linkfilm} alt="Video" allowFullScreen />
          </div>
            <div className="row mt-4"> 
               <div className="col-md-2 mb-3">    
                  <img className="rounded" src={films?.thumbnailfilm} width= "200px" height="300px" style={{ objectFit:"cover" }} alt="Card"/>
               </div>
               <div className="col-md-5">
               <h2 className="fw-bold text-light mt-4">{films?.title}</h2>
                <div className="d-flex gap-4">
                  <p className="text-secondary fw-lighter ">{films?.year}</p>
                  <p className="text-secondary fw-lighter border rounded pe-3 ps-3">TV Series</p>
                </div>
                <p className="text-light" style={{textAlign:"justify"}}>{films?.description}</p>
               </div>
               <div className="col-md-5"> 
               <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    <SwiperSlide>
                      <div className="carousel-item active">
                        <img
                          src={Eps1}
                          className="d-block w-100 rounded"
                          alt="..."
                        />
                        <p className="text-center mt-2 text-light">Movies : Ep 1</p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="carousel-item active">
                        <img
                          src={Eps1}
                          className="d-block w-100 rounded"
                          alt="..."
                        />
                        <p className="text-center mt-2 text-light">Movies : Ep 2</p>
                      </div>
                    </SwiperSlide>
                </Swiper>
                </div>
          </div>
        </Container>
      </div>
    </>
  );
}
