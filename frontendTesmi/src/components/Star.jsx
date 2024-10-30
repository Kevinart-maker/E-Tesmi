import ReactStars from 'react-rating-stars-component';

const Star = (props) => {
    return (
        <ReactStars 
            value={props.val}
            count={5}
            onChange={(value)=>console.log(`New rating: ${value}`)}
            size={props.siz}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#000000"
        />
    );
}
 
export default Star;