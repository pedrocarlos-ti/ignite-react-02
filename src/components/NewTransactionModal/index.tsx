import React, { useState } from "react";
import Modal from "react-modal";
import { useTransactions } from "../../hooks/useTransactions";

import { Container, RadioBox, TransactionTypeContainer } from "./styles";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

Modal.setAppElement("#root");

interface NewTransactionModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

export function NewTransactionModal({
	isOpen,
	onRequestClose,
}: NewTransactionModalProps) {
	const { createTransaction } = useTransactions();

	const [type, setType] = useState("deposit");
	const [title, setTitle] = useState("");
	const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState("");

	async function handleCreateNewTransaction(event: React.FormEvent) {
		event.preventDefault();

		await createTransaction({
			title,
			type,
			amount,
			category,
		});

		onRequestClose();

		// Reset state
		setType("deposit");
		setTitle("");
		setAmount(0);
		setCategory("");
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
		>
			<button
				type="button"
				onClick={onRequestClose}
				className="react-modal-close"
			>
				<img src={closeImg} alt="Fechar modal" />
			</button>

			<Container onSubmit={handleCreateNewTransaction}>
				<h2>Cadastrar transação</h2>

				<input
					type="text"
					value={title}
					placeholder="Título"
					onChange={(event) => setTitle(event.target.value)}
				/>
				<input
					type="number"
					value={String(amount)}
					placeholder="Valor"
					onChange={(event) => setAmount(Number(event.target.value))}
				/>

				<TransactionTypeContainer>
					<RadioBox
						type="button"
						activeColor="green"
						isActive={type === "deposit"}
						onClick={() => setType("deposit")}
					>
						<img src={incomeImg} alt="Entrada" />
						<span>Entrada</span>
					</RadioBox>

					<RadioBox
						type="button"
						activeColor="red"
						isActive={type === "withdraw"}
						onClick={() => setType("withdraw")}
					>
						<img src={outcomeImg} alt="Saida" />
						<span>Saida</span>
					</RadioBox>
				</TransactionTypeContainer>

				<input
					type="text"
					value={category}
					placeholder="Categoria"
					onChange={(event) => setCategory(event.target.value)}
				/>

				<button type="submit">Cadastrar</button>
			</Container>
		</Modal>
	);
}
