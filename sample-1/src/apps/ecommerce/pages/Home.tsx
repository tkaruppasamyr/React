import { Outlet,NavLink } from "react-router-dom";

export const Home = () => {
    return (
        <div>
            <NavLink to="categories" className="m-3 btn btn-primary">categories</NavLink>
            <button className="m-3 btn btn-primary">products</button>
            <button className="m-3 btn btn-primary">orders</button>

            <Outlet />
        </div>
    );
};