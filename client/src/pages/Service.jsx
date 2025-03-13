import { useAuth } from "../store/auth";
import axios from 'axios';

export const Service = () =>{

    const {services} = useAuth();

    const handlePayment = async (price) =>{
        // alert(price);
    
        const data = {
          name: "yash",
          mobileNumber:"9798604779",
          amount: price,
        }
        try {
          const response = await axios.post('http://localhost:5000/api/data/service/createOrder', data)
        //   console.log(response.data)
          window.location.href = response.data.url
        } catch (error) {
        //   console.log("error in payment", error)
            console.log("error in payment handle");
        }
    }

    return <section className="section-services">
        <div className="container">
            <h1 className="main-heading">Services</h1>
        </div>
        <div className="container grid grid-three-cols">

            {
                services.map((currElem, index)=>{
                    const {price, description, provider, service} = currElem;
                    return (<div className="card" key={index}>
                        <div className="card-img">
                            <img src="/images/design.png" alt="our services info" width="200" height="50" />
                        </div>
                        <div className="card-details">
                            <p>{provider}</p>
                            <p>{price}</p>
                        </div>
                        <h2>{service}</h2>
                        <h2>{description}</h2>
                        <div>
                            <button onClick={() => handlePayment(price)}>Pay Now</button>
                        </div>
                    </div>);
                })
            }
        </div>
    </section>
}