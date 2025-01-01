
import './Styles/App.css';
import Navbar from './Components/Navbar'
import Favorites from './Components/Favorites'
import RecipeData from './Components/RecipeData'
import RecipeGrid from './Components/RecipeGrid';
import Home from './Components/Home'
import { Route, Routes} from "react-router-dom";

function App() {

        return (
            <div>
                <div>
                    <h1>Welcome to Cookbook 2.0</h1>
                </div>
                <Navbar></Navbar>
                <Routes>
                    <Route path='/Home' element={<Home/>} />
                    <Route path='/Recipies' element={<RecipeGrid/>} />
                    <Route path='/Recipe' element={<RecipeData/>} />
                    <Route path='/Favorites' element={<Favorites/>} />
                </Routes>

                </div>
        );
    }

export default App;