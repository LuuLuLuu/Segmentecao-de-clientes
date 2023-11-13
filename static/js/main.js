$(document).ready(function () {

    const $form = $("#clientForm")
    const $modal = new bootstrap.Modal("#clientModal");
    const $cnpjInput = $("#cnpjInput")
    const $razaoSocialInput = $("#razaoSocialInput")
    const $faturamentoInput = $("#faturamentoInput")
    const usedIDs = [];

    const saveClientsToLocalStorage = () => {
        const clients = [];
        // Obtendo todas as tarefas na tela (<li>)
        const $clients = $(".client-list");

        // Percorrendo cada tarefa para gerar um objeto da tarefa ({ description, expirationDate, isCompleted })
        $.each($clients, (_, client) => {
            const $client = $(client);
            // Obtendo os elementos da tarefa (descrição, data de expiração, status)
            const id2 = $client.find(".id-list").text(); // Obtém o texto do parágrafo de descrição
            const cnpj2 = $client.find(".cnpj-list").text(); //Obtém o texto da <span> e substitui o texto Expira em por "".
            const razaoSocial2 = $client.find("razao-social-list");text() // Obtém o status da tarefa (true ou false)
            const classe2 = $client.find("classe-list").text()
            const faturamento2 = $client.find("faturamento-list").text()
            // Adiciona a tarefa no vetor de tarefas
            clients.push({
                id2,
                cnpj2,
                razaoSocial2,
                classe2,
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
            const $client = addClientToSystem(client.id2, client.cnpj2, client.razaoSocial2, client.classe2, client.faturamento2 );
        });
    };
    
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

		const $newClient = $("<tr></tr>").addClass("client-list");
		const $idData = $("<td></td>").attr("id", "uniqueIdCounter").text(uniqueID()).addClass("id-list");
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

    $(window).on("beforeunload", () => {
        saveClientsToLocalStorage();
    });
    
    loadClientsFromLocalStorage()
});
