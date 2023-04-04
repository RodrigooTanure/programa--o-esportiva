let art = document.getElementsByClassName('art')[0];
let closeART = document.getElementById('closeART');
let bckART = document.getElementById('bckart');

// ==========================================================

let objTxArea = document.getElementById('obs');
let obsBox = document.getElementById('contObs');
let boxObs= document.getElementById('boxObs');

// ==========================================================

let mainContent = document.getElementById('main');
let inftx = document.getElementById('inf');

// JS do calendário
let meses = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let dSemCal = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let dSemBR = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

let pastDates = false,
availableDates = false,
availableWeekDays = false
let calendar = new VanillaCalendar({
    selector: "#myCalendar",
    pastDates: false,
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro",
        "Outubro", "Novembro", "Dezembro"
    ],
    shortWeekday: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    onSelect: (data) => {
        converteData(data.date);
    }
});

// Converte a data para o padrão BR
converteData = (dtCal) => {
    let pegaDiaCal = dtCal.slice(8, 10);
    let pegaMes  = (meses.indexOf(dtCal.slice(4, 7))).toString().padStart(2, '0');
    let pegaDiaSemana = diaSemana(dtCal.slice(0, 3));
    document.querySelector("#datas").textContent = `(${pegaDiaCal}/${pegaMes} - ${pegaDiaSemana})`;
}

// Retorna o dia da semana por extenso padrão BR
diaSemana = (dSemanaCal) => {
    return dSemBR[(dSemCal.indexOf(dSemanaCal))];
}

// Pega a data do dia
converteData(document.querySelector(".vanilla-calendar-date--today").getAttribute('data-calendar-date'));

// Deixa claro a data atual
document.querySelector(".vanilla-calendar-date--today").classList.add("vanilla-calendar-date--selected");

// ========================================================

// Adiciona os dados na impressão
$('.adicionar').on('click', function() {
    var pai = ($(this).parent()).parent();
    var casa = $(this).attr('casa');
    if(($(pai).find('input:eq(0)').val()).length == 0 || ($(pai).find('input:eq(1)').val()).length == 0 || ($(pai).find('input:eq(2)').val()).length == 0 || ($(pai).find('input:eq(3)').val()).length == 0 || ($(pai).find('input:eq(4)').val()).length == 0) {
        alert(`Faltam dados jogo0${casa}`);
        $(pai).addClass('nAdic');
        $(pai).removeClass('adicionado');
        $(pai).find('.confNeg').css('color', 'red');
        ($(pai).find('.confNeg')).text(`Jogo0${casa} não adicionado!`);
    } else {
        if((($(pai).find('input:eq(0)')).val()).length > 15 || (($(pai).find('input:eq(1)')).val()).length > 15) {
            $(`#adc-${casa} .adversarios`).css('font-size', '.9em');
        }
        $(`#adc-${casa} .camp h2`).text($(pai).find('input:eq(4)').val()); // Campeonato
        $(`#adc-${casa} .adversarios p:eq(0)`).text($(pai).find('input:eq(0)').val()); // Time A
        $(`#adc-${casa} .adversarios p:eq(2)`).text($(pai).find('input:eq(1)').val()); // Time B
        $(`#adc-${casa} .hora`).text($(pai).find('input:eq(2)').val().replace(':', 'h')); // Hora
        $(`#adc-${casa} .infos .canal`).text($(pai).find('input:eq(3)').val()); // Canal
        $(`#adc-${casa}`).removeClass('invisible'); // Remvove a classe invisible para aparecer na tela
        $(`#form0${Number(casa) + 1}`).css({
            'visibility': 'visible',
            'right': '0px'
        });
        if(casa == 3) {
            $('.form-containers02').css('height', 'auto');
        }
        $(pai).addClass('adicionado');
        $(pai).removeClass('nAdic');
        ($(pai).find('.confNeg')).text(`Jogo0${casa} adicionado!`);
        $(pai).find('.confNeg').css('color', 'green');
    }
});

