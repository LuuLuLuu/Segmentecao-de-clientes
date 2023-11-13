$(document).ready(function () {

    const $form = $("#clientForm")
    const $modal = new bootstrap.Modal("#clientModal");
    const $cnpjInput = $("#cnpjInput")
    const $razaoSocialInput = $("#razaoSocialInput")
    const $faturamentoInput = $("#faturamentoInput")
    const usedIDs = [];

    const createIconButton = (iconClass, btnClasses, clickHandler) => {
        const $button = $("<button></button>").addClass(btnClasses);
        const $icon = $("<i></i>").addClass(iconClass);
        $button.append($icon);
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



        const $editButton = createIconButton("bi bi-pencil-square", "btn btn-info btn-sm", () => {
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
                    break
                } else {
                    alert("Você deve informar um faturamento válido.")
                    continue
                }
            }
        });

        const $deleteButton = createIconButton("bi bi-person-dash", "btn btn-info btn-sm", () => $newClient.remove());

        const $buttonsContainer = $("<td></td>").addClass("btn");
        $buttonsContainer.append($editButton, $deleteButton);
        $newClient.append($idData, $cnpjData, $razaoSocialData, $faturamentoData, $buttonsContainer);

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

    // $searchInput.on("input", () => {
    //     const searchTerm = $searchInput.val().toLowerCase();

    //     $(".taskboard-item").each(function () {
    //         const $task = $(this);
    //         const $description = $task.find("span").text().toLowerCase();
    //         const $dateAux = $task.find(".filter-aux")

    //         if (!$description.startsWith(searchTerm)) {
    //             $task.hide();
    //             $dateAux.hide()
    //         } else {
    //             $task.show();
    //             $dateAux.show()
    //         }
    //     });
    // });

    // $(window).on("beforeunload", () => {
    //     saveTasksToLocalStorage();
    // });

    // loadTasksFromLocalStorage();

});
