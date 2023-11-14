$(document).ready(function () {

    const $form = $("#clientForm")
    const $modal = new bootstrap.Modal("#clientModal");
    const $cnpjInput = $("#cnpjInput")
    const $razaoSocialInput = $("#razaoSocialInput")
    const $faturamentoInput = $("#faturamentoInput")

    const saveClientsToLocalStorage = () => {
        const clients = [];

        const $clients = $(".client-list");


        $.each($clients, (_, client) => {
            const $client = $(client);
            
            const cnpj2 = $client.find(".cnpj-list").text();
            const razaoSocial2 = $client.find(".razao-social-list").text()
            const faturamento2 = $client.find(".faturamento-list").text()

            clients.push({
                cnpj2,
                razaoSocial2,
                faturamento2
            });
        });

        // Adicionando as tarefas no localStorage
        localStorage.setItem("clients", JSON.stringify(clients));
    };

    /** Carrega as tarefas do localStorage e as adiciona à lista de tarefas */
    const loadClientsFromLocalStorage = () => {
        const clients = JSON.parse(localStorage.getItem("clients")) || [];

        // Adicionando cada tarefa salva à lista de tarefas
        clients.forEach(client => {
            const $client = addClientToSystem(client.cnpj2, client.razaoSocial2, client.faturamento2 );
        });
    };
    
    const createIconButton = (btnClasses, clickHandler) => {
        const $button = $("<span></span>").addClass(btnClasses);
        $button.click(clickHandler);
        return $button;
    };
    
	const addClientToSystem = (cnpj, razaoSocial, faturamento) => {

		const $newClient = $("<tr></tr>").addClass("client-list");
        const id = $(".client-list").length + 1;
        const $idData = $("<td></td>").attr("id", "uniqueIdCounter").text(id).addClass("id-list");
		const $cnpjData = $("<td></td>").text(cnpj).addClass("cnpj-list");
		const $razaoSocialData = $("<td></td>").text(razaoSocial).addClass("razao-social-list");
		const $faturamentoData = $("<td></td>").text(faturamento).addClass("faturamento-list");
        const $classe = $("<td></td>").addClass("classe-list")

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
            let editedRazaoSocialText = prompt("Novo nome da companhia", razaoSocial);
            if (editedRazaoSocialText !== null) {
                while (!editedRazaoSocialText) {
                    editedRazaoSocialText = prompt("Você deve informar uma razão social válida. Novo nome da companhia", razaoSocial);
                }
                $razaoSocialData.text(editedRazaoSocialText);
            }
        
            let editedCnpjText = prompt("Novo CNPJ", cnpj);
            if (editedCnpjText !== null) {
                while (!/^\d{14}$/.test(editedCnpjText)) {
                    editedCnpjText = prompt("Você deve informar um CNPJ válido (14 dígitos numéricos). Novo CNPJ", cnpj);
                }
                $cnpjData.text(editedCnpjText);
            }
        
            let editedFaturamentoText = prompt("Novo faturamento", faturamento);
            if (editedFaturamentoText !== null) {
                while (isNaN(parseFloat(editedFaturamentoText))) {
                    editedFaturamentoText = prompt("Você deve informar um faturamento válido. Novo faturamento", faturamento);
                }
                $faturamentoData.text(editedFaturamentoText);
                const $faturamentoDecimal = parseFloat($faturamentoData)

                if ($faturamentoDecimal >= 10000) {
                    $classe.text("Classe A")
                } else if ($faturamentoDecimal >= 8000) {
                    $classe.text("Classe B")
                } else if ($faturamentoDecimal >= 5000) {
                    $classe.text("Classe C")
                } else {
                    $classe.text("Classe D")
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

    $(window).on("beforeunload", () => {
        saveClientsToLocalStorage();
    });
    
    loadClientsFromLocalStorage()
});
