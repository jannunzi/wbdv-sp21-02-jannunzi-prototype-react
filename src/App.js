import SearchScreen from "./components/search-screen";
import DetailsScreen from "./components/details-screen";
import {BrowserRouter, Route} from "react-router-dom";
import HomeScreen from "./components/home-screen";
import Login from "./components/users/login";
import Register from "./components/users/register";
import Profile from "./components/users/profile";

function App() {
  return (
    <div className="container-fluid">
        <BrowserRouter>
            <Route path="/" exact={true}>
                <HomeScreen/>
            </Route>
            <Route path="/login" exact={true}>
                <Login/>
            </Route>
            <Route path="/register" exact={true}>
                <Register/>
            </Route>
            <Route path="/profile" exact={true}>
                <Profile/>
            </Route>
            <Route path={["/search", "/search/:title"]}
                   exact={true}>
                <SearchScreen/>
            </Route>
            <Route path="/details/:imdbID" exact={true}>
                <DetailsScreen/>
            </Route>
        </BrowserRouter>
    </div>
  );
}

export default App;
