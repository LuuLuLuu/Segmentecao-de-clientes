$(document).ready(() => {
	// DOM elements
	const $addToSystem = $("#clientForm");
	const $closeModal = $("#closeModal");
	const $cnpjInput = $("#cnpjInput");
	const $razaoSocialInput = $("#razaoSocialInput");
	const $faturamentoInput = $("#faturamentoInput");
	const $modal = new bootstrap.Modal("#clientModal");

	const uniqueID = () => {
		const $tbodyTable = $(".systemTable table tbody");
		const $lastRow = $tbodyTable.find("tr:last");
		const $lastIdValue = $lastRow.find("td:first").text();

		const formattedID = String(+$lastIdValue + 1).padStart(4, "0");

		return formattedID;
	};

	const clientClass = (faturamento) => {
		faturamento = undoFormatting(faturamento);

		const classA = 10000;
		const classB = 8000;
		const classC = 5000;
		const classD = 3000;

		if (faturamento >= classA) {
			return "Classe A";
		} else if (faturamento >= classB) {
			return "Classe B";
		} else if (faturamento >= classC) {
			return "Classe C";
		} else if (faturamento >= classD) {
			return "Classe D";
		} else {
			return "Não aplicável";
		}
	};

	const createIconButton = (classIconName, dataBs, clickHandler) => {
		const $button = $("<div></div>").addClass("btn").click(clickHandler);

		if (dataBs) {
			$button.attr({
				id: "editClient",
				"data-bs-toggle": "modal",
				"data-bs-target": "#clientModal",
			});
		}

		const $span = $("<span></span>").append($("<i></i>").addClass(classIconName));
		$button.append($span);

		return $button;
	};

	const undoFormatting = (faturamento) => {
		faturamento = faturamento.replace(".", "");
		faturamento = faturamento.slice(0, -3);

		return +faturamento;
	};

	const addClientToSystem = (cnpj, razaoSocial, faturamento) => {
		// Create a row for new client
		const $newClient = $("<tr></tr>");

		// Table datas
		const $idData = $("<td></td>").addClass("uniqueIdCounter").text(uniqueID());
		const $cnpjData = $("<td></td>").text(cnpj);
		const $razaoSocialData = $("<td></td>").text(razaoSocial);
		const $classeData = $("<td></td>").text(clientClass(faturamento));
		const $faturamentoData = $("<td></td>").text(
			$("#faturamentoInput").mask("000.000.000.000.000,00", { reverse: true }).val()
		);
		const $buttonsData = $("<td></td>");

		// Edit Client
		$buttonsData.append(
			createIconButton("bi bi-pencil-square", true, function () {
				// ação para editar o cliente
			})
		);

		// Remove Client
		$buttonsData.append(
			createIconButton("bi bi-person-dash", false, () => {
				$newClient.remove();
			})
		);

		// Append data to the row
		$newClient.append($idData, $cnpjData, $razaoSocialData, $classeData, $faturamentoData, $buttonsData);

		// Append the row to the table
		const $tbodyTable = $(".systemTable table tbody");
		$tbodyTable.append($newClient);
	};

	// CNPJ mask
	$("#cnpjInput").mask("00.000.000/0000-00");

	// Money mask
	$("#faturamentoInput").mask("000.000.000.000.000,00", { reverse: true }).val();

	// Reset modal if cancel button has been clicked
	$closeModal.on("click", () => {
		$addToSystem[0].reset();
	});

	$addToSystem.validate({
		// Submit event handler
		submitHandler: (form, event) => {
			event.preventDefault();

			addClientToSystem($cnpjInput.val(), $razaoSocialInput.val(), $faturamentoInput.val());

			$modal.hide();
			$addToSystem[0].reset();
		},

		// Definition of the element and the class associated to that element
		errorElement: "div",
		errorClass: "invalid-feedback",

		// Highlight error
		highlight: (element, _, errorClass) => {
			$(element).addClass(errorClass);
		},

		unhighlight: (element, _, errorClass) => {
			$(element).removeClass(errorClass);
		},

		// Input validation
		rules: {
			cnpj: {
				required: true,
				cnpjValidation: true,
				isCnpjValid: true,
			},

			razaoSocial: {
				required: true,
				razaoSocialValidation: true,
			},

			faturamento: {
				required: true,
				faturamentoValidation: true,
			},
		},

		// Error messages
		messages: {
			cnpj: {
				required: "Por favor, informe o CNPJ.",
				cnpjValidation: "Informe um CNPJ válido.",
				isCnpjValid: "CNPJ não é válido.",
			},

			razaoSocial: {
				required: "Por favor, informe a razão social.",
				razaoSocialValidation: "Esta razão social já está em uso.",
			},

			faturamento: {
				required: "Por favor, informe um valor válido.",
				faturamentoValidation: "O valor deve ser de pelo menos R$ 3.000,00.",
			},
		},
	});

	// Custom validations

	// CNPJ length
	jQuery.validator.addMethod("cnpjValidation", (value) => {
		if (value.length === 18) return true;
		else return false;
	});

	// Validation of CNPJ
	jQuery.validator.addMethod("isCnpjValid", (value) => {
		const originalValue = value;

		let multipliers = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
		let sumList = [];

		value = value.replace(/\./g, "");
		value = value.replace(/\//g, "");
		value = value.replace(/-/g, "");
		value = value.slice(0, -2);

		for (let i = 0; i < value.length; i++) {
			const n1 = parseInt(value[i], 10);
			const n2 = multipliers[i];

			sumList.push(n1 * n2);
		}

		let sum = sumList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		let remainingDivision = sum % 11;
		let firstCode = remainingDivision < 2 ? 0 : 11 - remainingDivision;

		if (firstCode !== +originalValue.slice(-2, -1)) {
			return false;
		}

		multipliers = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
		sumList = [];
		value = originalValue;

		value = value.replace(/\./g, "");
		value = value.replace(/\//g, "");
		value = value.replace(/-/g, "");
		value = value.slice(0, -1);

		for (let i = 0; i < value.length; i++) {
			const n1 = parseInt(value[i], 10);
			const n2 = multipliers[i];

			sumList.push(n1 * n2);
		}

		sum = sumList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		remainingDivision = sum % 11;
		let secondCode = remainingDivision < 2 ? 0 : 11 - remainingDivision;

		console.log(firstCode);
		console.log(secondCode);

		if (secondCode === +originalValue.slice(-1)) {
			return true;
		} else {
			return false;
		}
	});

	// Duplicates names in the system
	jQuery.validator.addMethod("razaoSocialValidation", (value) => {
		const $allNames = $("table tbody td:nth-child(3)");
		const allNames = [];

		$allNames.each(function () {
			allNames.push($(this).text().toLowerCase());
		});

		return !allNames.includes(value.toLowerCase());
	});

	// If the value is applicable to the class D
	jQuery.validator.addMethod("faturamentoValidation", (value) => {
		if (+undoFormatting(value) >= 3000) return true;
		else return false;
	});
});
