import { useEffect, useState } from "react";
import './styles.css';

const CustomScrollIndicator = ({ url }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const fetchData = async (getUrl) => {
        try {
            setLoading(true);
            const response = await fetch(getUrl);
            const data = await response.json();

            if (data && data.products && data.products.length > 0) {
                setData(data.products);
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            setErrorMessage(e.message);
        }
    }

    useEffect(() => {
        fetchData(url);
    }, [url])

    const handleScrollPercentage = () => {
        // console.log(
        //     document.body.scrollTop, 
        //     document.documentElement.scrollTop, 
        //     document.documentElement.scrollHeight, 
        //     document.documentElement.clientHeight
        // );

        const howMuchScrolled = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        setScrollPercentage((howMuchScrolled / height) * 100)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScrollPercentage);

        return () => {
            window.removeEventListener('scroll', () => { })
        }
    }, [])

    if (errorMessage) {
        return <div>Error ! {errorMessage}</div>
    }

    if (loading) {
        return <div>Loading data. Please wait...</div>
    }

    return (
        <div>
            <div className="top-container">
                <h1>Scroll Progress Indicator</h1>
                <p>Scrolled: {Math.floor(scrollPercentage)}%</p>

                <div className="scroll-progress-tracking-container">
                    <div
                        className="current-progress-bar"
                        style={{ width: `${scrollPercentage}%` }}
                    ></div>
                </div>
            </div>

            <div className='data-container'>
                {
                    data && data.length > 0 ?
                        data.map(dataItem =>
                            <div className="data-item" key={dataItem.id}>
                                <h3>{dataItem.title}</h3>
                                <p>{dataItem.description}</p>
                            </div>
                        )
                        : null
                }
            </div>
        </div>
    )
};

export default CustomScrollIndicator;