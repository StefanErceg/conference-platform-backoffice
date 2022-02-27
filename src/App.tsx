import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRouter } from './router';

function App() {
    useEffect(() => {
        window.document.title = 'Conference platform';
    }, []);
    return (
        <>
            <div className="App">
                <AppRouter />
            </div>
            <ToastContainer />
        </>
    );
}

export default App;
