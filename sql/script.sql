CREATE DATABASE base_node;

CREATE TABLE base_node.tb_pessoa (
  id_pessoa int(11) NOT NULL AUTO_INCREMENT,
  ds_nome varchar(100) NOT NULL,
  fl_ativo bit(1) NOT NULL,
  PRIMARY KEY (`id_pessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

