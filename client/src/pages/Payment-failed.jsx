import { NavLink } from "react-router-dom"

export const PaymentFailed = () =>{
    return<>
        <section id="error-page">
            <div className="content">
                <h4>Payment failed</h4>

                <div className="btns">
                    <NavLink to="/">return home</NavLink>
                    <NavLink to="/contact">report problem</NavLink>
                </div>
            </div>
        </section>
    </>
}