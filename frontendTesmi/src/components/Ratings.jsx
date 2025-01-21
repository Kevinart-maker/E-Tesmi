import { useState, useEffect } from "react";
import Star from "./Star";
import { useAuthContext } from "../hooks/useAuthContext";
import ReactStars from 'react-rating-stars-component';

const Ratings = (props) => {
    const [reviews, setReviews] = useState('')
    const [reviewMsgs, setReviewMsgs] = useState('')
    const [rating, setRating] = useState('')
    const [ error, setError] = useState(null)
    const { user } = useAuthContext();
    const [msg, setMsg] = useState('')
 

    const sendReviews = async() =>{
        console.log(
            'props', props,
            'user id ', user.id,
            'product id ', props.Products._id,
            'rating ', rating,
            'review ', reviews
        )
        try{
            const response = await fetch(`https://backend-tesmi.vercel.app/ratings/add-review/${props.Products._id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                // credentials: 'include',
                body: JSON.stringify({review : reviews, rating: rating, userId : user.id}),
            })
            const json = await response.json()
    
            if(!response.ok){
                setError(json.message)
                console.log('error-msg', json.message)
            }
            if(response.ok){
                setReviews('')
                setRating('')
                setError(null)
                setMsg('Review created!')
            }
        }catch(error){
            console.log('failed to send: ', error)
        }
    }
    useEffect(()=>{
        
        const fetchReviews = async () =>{
            try{
                const response = await fetch(`https://backend-tesmi.vercel.app/ratings/get-reviews/${props.Products._id}`);
                const data = await response.json();

                if(response.ok){
                    setReviewMsgs(data)
                }
            }catch(error){
                console.error('Failed to fetch products: ', error)
            }
        }

        fetchReviews();
    },[sendReviews])
    
    
    return (
        <div className="ratings">
            <h3>Ratings & Reviews</h3>
            <div className="line"></div>
            { user && (
            <div className="write-review">
                <p>How would you rate this?</p>   
                <ReactStars 
                    value={props.val}
                    count={5}
                    onChange={(value)=>setRating(value)}
                    size={50}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#000000"
                />
                <div className="writeup-card">
                    <label>
                        <p>Write a review</p>
                        <textarea value={reviews} onChange={(e)=> setReviews(e.target.value)} placeholder="Tell us what you think" style={{resize: 'none'}}></textarea>
                    </label>
                    <button className="review-btn" onClick={sendReviews}>Add Review</button>
                </div>
            </div>
            )}
            <div className="line"></div>
            <div className={`review-container ${reviewMsgs.length === 0 ? 'no-review' : ''}`}>
                {
                    reviewMsgs ? (
                        reviewMsgs.map((data, index) => (
                            <div className="review-cards" key={index}>
                                <div className="left-sec">
                                    <Star siz={20} val={data.rating}/>
                                    <h3>{data.userId.name}</h3>
                                </div>
                                <p>{data.review}</p>
                            </div>
                        ))
                    ) :  null
                }
            </div>
        </div>
    );
}
 
export default Ratings