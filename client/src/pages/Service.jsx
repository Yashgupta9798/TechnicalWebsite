import { useAuth } from "../store/auth";

export const Service = () =>{

    const {services} = useAuth();
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
                    </div>);
                })
            }
        </div>
    </section>
}