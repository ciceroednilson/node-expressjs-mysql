
/**INCLUINDO OS MODULOS */
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var conexao    = require("./conexao");


app.use(bodyParser.urlencoded({ extended: true }));

/**FORMATO PADRAO*/
app.use(bodyParser.json());


/**CRIANDO A VARIÁVEL RESPONSÁVEL PELAS ROTAS */
var router = express.Router(); 



/**RETORNA TODAS AS PESSOAS CADASTRADAS */
router.get(['/','/pessoa'], function(req, res) {
    
    /**CONSULTA TODOS OS REGISTROS DA TABELA tb_pessoa */
    conexao.resultList(function(resultado){

        /**CRIANDO A LISTA/ARRAY DE PESSOAS */
        var pessoas = new Array();

        /**PERCORRE OS REGISTROS ENCONTRADOS */
        for (var index = 0; index < resultado.length; index++) {
             
            /**CRIA O OBJETO COM OS CAMPOS QUE VÃO RECEBER OS 
             * DADOS RETORNADOS DO BANCO */
            var pessoa = new Object();
            pessoa.codigo = resultado[index].id_pessoa;
            pessoa.nome   = resultado[index].ds_nome ;            
            pessoa.ativo  = resultado[index].fl_ativo;

            /**ADICIONA A PESSOA A UMA LISTA */
            pessoas.push(pessoa);
        }
        
        /**RETORNA  UMA LISTA EM JSON */
        res.json(pessoas);   

    }, "tb_pessoa");

});



/**RETORNA UMA PESSOA PELO CÓDIGO */
router.get('/pessoa/:codigo', function(req, res) {
    
    /**PEGA O CÓDIGO ENVIADO NA REQUEST(codigo=1) */
    var codigo = (req.params.codigo.split("=")[1]);
    
    /**RETORNA O PRIMEIRO REGISTRO DA QUERY EXECUTADA */
    conexao.singleResult(function(resultado){

        /**CRIANDO O OBJETO QUE VAI SER RETORNADO*/                
        var pessoa = new Object();

        /**VERIFICA SE RETORNOU REGISTRO*/
        if(resultado.id_pessoa != undefined){

            /**SETA OS VALORES NOS CAMPOS CRIADOS*/
            pessoa.codigo = resultado.id_pessoa;
            pessoa.nome   = resultado.ds_nome;            
            pessoa.ativo  = resultado.fl_ativo;            
        }

        /**RETORNA OS DADOS DA PESSOA ENCONTRADA*/
        res.json(pessoa);   

    }, "tb_pessoa", "id_pessoa", codigo);
    
});




/**INSERI UMA NOVA PESSOA */
router.post('/pessoa', function(req, res) {
   
    /**CAMPOS DA TABELA tb_pessoa QUE VAMOS USAR NA PERSITENCIA*/
    var campos = "ds_nome,fl_ativo";

    /**VALORES A SEREM PERSISTIDOS */
    var valores = [req.body.nome, (req.body.ativo ? 1 : 0)];
    
    /**PERSISTINDO OS DADOS NO BANCO */
    conexao.persist(function(resultado){
        
        /**MENSAGEM DE RETORNO */
        res.json({mensagem: "Registro inserido com sucesso!"});           

    }, "tb_pessoa", campos, valores);
    
    
});




/**EXCLUINDO UM REGISTRO PELA CHAVE DA TABELA */
router.delete('/pessoa/:codigo', function(req, res) {
    
    /**PEGA O CÓDIGO DO REGISTRO QUE VAI SER EXCLUIDO */
    var codigo = (req.params.codigo.split("=")[1]);
        
    /**REMOVE UM REGISTRO */
    conexao.remove(function(resultado){
        
        /**MENSAGEM DE RETORNO */
        if(resultado.affectedRows > 0)
            res.json({mensagem: "Registro excluido com sucesso!"});   
        else
            res.json({mensagem: "Registro não encontrado para exlusão!"});   
                        

    }, "tb_pessoa", "id_pessoa", codigo);
    
});




/**ATUALIZA OS DADOS DE UMA PESSOA */
router.put('/pessoa', function(req, res) {
    
    /**CAMPOS A SEREM ATUALIZADOS */
     var camposAtualizacao = "ds_nome = ?, fl_ativo = ?";

     /**VALORES PARA ATUALIZAÇÃO */
     var valores = [req.body.nome, (req.body.ativo ? 1 : 0), req.body.codigo];

     /**EXECUTA A QUERY DE ATUALIZAÇÃO POR UM CAMPO CHAVE(id_pessoa) */
     conexao.merge(function(resultado){
        
        /**MENSAGEM DE RETORNO */
        if(resultado.affectedRows > 0)
            res.json({mensagem: "Registro atualizado com sucesso!"});           
        else
            res.json({mensagem: "Registro não encontado!"});           
 
     }, "tb_pessoa", camposAtualizacao, valores, "id_pessoa");
     
     
 });




/**REGISTRNADO AS ROTAS */
app.use('/api', router);




/**PORTA DE EXECUÇÃO DA API */
app.listen(3000, function () {

  console.log('Inciando o servidor na porta 3000!');

});