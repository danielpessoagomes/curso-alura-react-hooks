import React from 'react';
import DadosPessoais from './DadosPessoais';
import DadosUsuario from './DadosUsuario';
import DadosEntrega from './DadosEntrega';
import { useState } from 'react';
import { useEffect } from 'react';
import { Typography, Step, Stepper, StepLabel } from '@material-ui/core';

function FormularioCadastro({ aoEnviar, validarCPF }) {

    const [etapaAtual, setEtapaAtual] = useState(0);
    const [dadosColetados, setDados] = useState("");
    useEffect(()=>{
        if(etapaAtual === formularios.length-1){
            aoEnviar(dadosColetados);
        }
    })

    const formularios = [
        <DadosUsuario aoEnviar={coletarDados} />, 
        <DadosPessoais aoEnviar={coletarDados} validarCPF={validarCPF} />,
        <DadosEntrega aoEnviar={coletarDados} />,
        <Typography variant="h5">Obrigado pelo cadastro</Typography>
 ]

    function proximo(){
        setEtapaAtual(etapaAtual+1);
    }

    function coletarDados(dados){
        setDados({...dadosColetados, ...dados});
        proximo();
    }

    return (
        <>
            <Stepper activeStep={etapaAtual}>
                <Step><StepLabel>Login</StepLabel></Step>
                <Step><StepLabel>Pessoal</StepLabel></Step>
                <Step><StepLabel>Entrega</StepLabel></Step>
                <Step><StepLabel>Finalização</StepLabel></Step>
            </Stepper>
            {formularios[etapaAtual]}
        </>
    );
}

export default FormularioCadastro;