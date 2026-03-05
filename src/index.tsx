import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'

import 'app/styles/variables/index.scss'
import { App } from 'app/App'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'
import { StoreProvider } from 'app/providers/StoreProvider'

const container = document.getElementById('root')

if(!container) {
    throw new Error('Контейнер не найден')
}

const root = createRoot(container)


root.render(
    <BrowserRouter>
        <ErrorBoundary>
            <StoreProvider >
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </StoreProvider> 
        </ErrorBoundary>
    </BrowserRouter>
)

