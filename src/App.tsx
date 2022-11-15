import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Screen } from "./common/components/Screen";
import { AuthPage } from "./auth/AuthPage";
import { ReviewPage } from "./review/ReviewPage";
import { store } from "./common/utils/redux";
import { RedirectByAuthStatus } from "./common/components/RedirectByAuthStatus";

export const App = () => {
  return (
    <Provider store={store}>
      <Screen>
        <BrowserRouter>
          <RedirectByAuthStatus />
          <Switch>
            <Route exact path="/">
              <AuthPage />
            </Route>
            <Route path="/review">
              <ReviewPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </Screen>
    </Provider>
  );
};
