import content from '/content.png'
// import content2 from '/content2.png'

const Content = () => {
    return (
        <div className="content">
            <div className="left-sec">
                <img src={content} alt="" />
                {/* <img src={content2} alt="" /> */}
            </div>
            <div className="right-sec">
                <h3>Featured Products</h3>
                <h1>We love what we do</h1>
                <p>
                    Problems trying to resolve the conflict between <br />
                    the two major realms of classical physics: <br />
                    Newtonian mechanics.
                </p>
                <p>
                    Problems trying to resolve the conflict between <br />
                    the two major realms of classical physics: <br />
                    Newtonian mechanics.
                </p>
            </div>
        </div>
    );
}
 
export default Content;