// Faz a impressão
imp = () => {
    document.body.style.overflow = 'hidden';
    mainContent.style.marginBottom = '1000px';
    art.style.overflow = 'hidden';
    escreveObs();
    art.classList.remove('d-none');
    art.classList.add('art-imp');
    if (confirm('Você realmente deseja imprimir? Por favor confirme os dados a seguir!')) {
        print();
    }
    art.classList.remove('art-imp');
    art.classList.add('d-none');
    document.body.style.overflow = 'auto';
    mainContent.style.marginBottom = '0px';
}

escreveObs = () => {
    if((document.querySelector("#observacao").value).length > 1) {
        document.querySelector("#contObs").textContent = document.querySelector("#observacao").value; 
        boxObs.classList.remove('invisible');
    } else {
        boxObs.classList.add('invisible');
    }
}

function preview() {
    escreveObs();
    art.classList.remove('d-none');
    art.classList.add('preview-class');
    bckART.classList.add('d-block');
}

function closeArt() {
    art.classList.add('d-none');
    art.classList.remove('preview-class');
    bckART.classList.remove('d-block');
}

function infEnter() {
    inftx.style.display = 'inline-block';
}

function infLeave() {
    inftx.style.display = 'none';

}

document.addEventListener('keydown', (event) => {
    if (event.key == 'Escape') {
        art.classList.add('d-none');
        art.classList.remove('preview-class');
        bckART.classList.remove('d-block');
    }
});

// =========================================================

// function adcObs() {
//     var obsTextValue = objTxArea.value
//     if (obsTextValue.length == 0) {
//         alert('Observação não definida!');
//         objTxArea.style.boxShadow = '0px 0px 0px 3px red';
//     } else {
//         edicao = true;
//         objTxArea.style.boxShadow = '0px 0px 0px 3px green';
//         boxObs.style.display = 'block';
//         obsBox.innerHTML = obsTextValue;
//     }
// }
// let form01 = document.getElementById('form01');
// let form02 = document.getElementById('form02');
// let form03 = document.getElementById('form03');
// let form04 = document.getElementById('form04');
// let form05 = document.getElementById('form05');
// let form06 = document.getElementById('form06');

// =========================================================

// ==========================================================

// let jogos01 = document.getElementById('adc-01');
// let jogos02 = document.getElementById('adc-02');
// let jogos03 = document.getElementById('adc-03');
// let jogos04 = document.getElementById('adc-04');
// let jogos05 = document.getElementById('adc-05');
// let jogos06 = document.getElementById('adc-06');

// ==========================================================

// let forms02 = document.getElementById('forms02');

// ==========================================================

// let confirmsImpressao = [false, false];
// let confirmJogos = [false]

// ==========================================================


// ======================================================================

