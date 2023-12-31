import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import BusinessDetails from "./components/Businesses/BusinessDetails";
import UserProfilePage from "./components/UserProfilePage";
import BusinessForm from "./components/Businesses/BusinessForm";
import UpdateBusiness from "./components/Businesses/UpdateBusiness"
import ReviewForm from "./components/ReviewForm";
import ProtectedRoute from './components/auth/ProtectedRoute'
import BusinessSearchPage from './components/BusinessSearchPage'
import BusinessNotFound from "./components/Businesses/BusinessNotFound";
import BusinessList from './components/Businesses/BusinessList'
import ErrorPage from "./components/ErrorPage";
import AboutPage from './components/AboutPage'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <nav>
        <Navigation isLoaded={isLoaded} />
      </nav>
      <main>
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/business">
              <BusinessList />
            </Route>
            <Route exact path="/business/new">
              <BusinessForm />
            </Route>
            <Route exact path="/business/:id/edit">
              <UpdateBusiness />
            </Route>
            <Route exact path="/business/:id/review">
              <ReviewForm isBusinessReview={true} />
            </Route>
            <Route exact path="/business/:id">
              <BusinessDetails />
            </Route>
            <Route exact path="/search">
              <BusinessSearchPage />
            </Route>
            <Route exact path="/profile/:userId">
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            </Route>
            <Route exact path="/review/new">
              <ReviewForm isNew={true}/>
            </Route>
            <Route exact path="/review/:reviewId">
              <ReviewForm isUpdate={true} />
            </Route>
            <Route exact path="/notfound">
              <BusinessNotFound />
            </Route>
            <Route path="/error/:error">
              <ErrorPage />
            </Route>
            <Route exact path='/about'>
              <AboutPage />
            </Route>
          </Switch>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
