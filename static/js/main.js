$(document).ready(function () {

    const $form = $("#clientForm")
    const $modal = new bootstrap.Modal("#clientModal");
    const $cnpjInput = $("#cnpjInput")
    const $razaoSocialInput = $("#razaoSocialInput")
    const $faturamentoInput = $("#faturamentoInput")
    const usedIDs = [];

    const createIconButton = (btnClasses, clickHandler) => {
        const $button = $("<span></span>").addClass(btnClasses);
        $button.click(clickHandler);
        return $button;
    };
    
    const uniqueID = () => {
        let newID;
    
        do {
            newID = Math.floor(Math.random() * 9999) + 1;
        } while (usedIDs.includes(newID));

        usedIDs.push(newID);
    
        return newID;

    };

	const addClientToSystem = (cnpj, razaoSocial, faturamento) => {

		const $newClient = $("<tr></tr>");
		const $idData = $("<td></td>").attr("id", "uniqueIdCounter").text(uniqueID());
		const $cnpjData = $("<td></td>").text(cnpj);
		const $razaoSocialData = $("<td></td>").text(razaoSocial);
		const $faturamentoData = $("<td></td>").text(faturamento);
        const $classe = $("<td></td>")

        const $faturamentoDecimal = parseFloat(faturamento)

        if ($faturamentoDecimal >= 10000) {
            $classe.text("Classe A")
        } else if ($faturamentoDecimal >= 8000) {
            $classe.text("Classe B")
        } else if ($faturamentoDecimal >= 5000) {
            $classe.text("Classe C")
        } else {
            $classe.text("Classe D")
        }
        
        const $editButton = createIconButton("bi bi-pencil-square btn", () => {
            while (true) {
                const editedRazaoSocialText = prompt("Novo nome da companhia", razaoSocial);
                if (editedRazaoSocialText !== null) {
                    $razaoSocialData.text(editedRazaoSocialText);
                    break
                } else {
                    alert("Você deve informar uma razão social válida.")
                    continue
                }
            }
            while (true) {
                const editedCpnjText = prompt("Novo CNPJ", cnpj);
                if (editedCpnjText !== null) {
                    $cnpjData.text(editedCpnjText);
                    break
                } else {
                    alert("Você deve informar um CNPJ válido.")
                    continue
                }
            }
            while (true) {
                const editedFaturamentoText = prompt("Novo faturamento", faturamento);
                if (editedFaturamentoText !== null) {
                    $faturamentoData.text(editedFaturamentoText);
                    const $faturamentoDecimalEdit = parseFloat(editedFaturamentoText)
                    if ($faturamentoDecimalEdit >= 10000) {
                        $classe.text("Classe A")
                    } else if ($faturamentoDecimalEdit >= 8000) {
                        $classe.text("Classe B")
                    } else if ($faturamentoDecimalEdit >= 5000) {
                        $classe.text("Classe C")
                    } else {
                        $classe.text("Classe D")
                    }
                    break
                } else {
                    alert("Você deve informar um faturamento válido.")
                    continue
                }
            }
        });

        const $deleteButton = createIconButton("bi bi-person-dash btn", () => $newClient.remove());

        const $buttonsContainer = $("<td></td>")
        $buttonsContainer.append($editButton, $deleteButton);
        $newClient.append($idData, $cnpjData, $razaoSocialData, $classe, $faturamentoData, $buttonsContainer);

        $(`#tableId`).append($newClient);
	};

    $form.submit(event => {
        event.preventDefault();

        if ($form[0].checkValidity()) {
            addClientToSystem($cnpjInput.val(), $razaoSocialInput.val(), $faturamentoInput.val());
            $form[0].reset();
            $modal.hide();
            $form.removeClass("was-validated");
        } else {
            $form.addClass("was-validated");
        }
    });

});