/* 
function adc01() {
    let conf = document.getElementsByClassName('confNeg')[0];
    let timeA1Value = document.getElementById('timeA01').value;
    let timeB1Value = document.getElementById('timeB01').value;
    let campeonato01Value = document.getElementById('campeonato01').value;
    let hora01Value = document.getElementById('hora01').value;
    hora01Value = hora01Value.replace(':', 'h');
    let canal01Value = document.getElementById('cnl01').value;

    if (timeA1Value.length == 0 || timeB1Value.length == 0 || campeonato01Value.length == 0 || hora01Value.length == 0 || canal01Value.length == 0) {
        alert('[ERRO]Faltam dados do JOGO 01!!');
        form01.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 01 NÃO FOI ADICIONADO!</span>';
    } else if (timeA1Value.length > 20) {
        alert('REDUZA O TAMANHO DO TIME A / JOGO 01');
        form01.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 01 NÃO FOI ADICIONADO!</span>';
    } else if (timeB1Value.length > 20) {
        alert('REDUZA O TAMANHO DO TIME B / JOGO 01');
        form01.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 01 NÃO FOI ADICIONADO!</span>';
    } else {
        confirmJogos[0] = true;
        confirmsImpressao[0] = true;
        form02.style.visibility = 'visible'
        form02.style.right = '0px'
        conf.innerHTML = '<span class="confirm">JOGO 01 ADICIONADO COM SUCESSO!</span>';
        document.querySelector(jogos01 + ".camp h2").textContent = campeonato01Value;
        // jogos01.innerHTML = `<div class="jogos">
        //                         <div class="camp">
        //                             <h2>${campeonato01Value}</h2>
        //                         </div>
        //                         <div class="adversarios" id="adv">
        //                             <p id="tmA01">${timeA1Value}</p>
        //                             <p class="center">X</p>
        //                             <p style="visibility: hidden;">X</p>
        //                             <p>${timeB1Value}</p>
        //                         </div>
        //                         <div class="informacoes">
        //                             <div class="infos">
        //                                 <h3>Horário: <b class="hora">${hora01Value}</b></h3>
        //                                 <h3>Canal: <b>${canal01Value}</b></h3>
        //                             </div>
        //                         </div>
        //                     </div>`
        form01.style.boxShadow = '0px 0px 0px 5px green';
    }
    if (timeA1Value.length > 15 || timeB1Value.length > 15) {
        let fontAdv = document.getElementById('adv');
        fontAdv.style.fontSize = '1em';
    }
}

function adc02() {
    let conf = document.getElementsByClassName('confNeg')[1]
    let timeA02Value = document.getElementById('timeA02').value;
    let timeB02Value = document.getElementById('timeB02').value;
    let campeonato02Value = document.getElementById('campeonato02').value;
    let hora02Value = document.getElementById('hora02').value;
    let canal02Value = document.getElementById('cnl02').value;
    hora02Value = hora02Value.replace(':', 'h');

    if (timeA02Value.length == 0 || timeB02Value.length == 0 || campeonato02Value.length == 0 || hora02Value.length == 0 || canal02Value.length == 0) {
        alert('[ERRO]Faltam dados do JOGO 02!!');
        form02.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 02 NÃO FOI ADICIONADO!</span>';
    } else if (timeA02Value.length > 20) {
        alert('REDUZA O TAMANHO DO TIME A / JOGO 02');
        form02.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 02 NÃO FOI ADICIONADO!</span>';
    } else if (timeB02Value.length > 20) {
        alert('REDUZA O TAMANHO DO TIME B / JOGO 02');
        form02.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 02 NÃO FOI ADICIONADO!</span>';
    } else {
        form03.style.visibility = 'visible'
        form03.style.right = '0px'
        conf.innerHTML = '<span class="confirm">JOGO 02 ADICIONADO COM SUCESSO!</span>';
        jogos02.innerHTML = `<div class="jogos">
                            <div class="camp">
                            <h2>${campeonato02Value}</h2>
                            </div>
                            <div class="adversarios" id="adv02">
                            <p>${timeA02Value}</p>
                            <p class="center">X</p>
                            <p style="visibility: hidden;">X</p>
                            <p>${timeB02Value}</p>
                            </div>
                            <div class="informacoes">
                            <div class="infos">
                            <h3>Horário: <b class="hora">${hora02Value}</b></h3>
                            <h3>Canal: <b>${canal02Value}</b></h3>
                            
                            </div>
                            
                            </div>
                            </div>`
        form02.style.boxShadow = '0px 0px 0px 5px green'
    }
    if (timeA02Value.length > 15 || timeB02Value.length > 15) {
        let fontAdv02 = document.getElementById('adv02');
        fontAdv02.style.fontSize = '1em';
    }
}

function adc03() {
    let conf = document.getElementsByClassName('confNeg')[2];
    let timeA03Value = document.getElementById('timeA03').value;
    let timeB03Value = document.getElementById('timeB03').value;
    let campeonato03Value = document.getElementById('campeonato03').value;
    let hora03Value = document.getElementById('hora03').value;
    let canal03Value = document.getElementById('cnl03').value;
    hora03Value = hora03Value.replace(':', 'h');

    if (timeA03Value.length == 0 || timeB03Value.length == 0 || campeonato03Value.length == 0 || hora03Value.length == 0 || canal03Value.length == 0) {
        alert('[ERRO]Faltam dados do JOGO 03!!');
        form03.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 03 NÃO FOI ADICIONADO!</span>';
    } else if (timeA03Value.length > 20) {
        alert('REDUZA O TAMANHO DO TIME A / JOGO 03');
        form03.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 03 NÃO FOI ADICIONADO!</span>';
    } else if (timeB03Value.length > 20) {
        alert('REDUZA O TAMANHO DO TIME B / JOGO 03');
        form03.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 03 NÃO FOI ADICIONADO!</span>';
    } else {
        conf.innerHTML = '<span class="confirm">JOGO 03 ADICIONADO COM SUCESSO!</span>';
        forms02.style.height = 'auto'
        form04.style.visibility = 'visible'
        form04.style.bottom = '0px'
        jogos03.innerHTML = `<div class="jogos">
                                <div class="camp">
                                    <h2>${campeonato03Value}</h2>
                                </div>
                                <div class="adversarios" id="adv03">
                                    <p>${timeA03Value}</p>
                                    <p class="center">X</p>
                                    <p style="visibility: hidden;">X</p>
                                    <p>${timeB03Value}</p>
                                </div>
                                <div class="informacoes">
                                    <div class="infos">
                                        <h3>Horário: <b class="hora">${hora03Value}</b></h3>
                                        <h3>Canal: <b>${canal03Value}</b></h3>
        
                                    </div>
        
                                </div>
                            </div>`
        form03.style.boxShadow = '0px 0px 0px 5px green';
    }
    if (timeA03Value.length > 15 || timeB03Value.length > 15) {
        let fontAdv03 = document.getElementById('adv03');
        fontAdv03.style.fontSize = '1em';
    }
}

function adc04() {
    let conf = document.getElementsByClassName('confNeg')[3];
    let timeA04Value = document.getElementById('timeA04').value;
    let timeB04Value = document.getElementById('timeB04').value;
    let campeonato04Value = document.getElementById('campeonato04').value;
    let hora04Value = document.getElementById('hora04').value;
    let canal04Value = document.getElementById('cnl04').value;
    hora04Value = hora04Value.replace(':', 'h');

    if (timeA04Value.length == 0 || timeB04Value.length == 0 || campeonato04Value.length == 0 || hora04Value.length == 0 || canal04Value.length == 0) {
        alert('[ERRO]Faltam dados do JOGO 04!!');
        form04.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 04 NÃO FOI ADICIONADO!</span>';
    } else if (timeA04Value.length > 20) {
        alert('REDUZA O TAMANHO DO TIME A / JOGO 04');
        form04.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 04 NÃO FOI ADICIONADO!</span>';
    } else if (timeB04Value.length > 20) {
        alert('REDUZA O TAMANHO DO TIME B / JOGO 04');
        form04.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 04 NÃO FOI ADICIONADO!</span>';
    } else {

        conf.innerHTML = '<span class="confirm">JOGO 04 ADICIONADO COM SUCESSO!</span>';
        form05.style.visibility = 'visible'
        form05.style.right = '0px'
        jogos04.innerHTML = `<div class="jogos">
                                <div class="camp">
                                <h2>${campeonato04Value}</h2>
                                </div>
                                <div class="adversarios" id="adv04">
                                <p>${timeA04Value}</p>
                                <p class="center">X</p>
                                <p style="visibility: hidden;">X</p>
                                <p>${timeB04Value}</p>
                                </div>
                                <div class="informacoes">
                                <div class="infos">
                                <h3>Horário: <b class="hora">${hora04Value}</b></h3>
                                <h3>Canal: <b>${canal04Value}</b></h3>
                                
                                </div>
                                
                                </div>
                                </div>`
        form04.style.boxShadow = '0px 0px 0px 5px green'
    }
    if (timeA04Value.length > 15 || timeB04Value.length > 15) {
        let fontAdv04 = document.getElementById('adv04');
        fontAdv04.style.fontSize = '1em';
    }
}

function adc05() {
    let conf = document.getElementsByClassName('confNeg')[4];
    let timeA05Value = document.getElementById('timeA05').value;
    let timeB05Value = document.getElementById('timeB05').value;
    let campeonato05Value = document.getElementById('campeonato05').value;
    let hora05Value = document.getElementById('hora05').value;
    let canal05Value = document.getElementById('cnl05').value;
    hora05Value = hora05Value.replace(':', 'h');

    if (timeA05Value.length == 0 || timeB05Value.length == 0 || campeonato05Value.length == 0 || hora05Value.length == 0 || canal05Value.length == 0) {
        alert('[ERRO]Faltam dados do JOGO 05!!');
        form05.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 05 NÃO FOI ADICIONADO!</span>';
    } else if (timeA05Value.length > 20) {
        alert('REDUZA O TAMANHO DO TIME A / JOGO 05');
        form05.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 05 NÃO FOI ADICIONADO!</span>';
    } else if (timeB05Value.length > 20) {
        alert('REDUZA O TAMANHO DO TIME B / JOGO 05');
        form05.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 05 NÃO FOI ADICIONADO!</span>';
    } else {

        conf.innerHTML = '<span class="confirm">JOGO 05 ADICIONADO COM SUCESSO!</span>';
        form06.style.visibility = 'visible'
        form06.style.right = '0px'
        jogos05.innerHTML = `<div class="jogos">
                            <div class="camp">
                                <h2>${campeonato05Value}</h2>
                            </div>
                            <div class="adversarios" id="adv05">
                                <p>${timeA05Value}</p>
                                <p class="center">X</p>
                                <p style="visibility: hidden;">X</p>
                                <p>${timeB05Value}</p>
                            </div>
                            <div class="informacoes">
                                <div class="infos">
                                    <h3>Horário:<b class="hora">${hora05Value}</b></h3>
                                    <h3>Canal:<b>${canal05Value}</b></h3>

                                </div>

                            </div>
                        </div>`
        form05.style.boxShadow = '0px 0px 0px 5px green'
    }
    if (timeA05Value.length > 15 || timeB05Value.length > 15) {
        let fontAdv05 = document.getElementById('adv05');
        fontAdv05.style.fontSize = '1em';
    }
}

function adc06() {
    let conf = document.getElementsByClassName('confNeg')[5];
    let timeA06Value = document.getElementById('timeA06').value;
    let timeB06Value = document.getElementById('timeB06').value;
    let campeonato06Value = document.getElementById('campeonato06').value;
    let hora06Value = document.getElementById('hora06').value;
    let canal06Value = document.getElementById('cnl06').value;
    hora06Value = hora06Value.replace(':', 'h');

    if (timeA06Value.length == 0 || timeB06Value.length == 0 || campeonato06Value.length == 0 || hora06Value.length == 0 || canal06Value.length == 0) {
        alert('[ERRO]Faltam dados do JOGO 06!!');
        form06.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 06 NÃO FOI ADICIONADO!</span>';
    } else if (timeA06Value.length > 20) {
        alert('REDUZA O TAMANHO DO TIME A / JOGO 06');
        form06.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 06 NÃO FOI ADICIONADO!</span>';
    } else if (timeB06Value.length > 20) {
        alert('REDUZA O TAMANHO DO TIME B / JOGO 06');
        form06.style.boxShadow = '0px 0px 0px 5px red';
        conf.innerHTML = '<span class="neg">JOGO 06 NÃO FOI ADICIONADO!</span>';
    } else {
        conf.innerHTML = '<span class="confirm">JOGO 01 ADICIONADO COM SUCESSO!</span>';
        jogos06.innerHTML = `<div class="jogos">
                            <div class="camp">
                                <h2>${campeonato06Value}</h2>
                            </div>
                            <div class="adversarios" id="adv06">
                                <p>${timeA06Value}</p>
                                <p class="center">X</p>
                                <p style="visibility: hidden;">X</p>
                                <p>${timeB06Value}</p>
                            </div>
                            <div class="informacoes">
                                <div class="infos">
                                    <h3>Horário: <b class="hora">${hora06Value}</b></h3>
                                    <h3>Canal:<b>${canal06Value}</b></h3>

                                </div>

                            </div>
                        </div>`
        form06.style.boxShadow = '0px 0px 0px 5px green'
    }
    if (timeA06Value.length > 15 || timeB06Value.length > 15) {
        let fontAdv06 = document.getElementById('adv06');
        fontAdv06.style.fontSize = '1em';
    }
}
*/

// ======================================================================

