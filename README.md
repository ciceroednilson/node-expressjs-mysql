## API rest em Node JS com ExpressJS usando banco de dados Mysql.

### Requisitos.

- NodeJs
- Npm
- Visual Studio Code/Sublime Text
- Mysql

### Executado o Micro Service.

Para executar o Micro Service basta navegar até a pasta do projeto e executar o comando nodemon app.js, não esuqeça de criar os objetos do banco de dados e trocar a configuração do seu banco que fica no arquivo conexao.js.

### Testando o Micro Service.

Para testar o nosso Micro Service você deve chamar as urls abaixo.

[POST] -salva um novo registro.
http://localhost:3000/api/pessoa

request

```javascript
{
  "nome": "cicero 2",
  "ativo":1
}
```


response
```javascript
{
    "mensagem": "Registro inserido com sucesso!"
}
```

[GET] - consuta um registro pela sua chave
http://localhost:3000/api/pessoa/codigo=24

response
```javascript
{
    "codigo": 24,
    "nome": "cicero 2",
    "ativo": true
}
```

[GET] - consulta todas as pessoas
http://localhost:3000/api/pessoa

response
```javascript
[
    {
        "codigo": 24,
        "nome": "cicero 2",
        "ativo": true
    },
    {
        "codigo": 25,
        "nome": "cicero 2",
        "ativo": true
    },
    {
        "codigo": 26,
        "nome": "cicero 2",
        "ativo": true
    }
]
```


[PUT] - Alterando um registro
http://localhost:3000/api/pessoa

request
```javascript
{
  "codigo": 23, 
  "nome": "cicero codigo 23",
  "ativo":1
}
```

response
```javascript
{
    "mensagem": "Registro atualizado com sucesso!"
}
```


[DELETE] - excluir um registro
http://localhost:3000/api/pessoa/codigo=23

response
```javascript
{
    "mensagem": "Registro excluido com sucesso!"
}
```
