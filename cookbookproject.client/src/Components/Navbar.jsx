import { NavLink } from "react-router-dom"
function Navbar() {
    return (
      <div>
        <ul className="Navbar">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink
              to="/Recipies"
              state={{ Category: "All" }}
          >All Recipes</NavLink></li>
          <li><NavLink
              to="/Recipies"
              state={{ Category: "Appetizers" }}
          >All Appetizers</NavLink></li>
          <li><NavLink
              to="/Recipies" 
              state={{ Category: "Entrees" }}
          >All Entrees</NavLink></li>
          <li><NavLink
              to="/Recipies"
              state={{ Category: "Deserts" }}
          >All Deserts</NavLink></li>
          <li><NavLink
              to="/Recipies"
              state={{ Category: "Soups" }}
          >All Soups</NavLink></li>
          <li><NavLink
              to="/Recipies"
              state={{ Category: "Breads" }}  
          >All Breads</NavLink></li>
          <li><NavLink to="/Favorites">Favorites</NavLink></li>
        </ul>
      </div>
  );
}

export default Navbar;