import { useReducer } from "react";
import { AppPage } from "./Pages/AppPage";
import { appInitialState, appReducer } from "./Reducers/appReducer";
import { WelcomePage } from "./Pages/WelcomePage";

function App() {
  const [state, dispatch] = useReducer(appReducer, appInitialState)

  return (
    <>

      {state.welcomePage.visibility ? <WelcomePage
        localication={state.pageContent.localization}
        timeToHide={state.welcomePage.timeToHide}
        onHiding={() => dispatch({ type: "changeWelcomePageVisibility", payload: false })}
      /> : ''}
      <AppPage state={state} dispatch={dispatch} />

    </>
  )
}

export default App;
