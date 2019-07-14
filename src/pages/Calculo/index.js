import React, { Component } from 'react';
import $ from 'jquery';

import Tinta from '../../assets/images/tinta.png';

import './style.css';

class Calculo extends Component {

    constructor(props){
        super(props);

        this.state = { username: sessionStorage.getItem('@Usuario:username') };   
        
        this.comprimentoAnalize = this.comprimentoAnalize.bind(this);
        this.alturaAnalize = this.alturaAnalize.bind(this);
        this.qntJanelaAnalize = this.qntJanelaAnalize.bind(this);
        this.qntPortaAnalize = this.qntPortaAnalize.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        

    }

    componentDidMount(){
        let verifica = this.state.username;

        if(verifica == null){
            this.props.history.push('/');
        }

    }

    comprimentoAnalize = (e) => {
        
        let analizeValue = e.target.value;  
        let params = e.target.name;
        analizeValue = analizeValue.replace(',','.');
        const campoComprimento = document.getElementById(`campoComprimento${params}`);
        const qntJanela01 = document.getElementById(`qntJanela${params}`);
        const qntPortas01 = document.getElementById(`qntPortas${params}`);
        
        if(isNaN(analizeValue)){
            alert("ESSE CAMPO SÓ PERMITE NÚMEROS");
            campoComprimento.value = "";
        }else{
            if(analizeValue != '' && analizeValue != null && analizeValue != undefined){
                if(analizeValue < 1){
                    alert("Sua Parede não pode ser menor que 1M");
                    campoComprimento.style.border = "1px solid red";
                    document.getElementById('btnFinalizaCalc01').style.pointerEvents = "none";
                    campoComprimento.value = "";
                    qntJanela01.value = "";
                    qntPortas01.value = "";
                }else if(analizeValue > 15){
                    alert("Sua Parede não pode ser maior que 15M");
                    campoComprimento.style.border = "1px solid red";
                    document.getElementById('btnFinalizaCalc01').style.pointerEvents = "none";
                    campoComprimento.value = "";
                    qntJanela01.value = "";
                    qntPortas01.value = "";
                }else{
                    campoComprimento.style.border = "1px solid #666";
                    document.getElementById('btnFinalizaCalc01').style.pointerEvents = "visible";
                }
            }
        }


    }


