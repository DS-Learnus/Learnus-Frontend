import React, { useState, useEffect } from "react";
import Review from "../components/Review";
import axios from "../../node_modules/axios/index";
import "../css/BeerDetail.css";
import "../css/Review.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; // ♡
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // ♥︎

const BeerDetail = ({beerId}) => {

    const [name, setName] = useState([]);
    const [star, setStar] = useState([]);
    const [alcohol, setAlcohol] = useState([]);
    const [ingre, setIngre] = useState([]);
    const [intro, setIntro] = useState([]);

    useEffect(() => {
        console.log({beerId});
        const fetchData = async () => {
          try {
            const response = await axios.get(`/api/beer/${beerId}`);
            setName(response.data.beerDetail.name); 
            setStar(response.data.likes); 
            setAlcohol(response.data.beerDetail.abv); 
            setIngre(response.data.beerDetail.ingredient); 
            setIntro(response.data.beerDetail.intro); 
            console.log(response.data); 
          } catch (e) {
            console.log(e);
          }
        };
        fetchData();
      }, []);
    
    const [heart, setHeart] = useState(false);
    const handleLike = e => setHeart(!heart);

    return (
        <div className="BeerDetail">
            <div className="BeerDetail-Info">
                <div className='heart-icon'>
                    <FontAwesomeIcon  icon={heart ? solidHeart : regularHeart} onClick={handleLike} size="4x" color='#F24E1E'/>
                </div>
                <p>{name}</p>
                <div className="BeerDetail-lines">
                    <div className="BeerDetail-line">
                        <p>평균 별점</p>
                        <p>{star}</p>
                    </div>
                    <div className="BeerDetail-line">
                        <p>도수</p>
                        <p>{alcohol}</p>
                    </div>
                    <div className="BeerDetail-line">
                        <p>원재료</p>
                        <p>{ingre}</p>
                    </div>
                    <div className="BeerDetail-line">
                        <p>특징</p>
                        <p>{intro}</p>
                    </div>
                </div>
                <div className="BeerDetail-image">
                <img alt="terra" src={require("../img/terra.jpg")} />
                </div>
            </div>

            

        

            <Review />
        </div>
  );
};

export default BeerDetail;
