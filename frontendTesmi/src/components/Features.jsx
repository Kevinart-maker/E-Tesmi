const Features = () => {

    const iconsData = [
        {
            img: '/icon2.png',
            title: 'Easy Wins',
            content: 'Get your best looking smile now!'
        },
        {
            img: '/icon1.png',
            title: 'Concrete',
            content: 'Defalcate is most focused in helping you discover your most beautiful smile'
        },
        {
            img: '/icon3.png',
            title: 'Hack Growth',
            content: 'Overcame any hurdle or any other problem.'
        },
    ]

    const icons = iconsData.map((data) => (
        <div className="icon-card" key={data.title}>
            <img src={data.img} alt={data.title} />
            <h3>{data.title}</h3>
            <p>{data.content}</p>
        </div>
    ))
    
    return (
        <div className="features">
            <div className="top-sec">
                <p>Featured Products</p>
                <h3>THE BEST SERVICES</h3>
                <span>Problems trying to resolve the conflict between</span>
            </div>
            <div className="bottom-sec">
                {icons}
            </div>
        </div>
    );
}
 
export default Features;