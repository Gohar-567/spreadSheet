import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

ReactDOM.createRoot(rootElement).render(
    <App />
)
