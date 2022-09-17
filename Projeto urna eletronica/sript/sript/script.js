// CONTROLE DA TELA
let tela = document.querySelector('.tela');
let tituloVoto = document.querySelector('.titulo-voto span');
let tituloCargo = document.querySelector('.titulo-cargo h2');
let tituloNumeros = document.querySelector('.titulo-numeros');
let candidatoArea = document.querySelector('.candidato-area');
let votoRodape = document.querySelector('.voto-rodape');
let votoAreaImg = document.querySelector('.voto-area-img');


// let nomeCandidato = document.querySelector('.titulo-nome')
// let partidoCandidato = document.querySelector('.titulo-partido')
// let suplenteCandidato = document.querySelector('.titulo-suplente')

//CONTROLE DAS ETAPAS
let etapaAtual = 0;
let candidatoNumero ='';
let votoBranco = false;
let votoComputado = [];

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    
    let caixaNumero ='';
    votoBranco = false

    for(let i=0;i<etapa.numeros; i++){
        if(i === 0) {
            caixaNumero +='<div class="caixa-numero foco"></div>';
        } else {
            caixaNumero +='<div class="caixa-numero"></div>';
        }
    }

    candidatoNumero='';
    

    tituloVoto.style.display='none';
    tituloCargo.innerHTML=etapa.titulo;
    tituloNumeros.innerHTML= caixaNumero
    candidatoArea.innerHTML = '';
    votoRodape.style.display='none';
    votoAreaImg.innerHTML='';
};

function atualizarTela(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === candidatoNumero){
            return true;
        } else{
            return false;
        }
    });
    if (candidato.length>0){
        candidato=candidato[0];
        tituloVoto.style.display='flex';
        votoRodape.style.display='flex'

        let candidatoInfo= '';
        for(let i in candidatoArea){
            candidatoInfo =
            `<div class="titulo-nome">
            <h3>Nome: ${candidato.nome}</h3>
            </div>
            <div class="titulo-partido">
                <h4>Partido: ${candidato.partido}</h4>
            </div>
            <div class="titulo-suplente">
                Suplente: ${candidato.vice}
            </div>`
        }
        candidatoArea.innerHTML = candidatoInfo;

        let fotoCandidato= '';
        for (let i in candidato.fotos){
            if(candidato.fotos[i].small) {
                fotoCandidato +=
                `<div class="img-cargo img-secundaria">
                <img src="/img/${candidato.fotos[i].url}" alt="">
                <span>${candidato.fotos[i].legenda}</span>
                </div>`
            } else{
                fotoCandidato +=
                `<div class="img-cargo">
                <img src="/img/${candidato.fotos[i].url}" alt="">
                <span>${candidato.fotos[i].legenda}</span>
                </div>`
            } 
        }
        votoAreaImg.innerHTML= fotoCandidato;

    } else {
        tituloVoto.style.display='flex';
        votoRodape.style.display='flex';
        candidatoArea.innerHTML = ' <div class="aviso-voto foco">VOTO NULO</div>';
    }
};



//CONTROLE DO TECLADO
function clicou(n){
    let caixaNumero = document.querySelector('.caixa-numero.foco');
    if(caixaNumero !== null){
        caixaNumero.innerHTML=n;
        candidatoNumero=`${candidatoNumero}${n}`;

        caixaNumero.classList.remove('foco');
        if(caixaNumero.nextElementSibling !== null){
            caixaNumero.nextElementSibling.classList.add('foco');
        } else{
            atualizarTela();
        }
    }

};

function branco(){
    if(candidatoNumero === ''){
        votoBranco=true;
        tituloVoto.style.display='flex';
        votoRodape.style.display='flex';
        tituloNumeros.innerHTML= '';
        candidatoArea.innerHTML = '<div class="aviso-voto foco">VOTO EM BRANCO</div>';
    } else{
        alert('Para votar em BRANCO o campo de números deve estar vazio. Aperte em CORRIGE para apagar o campo de números.')
    }
    
};

function corrige(){
    comecarEtapa()
};

function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === candidatoNumero){
            return true;
        } else{
            return false;
        }
    });
    console.log(candidato);
    if(votoBranco){
        let votoConfirmado = true;
        console.log('CONFIRMA BRANCO');
        votoComputado.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'BRANCO'
        })

    } else if(candidatoNumero.length === etapa.numeros && candidato.length > 0){
        votoComputado.push({
            etapa: etapas[etapaAtual].titulo,
            voto: candidatoNumero
        })
        console.log('CONFIRMA CANDIDATO '+ candidatoNumero);        
    } else {
        votoComputado.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'NULO'
        })
        console.log('CONFIRMA NULO');
    }   
    if(votoConfirmado = true){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML= '<div class="fim-voto foco">Fim!</div>'
            console.log(votoComputado);
        }
    }
};

comecarEtapa();
