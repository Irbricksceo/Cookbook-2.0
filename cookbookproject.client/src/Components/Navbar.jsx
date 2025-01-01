import { NavLink } from "react-router-dom"
import '../Styles/Navbar.css';

function Navbar() {
    return (
      <div>
        <ul className="Navbar">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink
              to="/Recipies"
              state={{ navCategory: "All" }}
          >All Recipes</NavLink></li>
          <li><NavLink
              to="/Recipies"
              state={{ navCategory: "Appetizers" }}
          >All Appetizers</NavLink></li>
          <li><NavLink
              to="/Recipies" 
              state={{ navCategory: "Entrees" }}
          >All Entrees</NavLink></li>
          <li><NavLink
              to="/Recipies"
              state={{ navCategory: "Deserts" }}
          >All Deserts</NavLink></li>
          <li><NavLink
              to="/Recipies"
              state={{ navCategory: "Soups" }}
          >All Soups</NavLink></li>
          <li><NavLink
              to="/Recipies"
              state={{ navCategory: "Breads" }}  
          >All Breads</NavLink></li>
          <li><NavLink to="/Favorites">Favorites</NavLink></li>
        </ul>
      </div>
  );
}

export default Navbar;