import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
const Listing = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setlisting] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  useEffect(() => {
    const fetchlisting = async () => {
      try {
        setloading(true);
        const res = await fetch(
          `http://localhost:3000/api/list/get/${params.listId}`
        );
        const data = await res.json();
        if (data.success === false) {
          seterror(true);
          setloading(false);
          return;
        }
        setlisting(data);
        setloading(false);
        seterror(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };
    fetchlisting();
  }, [params.listId]);

  return (
    <main>
      {loading && <p className=" text-center my-7 text-2xl"> Loading...</p>}
      {error && (
        <p className=" text-center my-7 text-2xl"> Something went wrong...</p>
      )}
      {listing && !error && !loading && (
        <div>
          <Swiper navigation>
            {listing.image.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
};

export default Listing;
