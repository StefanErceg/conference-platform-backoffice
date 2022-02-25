import React, { useEffect } from 'react';
import { AppRouter } from './router';

function App() {
    useEffect(() => {
        window.document.title = 'Conference platform';
    }, []);
    return (
        <div className="App">
            <AppRouter />
        </div>
    );
}

export default App;
