import { Suspense, lazy } from 'react';


const WorkerApp = lazy(() => import('worker/App'));

function App() {

  return (
    <div>
      <h1>Shell</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <WorkerApp />
      </Suspense>
    </div>  
  )
}

export default App
