// components
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

// style
import { GlobalStyle } from "./style/global";

export function App() {
	return (
		<>
			<Header />
			<Dashboard />
			<GlobalStyle />
		</>
	);
}
