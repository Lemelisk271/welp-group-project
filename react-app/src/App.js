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
import NewReviewForm from "./components/ReviewForm/NewReview";
import ProtectedRoute from "./components/auth/ProtectedRoute"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
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
          {/* <Route path="/business">
            <AllBusinessess />
          </Route> */}
          <Route exact path="/business/new">
            <BusinessForm />
          </Route>
          <Route exact path="/business/:id/edit">
            <UpdateBusiness />
          </Route>
          <Route exact path="/business/:id/review">
            <NewReviewForm />
          </Route>
          <Route exact path="/business/:id">
            <BusinessDetails />
          </Route>
          <ProtectedRoute>
            <Route exact path="/profile/:userId">
              <UserProfilePage />
            </Route>
          </ProtectedRoute>
          <Route exact path="/review/:reviewId">
            <ReviewForm />
          </Route>
          <Route>
            <h1>Error 404: Page not found</h1>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
