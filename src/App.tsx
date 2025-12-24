import { useState } from 'react'
import { ThemeProvider } from "next-themes";
import WelcomeScreen from "@/components/WelcomeScreen";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
	const [WelcomeScreen, setWelcomeComplete] = useState(false);

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			
		</ThemeProvider>
	)
}

export default App
