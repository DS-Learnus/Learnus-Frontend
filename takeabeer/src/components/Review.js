import React, { useState } from "react";
import Comment from "./Comment";
import "../css/Review.css";
import axios from "../../node_modules/axios/index";

const Review = ({reviewId, isBeer}) => {

  const numList =[1,2,3,4,5];
  const scoreList = numList.map((num,index)=><button onClick={()=>{setScore(num); console.log(score);}} type="button" className="btn btn-secondary" key={index}>{num}</button>)
  const [score, setScore] = useState(null);
  
  const [inputText, setInputText] = useState('');
  const onChangeInput = e => setInputText(e.target.value);
  const onClickBtn = () => {
    setInputText('');
  };


  /* 맥주 후기 post */
  const postBeerReview = async () => {
    await axios.post(`api/beer/review`, {
      "beerId": {reviewId}, 
      "score": {score}, 
      "content": {inputText} 
    });
    console.log("Beer Review post");
  }


  /* 레시피 후기 post */
  const postRecipeReview = async () => {
    await axios.post(`api/recipe/review`, {
      "recipeId": {reviewId}, 
      "score": {score}, 
      "content": {inputText} 
    });
    console.log("Recipe Review post");
  }

  return (
    <div className="review">
      <div className="review-write">
        <p className="reviewP">후기 남기기</p>
        <div className="write-rect1"></div>
        <textarea className="write-rect2" value={inputText} onChange={onChangeInput} maxLength={50}/>
        <div
          class="btn-toolbar star-frame"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div class="btn-group mr-2" role="group" aria-label="First group">
            {scoreList}
          </div>
        </div>

        <button type="button" class="write-btn btn btn-warning" onClick={()=>{onClickBtn(); {isBeer? postBeerReview():postRecipeReview()};}}>
          코멘트 작성
        </button>
      </div>

      <div className="review-read">
        <p className="reviewP">코멘트</p>
        <div className="comment-window">
          <Comment userName={"서지혜"} userComment={"댓글1입니다"} userStar={1} />
          <Comment userName={"유수연"} userComment={"댓글2입니다"} userStar={2}/>
          <Comment userName={"오세은"} userComment={"댓글3입니다"} userStar={3}/>
          <Comment userName={"박유나"} userComment={"댓글4입니다"} userStar={4}/>
          <Comment userName={"코코넛"} userComment={"댓글5입니다"} userStar={5}/>
          <Comment userName={"코너톤"} userComment={"댓글6입니다"} userStar={1}/>
        </div>
      </div>

      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Review;
