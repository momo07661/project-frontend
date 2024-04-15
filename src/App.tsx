import {router} from "./config/RouterConfig.tsx";
import {RouterProvider} from "react-router-dom";
import "./App.css"

// color design: #f39f2f rgba(243, 159, 47, 1), #c66d29 rgba(198, 109, 41, 1), #883f1c rgba(136, 63, 28, 1), #40484a rgba(64, 72, 74, 1)

function App() {
      return (
          <>
              <RouterProvider router={router}/>
          </>
      )
}

export default App
