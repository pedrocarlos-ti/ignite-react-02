import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global";

import { createServer } from "miragejs";

createServer({
	routes() {
		this.namespace = "api";

		this.get("/transactions", () => {
			return [
				{
					id: 1,
					title: "Transaction 1",
					amount: 400,
					type: "deposit",
					category: "Food",
					createdAt: new Date(),
				},
			];
		});
	},
});

export function App() {
	const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

	function handleOpenNewTransactionModal() {
		setIsTransactionModalOpen(true);
	}

	function handleCloseNewTransactionModal() {
		setIsTransactionModalOpen(false);
	}

	return (
		<>
			<Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
			<Dashboard />

			<NewTransactionModal
				isOpen={isTransactionModalOpen}
				onRequestClose={handleCloseNewTransactionModal}
			/>

			<GlobalStyle />
		</>
	);
}
