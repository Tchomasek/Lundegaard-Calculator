import { Calculator } from "templates";
import { Provider } from "react-redux";
import React from "react";
import store from "core/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Calculator />
    </Provider>
  );
};

export default App;
