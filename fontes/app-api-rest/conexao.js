/**INCLUINDO O MODULO DO MYSQL */
var mysql = require('mysql'); 

/**CRIANDO A CONEXÃO COM O BANCO  DE DADOS */
var conexao = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "base_node",
    typeCast: function castCampo(campo, usarCastDefault){                

        /*ESSA FUNÇÃO REALIZA O CAST DO TIPO BIT PARA BOOLEAN */
        
        if((campo.type === "BIT") && (campo.length === 1)) {
         
            var bytes = campo.buffer();

            return(bytes[0] === 1);
        }

        return (usarCastDefault());
    }
});


/**CRIANDO MODULO PARA MANIPULAÇAO DOS DADOS NO MYSQL.
 * 
 * TODAS AS FUNÇÕES CRIADAS AQUI FICARAM DISPONIVEIS NO require.
 * 
 * EXEMPLO: var conexao = require("./conexao");
 * 
*/
module.exports = {
    
    /**
     * CONSULTA TODOS OS REGISTROS DE UMA TABELA
     */
    resultList: function(funcCallbackSaida, tabela){
        
        /**MONTA A QUERY A SER EXECUTADA */
        var query = "SELECT * FROM " + tabela;


        /**EXECUTA A QUERY*/
        conexao.query(query, function (err, result) {            
            
            if (err) 
                console.error('Erro: - ' + err.stack);

            /**EXECUTA A FUNÇÃO DE CALLBACK PASSADA COMO PARAMETRO */
            funcCallbackSaida(result);                            

        });     

    },

    /**CONSULTA UM REGISTRO EM UMA TABELA POR UM DETERMINADO CAMPO */
    singleResult: function(funcCallbackSaida, tabela, campo,valor){
        
        /**MONTA A QUERY A SER EXECUTADA */
        var query  = "SELECT * FROM " + tabela + " WHERE " + campo +  " = ? ";        

        /**EXECUTA A QUERY*/
        conexao.query(query,[valor], function (err, result) {            
            
            if (err) 
                console.error('Erro: - ' + err.stack);
            
            var primeiroRegistro = new Object();
            
            /**VERIFICA SE RETORNOU REGISTRO */
            if(result[0] != undefined)
                primeiroRegistro = result[0];

            /**EXECUTA A FUNÇÃO DE CALLBACK PASSADA COMO PARAMETRO */            
            funcCallbackSaida(primeiroRegistro);                            

        });   
    },

    /**INSERI UM NOVO REGISTRO */
    persist:function(funcCallbackSaida, tabela,campos, valores){

        /**MONTA A QUERY A SER EXECUTADA */
        var query = "INSERT INTO " + tabela + "("+ campos +") VALUES (?) ";

        /**EXECUTA A QUERY*/
        conexao.query(query,[valores], function (err, result) {            
            
            if (err) 
                console.error('Erro: - ' + err.stack);

            /**EXECUTA A FUNÇÃO DE CALLBACK PASSADA COMO PARAMETRO */
            funcCallbackSaida(result);                            

        });   

    },

    /**REMOVE UM REGISTRO DE UMA TABELA POR UM DETERMINADO CAMPO */
    remove:function(funcCallbackSaida, tabela, campo,valor){
        
        /**MONTA A QUERY A SER EXECUTADA */
        var query  = "DELETE FROM " + tabela + " WHERE " + campo +  " = ? ";        
        
        /**EXECUTA A QUERY*/
        conexao.query(query,[valor], function (err, result) {            
            
            if (err) 
                console.error('Erro: - ' + err.stack);

            /**EXECUTA A FUNÇÃO DE CALLBACK PASSADA COMO PARAMETRO */
            funcCallbackSaida(result);                            

        });   
    },

    /**ATUALIZAÇÃO DOS CAMPOS POR UM CAMPO CHAVE */
    merge:function(funcCallbackSaida, tabela, camposAtualizacao, valores, campoChave){
        
        /**MONTA A QUERY A SER EXECUTADA */
        var query  = "UPDATE   " + tabela;
            query += "   SET   " + camposAtualizacao;
            query += " WHERE   " + campoChave + " = ?";        
        
        /**EXECUTA A QUERY*/
        conexao.query(query,valores, function (err, result) {            
            
            if (err) 
                console.error('Erro: - ' + err.stack);

            /**EXECUTA A FUNÇÃO DE CALLBACK PASSADA COMO PARAMETRO */
            funcCallbackSaida(result);                            

        });   
    }
};


