
function openStates(){
    if ($("#state-options")[0].style.display == "none"){
        $("#state-options")[0].style.display = "flex"
        off = false
        $("#estados-filter")[0].style.backgroundColor = "#3468FC"
        $("#estados-filter")[0].style.color = "#FFF"
    } else{
        $("#state-options")[0].style.display = "none"
        $("#estados-filter")[0].style.backgroundColor = "#DDE6FF"
        $("#estados-filter")[0].style.color = "#373737"
    }
}

// const { Console } = require("console")

function quitPopup(){
    if ($("#quitPopup")[0].style.display == "none" || $("#quitPopup")[0].style.display == ""){
        $("#quitPopup")[0].style.display = "flex"
        $("#shadow")[0].style.display = "flex"
    } else{
        $("#quitPopup")[0].style.display = "none"
        $("#shadow")[0].style.display = "none"
    }
}

function attData() {
    $.get("http://localhost:3031/stateFilter", function(resultado){
        resultado.forEach(row => {
            $("#state-options")[0].innerHTML += `<div class="state-unselected" onclick="changeStatus(this)">${row.estado}</div>`;
        });
    });

    $.get("http://localhost:3031/cityFilter", function(resultado){
        resultado.forEach(row => {
            $("#state-options")[0].innerHTML += `<div class="city-unselected" onclick="changeStatus(this)">${row.cidade}</div>`;
        });
    });

    $.get("http://localhost:3031/partnerFilter", function(resultado){
        resultado.forEach(row => {
            $("#state-options")[0].innerHTML += `<div class="partner-unselected" onclick="changeStatus(this)">${row.nome}</div>`;
        });
    });

    $.get("http://localhost:3031/periodFilter", function(resultado){
        resultado.forEach(row => {
            $("#state-options")[0].innerHTML += `<div class="period-unselected" onclick="changeStatus(this)">${row.data_recebimento}</div>`;
        });
    });

    $.get("http://localhost:3031/typeFilter", function(resultado){
        resultado.forEach(row => {
            $("#state-options")[0].innerHTML += `<div class="type-unselected" onclick="changeStatus(this)">${row.regra}</div>`;
        });
    });


    $.get("http://localhost:3031/antecipations", function(resultado){
        
        $("#antecipation-value")[0].innerHTML = resultado[0]["COUNT (*)"];
        
    });

    $.get("http://localhost:3031/montante", function(resultado){
        
        $("#montate-value")[0].innerHTML ="R$"+parseFloat(resultado[0]["SUM (montante)"]);
        console.log(resultado[0])
        
    });

    $.get("http://localhost:3031/rentabilidade", function(resultado){
        
        $("#rentabilidade-value")[0].innerHTML =(resultado[0]["SUM(montante)/SUM(valor)"]*100).toFixed(0)+"%";
        console.log(resultado[0])   
        
    });


}
attData()

function openFilter() {
    if (document.getElementById("filterPopup").style.display == "flex") {
        document.getElementById("filterPopup").style.display = "none"
    }
    else {
        document.getElementById("filterPopup").style.display = "flex"
    }
}

function changeStatus(event) {
    var value = event.parentElement.id
    console.log(value)
    if (event.className == "state-unselected")
        switch (value) {
            case "state-options":
                event.className = "state-selected"
                break
        }
    else {
        switch (value) {
            case "state-options":
                event.className = "state-unselected"
                break
        }
    }
    filter()
}

function filter() {
    var stateVector = document.getElementsByClassName("state-selected");
    var stateFiltered = [];
    for(var i = 0; i < stateVector.length; i++){
        stateFiltered.push(stateVector[i].innerText)
        
    }
}

function ranking(){
    var nomes_usados_qtd = []
    var nomes_usados_rank = []
    var number = '<div class="label-roll">' + 
    '<div class="label1">' + 
        '<h5>Nº</h5>' + 
        '<br>' + 
    '</div>' + 
'</div>'
    var partner = '<div class="label-roll">' + 
    '<div class="label1">' + 
        '<h5>Parceiro</h5>' + 
        '<br>' + 
    '</div>' + 
'</div>'
    var regra = '<div class="label-roll">' + 
    '<div class="label1">' + 
        '<h5>Tipo Solicitação</h5>' + 
    '</div>' + 
'</div>'
    var estado = '<div class="label-roll">' + 
    '<div class="label1">' + 
        '<h5>Estado</h5>' +
        '<br>' + 
    '</div>' + 
'</div>'
    var qtd = '<div class="label-roll">' + 
    '<div class="label1">' + 
        '<h5>Qtd Solicitações</h5>' + 
    '</div>' + 
'</div>'
    var divValor = '<div class="label-roll">' +
    '<div class="label1">' +
        '<h5>Valor Antecipado    </h5>' +
    '</div>' +
'</div>'
    var qtd_ant = 0
    var i = 0
    var valor = 0
    var url = "http://127.0.0.1:3031/ranking";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
    var retorno = JSON.parse(xhttp.responseText);
    for (Element of retorno){
            var nome_atual = Element.nome
            if (nomes_usados_qtd.includes(nome_atual)){
                break
            }else{
            for(Element2 of retorno){
                if(nome_atual == Element2.nome){
                    qtd_ant++
                    valor += Element2.montante
                }
            }
            nomes_usados_qtd.push(nome_atual)
        }
        if (nomes_usados_rank.includes(nome_atual)){
            break
        }else{
        number += '<div class="label-roll">' + 
        '<div class="label2" id="number' + i + '">' + 
            '<h5>' + (i + 1) + '</h5>' +
       '</div>' + 
    '</div>'
        partner += '<div class="label-roll">' +
        '<div class="label2" id="partner' + i + '">' +
            '<h5>' + Element.nome + '</h5>' +
        '</div>' + 
    '</div>'
        regra += '<div class="label-roll">' +
        '<div class="label2" id="regra' + i + '">' +
            '<h5>' + Element.regra + '</h5>' + 
        '</div>' + 
    '</div>'
        estado += '<div class="label-roll">' + 
        '<div class="label2" id="estado' + i + '">'+
            '<h5>' + Element.estado + '</h5>' + 
        '</div>' + 
    '</div>'
        qtd += '<div class="label-roll">' +
        '<div class="label2" id="qtd' + i + '">' +
            '<h5>' + qtd_ant + '</h5>' +
        '</div>' +
    '</div>'
        divValor += '<div class="label-roll">' + 
        '<div class="label2" id="value' + i + '">' +
            '<h5>R$ ' + valor + '</h5>' +
        '</div>' +
    '</div>'
        i++
        qtd_ant = 0
        nomes_usados_rank.push(nome_atual)
        valor = 0
    }
}
    document.getElementById('col_number').innerHTML = number
    document.getElementById('partner_col').innerHTML = partner
    document.getElementById('rule_col').innerHTML = regra
    document.getElementById('state_col').innerHTML = estado
    document.getElementById('qtd').innerHTML = qtd
    document.getElementById('antecipatedValue').innerHTML = divValor
}