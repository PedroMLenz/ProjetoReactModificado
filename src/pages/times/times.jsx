import "./times.less";
import { useEffect, useState } from "react";
import { mockTimesCapitao } from "../../data/mockTimesCapitao.js";
import CardTime from "../../components/cardTime/cardTime.jsx";
import { animate } from "animejs";

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
      <h1>Gerenciar Times</h1>
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