    alturaAnalize = (e) => {
        
        let analizeValue = e.target.value;  
        let params = e.target.name;

        //analizar se saio do campo Altura ou Janela ou Porta
        if(e.target.attributes.altura.value == true){
            analizeValue = analizeValue;
        }else{
            analizeValue = document.getElementById(`campoAltura${params}`).value;
        }

        analizeValue = analizeValue.replace(',','.');
        const campoAltura01 = document.getElementById(`campoAltura${params}`);
        const qntJanela01 = document.getElementById(`qntJanela${params}`);
        const qntPortas01 = document.getElementById(`qntPortas${params}`);

        
        if(analizeValue < 2.20){
            alert("A ALTURA DA PAREDE DEVE SER NO MINÍMO 2.20M");
            campoAltura01.style.border = "1px solid red";
            document.getElementById('btnFinalizaCalc01').style.pointerEvents = "none";
            campoAltura01.value = "";
        }else{
            
            if(isNaN(analizeValue)){
                alert("ESSE CAMPO SÓ PERMITE NÚMEROS");
                campoAltura01.value = "";
            }else{
                if(analizeValue != '' && analizeValue != null && analizeValue != undefined){
                    if(analizeValue != 0){
    
                        var tamanhoMini1 = '';
                        var tamanhoMini2 = '';
    
                        if(qntJanela01.value != '' && qntJanela01.value != null && qntJanela01.value != undefined && qntJanela01.value != 0){
                            var ja = qntJanela01.value;
                            tamanhoMini1 = ja * 1.20; 
                            tamanhoMini1 = tamanhoMini1;
                        }
        
                        if(qntPortas01.value != '' && qntPortas01.value != null && qntPortas01.value != undefined && qntPortas01.value != 0){
                            var ja = qntPortas01.value;
                            tamanhoMini2 = ja * 1.90; 
                            tamanhoMini2 = tamanhoMini2;
                        }
    
                        var totalA = tamanhoMini1 + tamanhoMini2;
                        
                    
                        if(tamanhoMini1 == '' && tamanhoMini2 == ''){
                            totalA = analizeValue;
                            campoAltura01.style.border = "1px solid #666";
                            document.getElementById('btnFinalizaCalc01').style.pointerEvents = "visible";
                        }else{
                            if(analizeValue < totalA){
                                if(qntJanela01.value == 0 && qntPortas01.value == 0){
    
                                }else if(qntJanela01.value > 0 && qntPortas01.value == 0){
                                    alert(`A ALTURA NÃO TEM O VALOR MINÍMO ESPERADO! ${tamanhoMini1} m`);
                                    campoAltura01.value = "";
                                    campoAltura01.style.border = "1px solid red";
                                    document.getElementById('btnFinalizaCalc01').style.pointerEvents = "none";
                                }else if(qntJanela01.value == 0 && qntPortas01.value > 0){
                                    alert(`A ALTURA NÃO TEM O VALOR MINÍMO ESPERADO! ${tamanhoMini2} m`);
                                    campoAltura01.value = "";
                                    campoAltura01.style.border = "1px solid red";
                                    document.getElementById('btnFinalizaCalc01').style.pointerEvents = "none";
                                }else if(qntJanela01.value > 0 && qntPortas01.value > 0 && analizeValue < totalA){
    
                                    alert(`A ALTURA NÃO TEM O VALOR MINÍMO ESPERADO! ${totalA} m`);
                                    campoAltura01.value = "";
                                    campoAltura01.style.border = "1px solid red";
                                    document.getElementById('btnFinalizaCalc01').style.pointerEvents = "none";
    
                                }else{
                                    
                                    campoAltura01.style.border = "1px solid #666";
                                    document.getElementById('btnFinalizaCalc01').style.pointerEvents = "visible";
    
                                }
                            }else{
                                
                                    campoAltura01.style.border = "1px solid #666";
                                    document.getElementById('btnFinalizaCalc01').style.pointerEvents = "visible";
                            }
                        }
        
    
                    }else{
                        alert("A ALTURA NÃO PODE SER ZERO!");
                        campoAltura01.value = "";
                    }
    
                }
            }

        }


    }

    qntJanelaAnalize = (e) => {
        let analizeValue = e.target.value;  
        let params = e.target.name;
        const qntJanela01 = document.getElementById(`qntJanela${params}`);
        const qntPortas01 = document.getElementById(`qntPortas${params}`);
        const campoComprimento = document.getElementById(`campoComprimento${params}`);
        const campoAltura01 = document.getElementById(`campoAltura${params}`);

        if(qntJanela01.value < 0){
            qntJanela01.value = 0;
        }

        campoAltura01.value = campoAltura01.value.replace(',','.');
        if(qntJanela01.value != 0 && campoAltura01.value < 1.20){
            alert("A PAREDE PRECISA NO MINÍMO DE 1.20M DE ALTURA");
            campoAltura01.value = "";
        }

        if(isNaN(analizeValue)){
            alert("ESSE CAMPO SÓ PERMITE NÚMEROS");
            qntJanela01.value = "";
        }else{
            if(analizeValue != '' && analizeValue != null && analizeValue != undefined){
            
                campoComprimento.value = campoComprimento.value.replace(',','.');
                var calc = campoComprimento.value / 2;
                var valueJanelaM = qntJanela01.value * 2;
                var valuePortasM = qntPortas01.value * 0.80;

                var somaSpaceItens = valueJanelaM + valuePortasM;
                
                if(calc < valueJanelaM){
                    alert('O NÚMERO DE JANELA(s) NÃO CABEM EM 50% DA PAREDE');
                    qntJanela01.value = "";
                }else if(calc < valuePortasM){
                    alert('O NÚMERO DE PORTA(s) NÃO CABEM EM 50% DA PAREDE');
                    qntPortas01.value = "";
                }else if(calc < somaSpaceItens){
                    alert('A SOMA DA JANELA(s) E PORTA(s) NÃO CABEM EM 50% DESSA PAREDE');
                    qntJanela01.value = "";
                    qntPortas01.value = "";
                }else{
                    if(analizeValue < 0){
                        qntJanela01.value = 0;
                        qntJanela01.style.border = "1px solid red";
                        document.getElementById('btnFinalizaCalc01').style.pointerEvents = "none";
                    }else{
                        qntJanela01.style.border = "1px solid #666";
                        document.getElementById('btnFinalizaCalc01').style.pointerEvents = "visible";
                    }
                }

            }
        }

    }

