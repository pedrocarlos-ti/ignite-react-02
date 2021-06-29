import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global";

import { createServer, Model } from "miragejs";
import { TransactionsProvider } from "./hooks/useTransactions";

// MirageJS configuration
createServer({
	models: {
		transaction: Model,
	},
	seeds(server) {
		server.db.loadData({
			transactions: [
				{
					id: 1,
					title: "Pagamento de energia eletrica",
					type: "withdraw",
					category: "Casa",
					amount: 150,
					createdAt: new Date("2021-02-12 09:00:00"),
				},
				{
					id: 2,
					title: "Freelancer",
					type: "deposit",
					category: "work",
					amount: 500,
					createdAt: new Date("2021-02-16 12:30:00"),
				},
			],
		});
	},
	routes() {
		this.namespace = "api";

		this.get("/transactions", () => {
			return this.schema.all("transaction");
		});

		this.post("/transactions", (schema, request) => {
			const data = JSON.parse(request.requestBody);

			return schema.create("transaction", { ...data, createdAt: new Date() });
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
		<TransactionsProvider>
			<Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
			<Dashboard />

			<NewTransactionModal
				isOpen={isTransactionModalOpen}
				onRequestClose={handleCloseNewTransactionModal}
			/>

			<GlobalStyle />
		</TransactionsProvider>
	);
}
