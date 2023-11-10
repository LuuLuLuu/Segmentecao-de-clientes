$(document).ready(function () {
	// DOM elements
	const $addToSystem = $("#addToSystem");

	const uniqueID = () => {};

	const addClientToSystem = (cnpj, razaoSocial, faturamento) => {
		// Create a row for new client
		const $newClient = $("<tr></tr>");

		// Table datas
		const $idData = $("<td></td>").attr("id", "uniqueIdCounter").text(uniqueID());

		const $cnpjData = $("<td></td>").text(cnpj);

		const $razaoSocialData = $("<td></td>").text(razaoSocial);

		const $faturamentoData = $("<td></td>").text(faturamento);
	};
});
