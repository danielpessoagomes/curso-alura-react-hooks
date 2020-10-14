import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';

function DadosUsuario({ aoEnviar, validacoes }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [erros, setErros] = useState({senha:{valido:true, texto: ""}});

    function validarCampos(event){
        const {name,value} = event.target;
        const ehValido = validacoes[name](value);
        const novoEstado = {...erros}
        novoEstado[name] = ehValido
        setErros(novoEstado)
    }

    function possoEnviar(){
        for(let campo in erros){
            if(!erros[campo].valido){
                return false
            } 
        }
        return true
    }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                if(possoEnviar()){
                    aoEnviar({email, senha});
                }
            }}>
            <TextField
                value={email}
                onChange={(event) => { setEmail(event.target.value) }}
                id="email"
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                margin="normal"
                fullWidth
                required />
            <TextField
                value={senha}
                onChange={(event) => { setSenha(event.target.value) }}
                onBlur={validarCampos}
                error={!erros.senha.valido}
                helperText={erros.senha.texto}
                id="senha"
                name="senha"
                label="Senha"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                required />
            <Button
                variant="contained"
                color="primary"
                type="submit">Próximo</Button>
        </form>
    );
}

export default DadosUsuario;