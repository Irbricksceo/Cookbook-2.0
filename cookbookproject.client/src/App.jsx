
import './Styles/App.css';
import Navbar from './Components/Navbar'
import RecipeData from './Components/RecipeData'
import RecipeGrid from './Components/RecipeGrid';
import Home from './Components/Home'
import CreateEditRecipe from './Components/CreateEditRecipe'
import { Route, Routes} from "react-router-dom";

function App() {

        return (
            <div>
                <div className="headerBar">
                    <h1>Welcome to Cookbook 2.0</h1>
                    <Navbar></Navbar>
                </div>
                <div className="content">
                    <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/Recipies' element={<RecipeGrid/>} />
                    <Route path='/Recipe' element={<RecipeData/>} />
                    <Route path='/CreateEditRecipe' element={<CreateEditRecipe/>} />
                </Routes>
                </div>
            </div>
        );
    }

export default App;