    qntPortaAnalize = (e) => {
        let analizeValue = e.target.value; 
        let params = e.target.name;
        analizeValue = analizeValue.replace(',','.');
        const qntJanela01 = document.getElementById(`qntJanela${params}`);
        const qntPortas01 = document.getElementById(`qntPortas${params}`);
        const campoComprimento = document.getElementById(`campoComprimento${params}`);
        const campoAltura01 = document.getElementById(`campoAltura${params}`);

        if(qntPortas01.value < 0){
            qntPortas01.value = 0;
        }

        campoAltura01.value = campoAltura01.value.replace(',','.');
        if(qntPortas01.value != 0 && campoAltura01.value < 1.90){
            alert("A PAREDE PRECISA NO MINÍMO DE 1.90M DE ALTURA ");
            campoAltura01.value = "";
        }

        if(isNaN(analizeValue)){
            alert("ESSE CAMPO SÓ PERMITE NÚMEROS");
            qntPortas01.value = "";
        }else{
            if(analizeValue != '' && analizeValue != null && analizeValue != undefined){

                campoComprimento.value = campoComprimento.value.replace(',','.');
                var calc = campoComprimento.value / 2;
                var valueJanelaM = qntJanela01.value * 2;
                var valuePortasM = qntPortas01.value * 0.80;

                var somaSpaceItens = valueJanelaM + valuePortasM;

                if(calc < valueJanelaM){
                    alert('O NÚMERO DE JANELA(s) NÃO CABEM EM 50% DA PAREDE');
                    qntJanela01.value = "";
                }else if(calc < valuePortasM){
                     alert('O NÚMERO DE PORTA(s) NÃO CABEM EM 50% DA PAREDE');
                    qntPortas01.value = "";
                }else if(calc < somaSpaceItens){
                    alert('A SOMA DA JANELA(s) E PORTA(s) NÃO CABEM EM 50% DESSA PAREDE');
                    qntJanela01.value = "";
                    qntPortas01.value = "";
                }else{
                    if(analizeValue < 0){
                        qntPortas01.value = 0;
                        qntPortas01.style.border = "1px solid red";
                        document.getElementById('btnFinalizaCalc01').style.pointerEvents = "none";
                    }else{
                        qntPortas01.style.border = "1px solid #666";
                        document.getElementById('btnFinalizaCalc01').style.pointerEvents = "visible";
                    }
                }


            }
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();

        const campoComprimento = document.getElementById(`campoComprimento01`);
        const campoAltura01 = document.getElementById(`campoAltura01`);
        

        const campoComprimento2 = document.getElementById(`campoComprimento02`);
        const campoAltura02 = document.getElementById(`campoAltura02`);

        const campoComprimento3 = document.getElementById(`campoComprimento03`);
        const campoAltura03 = document.getElementById(`campoAltura03`);

        const campoComprimento4 = document.getElementById(`campoComprimento04`);
        const campoAltura04 = document.getElementById(`campoAltura04`);

        const qntJanela01 = document.getElementById(`qntJanela01`);
        const qntPortas01 = document.getElementById(`qntPortas01`);

        const qntJanela02 = document.getElementById(`qntJanela02`);
        const qntPortas02 = document.getElementById(`qntPortas02`);

        const qntJanela03 = document.getElementById(`qntJanela03`);
        const qntPortas03 = document.getElementById(`qntPortas03`);

        const qntJanela04 = document.getElementById(`qntJanela04`);
        const qntPortas04 = document.getElementById(`qntPortas04`);

        campoComprimento.value = campoComprimento.value.replace(',','.');
        campoAltura01.value = campoAltura01.value.replace(',','.');

        campoComprimento2.value = campoComprimento2.value.replace(',','.');
        campoAltura02.value = campoAltura02.value.replace(',','.');

        campoComprimento3.value = campoComprimento3.value.replace(',','.');
        campoAltura03.value = campoAltura03.value.replace(',','.');

        campoComprimento4.value = campoComprimento4.value.replace(',','.');
        campoAltura04.value = campoAltura04.value.replace(',','.');

        qntJanela01.value = qntJanela01.value.replace(',','.');
        qntPortas01.value = qntPortas01.value.replace(',','.');

        qntJanela02.value = qntJanela02.value.replace(',','.');
        qntPortas02.value = qntPortas02.value.replace(',','.');

        qntJanela03.value = qntJanela03.value.replace(',','.');
        qntPortas03.value = qntPortas03.value.replace(',','.');

        qntJanela04.value = qntJanela04.value.replace(',','.');
        qntPortas04.value = qntPortas04.value.replace(',','.');


        if(qntJanela01.value != '' && qntJanela01.value != null && qntJanela01.value != undefined){
            var jane01Whidth = qntJanela01.value * 2;
            var jane01Height = qntJanela01.value * 1.20;
        }else{
            var jane01Whidth = 0;
            var jane01Height = 0;
        }

        if(qntPortas01.value != '' && qntPortas01.value != null && qntPortas01.value != undefined){
            var port01Whidth = qntPortas01.value * 0.80;
            var port01Height = qntPortas01.value * 1.90;
        }else{
            var port01Whidth = 0;
            var port01Height = 0;
        }

        if(qntJanela02.value != '' && qntJanela02.value != null && qntJanela02.value != undefined){
            var jane02Whidth = qntJanela02.value * 2;
            var jane02Height = qntJanela02.value * 1.20;
        }else{
            var jane02Whidth = 0;
            var jane02Height = 0;
        }

        if(qntPortas02.value != '' && qntPortas02.value != null && qntPortas02.value != undefined){
            var port02Whidth = qntPortas02.value * 0.80;
            var port02Height = qntPortas02.value * 1.90;
        }else{
            var port02Whidth = 0;
            var port02Height = 0;
        }

        if(qntJanela03.value != '' && qntJanela03.value != null && qntJanela03.value != undefined){
            var jane03Whidth = qntJanela03.value * 2;
            var jane03Height = qntJanela03.value * 1.20;
        }else{
            var jane03Whidth = 0;
            var jane03Height = 0;
        }

        if(qntPortas03.value != '' && qntPortas03.value != null && qntPortas03.value != undefined){
            var port03Whidth = qntPortas03.value * 0.80;
            var port03Height = qntPortas03.value * 1.90;
        }else{
            var port03Whidth = 0;
            var port03Height = 0;
        }

        if(qntJanela04.value != '' && qntJanela04.value != null && qntJanela04.value != undefined){
            var jane04Whidth = qntJanela04.value * 2;
            var jane04Height = qntJanela04.value * 1.20;
        }else{
            var jane04Whidth = 0;
            var jane04Height = 0;
        }

        
        if(qntPortas04.value != '' && qntPortas04.value != null && qntPortas04.value != undefined){
            var port04Whidth = qntPortas04.value * 0.80;
            var port04Height = qntPortas04.value * 1.90;
        }else{
            var port04Whidth = 0;
            var port04Height = 0;
        }


        if(campoComprimento.value != '' && campoComprimento.value != null && campoComprimento.value != undefined && 
           campoAltura01.value != '' && campoAltura01.value != null && campoAltura01.value != undefined &&
           campoComprimento2.value != '' && campoComprimento2.value != null && campoComprimento2.value != undefined &&
           campoAltura02.value != '' && campoAltura02.value != null && campoAltura02.value != undefined &&
           campoComprimento3.value != '' && campoComprimento3.value != null && campoComprimento3.value != undefined &&
           campoAltura03.value != '' && campoAltura03.value != null && campoAltura03.value != undefined &&
           campoComprimento4.value != '' && campoComprimento4.value != null && campoComprimento4.value != undefined &&
           campoAltura04.value != '' && campoAltura04.value != null && campoAltura04.value != undefined){

        
           var calW = campoComprimento.value - jane01Whidth - port01Whidth;
           var calH = campoAltura01.value - jane01Height - port01Height;
           var calc01 = calW * calH;

           var cal2W = campoComprimento2.value - jane02Whidth - port02Whidth;
           var cal2H = campoAltura02.value - jane02Height - port02Height;
           var calc02 = cal2W * cal2H;

           var cal3W = campoComprimento3.value - jane03Whidth - port03Whidth;
           var cal3H = campoAltura03.value - jane03Height - port03Height;
           var calc03 = cal3W * cal3H;

           var cal4W = campoComprimento4.value - jane04Whidth - port04Whidth;
           var cal4H = campoAltura04.value - jane04Height - port04Height;
           var calc04 = cal4W * cal4H;
        

           var totalEmMetrosQuadrados = calc01 + calc02 + calc03 + calc04;


           var result = [];
           var testeee = this.verifica(totalEmMetrosQuadrados,result);

        
            
        }else{
            alert("PREENCHA TODOS OS COMPRIMENTOS E TODAS AS ALTURAS!");
        }


    }   


    verifica = (t,result) => {

        var meioL = 2.5; // 0.5 quantidade que pinta : 2.5m²
        var umLitro = 5; // 1 quantidade que pinta : 5m²
        var doisLmeio = 12.5; // 2.5 quantidade que pinta : 12.5m²
        var tresLseis = 18; // 3.6 quantidade que pinta : 18m²
        var dezoitoL = 90; // 18 quantidade que pinta : 90m²

        //console.log("TOTAL: ", t);


        if(t < 1){

            document.getElementById("resultFinalDeLatas").innerHTML = "";

            var arrayFinal = [];
            var resultFinal = result.split('/');
            var repetidos = [];
            var itens = [];

            for(var i in resultFinal){
                if(resultFinal[i] != ''){

                    //var Vr = itens.indexOf(`1 Lata de ${resultFinal[i]}/`);

                    arrayFinal += `1 Lata de ${resultFinal[i]}/`;
                    
                    // if(Vr == -1){
                    //     itens += `1 Lata de ${resultFinal[i]}/`;
                    // }else{
                    //     repetidos += `1 Lata de ${resultFinal[i]}/`;
                    // }

                }
            }

            document.getElementById("resultFinalDeLatas").innerHTML = arrayFinal;

        
        //    var analize02 = repetidos.split('/');  
        //    var analize03 = itens.split('/');  

        //    console.log("RESULTADO FINAL", resultFinal);
        //    console.log("ITENS: ", itens);
        //    console.log("REPETIDOS: ", itens);
        //    console.log("ANALIZE02", analize02);
        //    console.log("ANALIZE03", analize03);

        //     for(var j in analize02){
        //         if(analize02[j] != ''){
        //             var a = itens.indexOf(`${analize02[j]}`);

        //             console.log("TEM NO ITENS", a);

        //             // if(a == -1){
        //             //     arrayFinal += analize02[j];
        //             // }else{
        //             //     var quantA = analize02[a].split(' '); 
        //             //     var quantB = parseInt(quantA[0]) + 1;
        //             //     analize02[a] = `${quantB} ${quantA[1]}s ${quantA[2]} ${quantA[3]}`;
        //             //     arrayFinal = analize02[a];
        //             // }
                    
        //         }
        //     }  
            
        //     for(var g in analize03){
        //         if(analize03[g] != ''){
        //             var a = repetidos.indexOf(`${analize03[g]}`);
                    
        //             if(a == -1){
        //                 arrayFinal += `/${analize03[g]}`;
        //             }
        //         }
        //     }


        //     console.log("FINAL :", arrayFinal);  

        //     //alert(arrayFinal);
     
          

        }else{
            if(t > dezoitoL){
                console.log("ENTROU 01");
                t = t - dezoitoL;
                result += '18/';
                this.verifica(t,result);
            }else if(t > tresLseis){
                console.log("ENTROU 02");
                t = t - tresLseis;
                result += '3.6/';
                this.verifica(t,result);
            }else if(t > doisLmeio){
                console.log("ENTROU 03");
                t = t - doisLmeio;
                result += '2.5/';
                this.verifica(t,result);
            }else if(t > meioL){
                console.log("ENTROU 04");
                t = t - meioL;
                result += '0.5/';
                this.verifica(t,result);
            }else{
                console.log("ENTROU 05");
                t = t - meioL;
                result += '0.5/';
                this.verifica(t,result);
            }
        }
    }


    render() {
        return (
            <div className="areaCalculo" >
                <div className="componentCalculo">
                    <div>
                       <img src={Tinta} border="0" alrt="Tinta" />
                    </div>
                    <div>
                        <br /><br />
                        <label className="tituloCalculodeTinta">Calcule a quantidate de <br/> Tinta para Pintar sua Sala</label>
                    </div>
                    <div>
                        <form className="formEntrada" onSubmit={this.handleSubmit} >

                            <div className="formEntradaCampos">
                                <div>
                                    <label>Parede 01</label><br />
                                    <input type="text"  className="campoNome" id="campoComprimento01" name="01" placeholder="Comprimento" onChange={this.comprimentoAnalize} />
                                    <input type="text"  className="campoNome" id="campoAltura01" name="01" placeholder="Altura" altura="true" onBlur={this.alturaAnalize}   />
                                </div>
                                <div>
                                    <label>Janela Parede 01</label><br />
                                    <input type="number" className="campoNome" id="qntJanela01" name="01" placeholder="Quantas Janelas" altura="false" onChange={this.qntJanelaAnalize} onBlur={this.alturaAnalize}   />
                                    <input type="text" className="campoNome" id="metroJanela01" name="01" placeholder="TAMANHO Unidade = 2,00m x 1,20m" readOnly="readOnly" style={{ background: "#e9e9e9" }} />
                                </div>
                                <div>
                                    <label>Portas Parede 01</label><br />
                                    <input type="number" className="campoNome" id="qntPortas01" name="01" placeholder="Quantas Portas" altura="false" onChange={this.qntPortaAnalize} onBlur={this.alturaAnalize} />
                                    <input type="text" className="campoNome" id="metroPortas01" name="01" placeholder="TAMANHO Unidade = 0,80m x 1,90m" readOnly="readOnly" style={{ background: "#e9e9e9" }} />
                                </div>
                            </div>

                            {/*  */}
                            <div className="formEntradaCampos">
                                <div>
                                    <label>Parede 02</label><br />
                                    <input type="text"  className="campoNome" id="campoComprimento02" name="02" placeholder="Comprimento" onChange={this.comprimentoAnalize} />
                                    <input type="text"  className="campoNome" id="campoAltura02" name="02" placeholder="Altura" altura="true" onBlur={this.alturaAnalize}  />
                                </div>
                                <div>
                                    <label>Janela Parede 02</label><br />
                                    <input type="number" className="campoNome" id="qntJanela02" name="02" placeholder="Quantas Janelas" altura="false" onChange={this.qntJanelaAnalize}  onBlur={this.alturaAnalize} />
                                    <input type="text" className="campoNome" id="metroJanela02" name="02" placeholder="TAMANHO Unidade = 2,00m x 1,20m" readOnly="readOnly" style={{ background: "#e9e9e9" }} />
                                </div>
                                <div>
                                    <label>Portas Parede 02</label><br />
                                    <input type="number" className="campoNome" id="qntPortas02" name="02" placeholder="Quantas Portas" altura="false" onChange={this.qntPortaAnalize} onBlur={this.alturaAnalize}  />
                                    <input type="text" className="campoNome" id="metroPortas02" name="02" placeholder="TAMANHO Unidade = 0,80m x 1,90m" readOnly="readOnly" style={{ background: "#e9e9e9" }} />
                                </div>
                            </div>
                            {/*  */}
                            <div className="formEntradaCampos">
                                <div>
                                    <label>Parede 03</label><br />
                                    <input type="text"  className="campoNome" id="campoComprimento03" name="03" placeholder="Comprimento" onChange={this.comprimentoAnalize} />
                                    <input type="text"  className="campoNome" id="campoAltura03" name="03" placeholder="Altura" altura="true" onBlur={this.alturaAnalize}  />
                                </div>
                                <div>
                                    <label>Janela Parede 03</label><br />
                                    <input type="number" className="campoNome" id="qntJanela03" name="03" placeholder="Quantas Janelas" altura="false" onChange={this.qntJanelaAnalize} onBlur={this.alturaAnalize}  />
                                    <input type="text" className="campoNome" id="metroJanela03" name="03" placeholder="TAMANHO Unidade = 2,00m x 1,20m" readOnly="readOnly" style={{ background: "#e9e9e9" }} />
                                </div>
                                <div>
                                    <label>Portas Parede 03</label><br />
                                    <input type="number" className="campoNome" id="qntPortas03" name="03" placeholder="Quantas Portas" altura="false"  onChange={this.qntPortaAnalize} onBlur={this.alturaAnalize} />
                                    <input type="text" className="campoNome" id="metroPortas03" name="03" placeholder="TAMANHO Unidade = 0,80m x 1,90m" readOnly="readOnly" style={{ background: "#e9e9e9" }} />
                                </div>
                            </div>
                            {/*  */}
                            <div className="formEntradaCampos">
                                <div>
                                    <label>Parede 04</label><br />
                                    <input type="text"  className="campoNome" id="campoComprimento04" name="04" placeholder="Comprimento" onChange={this.comprimentoAnalize} />
                                    <input type="text"  className="campoNome" id="campoAltura04" name="04" placeholder="Altura" altura="true" onBlur={this.alturaAnalize}  />
                                </div>
                                <div>
                                    <label>Janela Parede 04</label><br />
                                    <input type="number" className="campoNome" id="qntJanela04" name="04" placeholder="Quantas Janelas" altura="false" onChange={this.qntJanelaAnalize} onBlur={this.alturaAnalize}  />
                                    <input type="text" className="campoNome" id="metroJanela04" name="04" placeholder="TAMANHO Unidade = 2,00m x 1,20m" readOnly="readOnly" style={{ background: "#e9e9e9" }} />
                                </div>
                                <div>
                                    <label>Portas Parede 04</label><br />
                                    <input type="number" className="campoNome" id="qntPortas04" name="04" placeholder="Quantas Portas" altura="false" onChange={this.qntPortaAnalize} onBlur={this.alturaAnalize}  />
                                    <input type="text" className="campoNome" id="metroPortas04" name="04" placeholder="TAMANHO Unidade = 0,80m x 1,90m" readOnly="readOnly" style={{ background: "#e9e9e9" }} />
                                </div>
                            </div>
                            {/*  */}

                            <div className="areaResultFinal">
                                <div>RESULTADO</div>
                                <div className="resultFinalDeLatas" id="resultFinalDeLatas">
                                    
                                </div>
                            </div>

                            <div>
                                <input type="submit" className="btnEntrar" id="btnFinalizaCalc01" value="Fazer Cálculo" /><br/>
                            </div>
                        </form> 
                    </div>
                </div>  
            </div>
        );
    }
}

export default Calculo;