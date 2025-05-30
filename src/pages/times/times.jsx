import "./times.less";
import { useEffect, useState } from "react";
import { mockTimesCapitao } from "../../data/mockTimesCapitao.js";
import CardTime from "../../components/cardTime/cardTime.jsx";
import { animate } from "animejs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o loading

  useEffect(() => {
    console.log("Carregando times do mock...");
    setTimeout(() => {
      setData(mockTimesCapitao);
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    animate(".card", {
      translateX: 10,
      duration: 4000,
      alternate: true,
      ease: "outElastic",
    });
  }, [data]);
  return (
    <>
      <Swiper
        spaceBetween={300}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          {" "}
          <img src="https://www.shutterstock.com/image-vector/vinnitsaukraine-september-12-2023-european-260nw-2360384453.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src="https://imo.com.br/wp-content/uploads/2017/08/futebol.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src="https://logos-world.net/wp-content/uploads/2023/09/MLS-logos-The-Major-League-Soccer-logos-and-their-history.png" />
        </SwiperSlide>
      </Swiper>
      <h1 className="text-2xl font-bold mb-4 animate-slide-fade">
        Gerenciar Times
      </h1>
      {isLoading ? (
        <div className="skeleton-cards-container">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton skeleton-card-border"></div>
              <div className="skeleton skeleton-card-title"></div>
              <div className="skeleton-card-buttons">
                <div className="skeleton skeleton-button"></div>
                <div className="skeleton skeleton-button"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cards-container">
          {data.map((time) => (
            <CardTime key={time.id} time={time} className="card" />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
