﻿CREATE PROC FI_SP_AltBeneficiario
    @NOME          VARCHAR (50) ,
	@CPF		   VARCHAR (14),
	@Id			   BIGINT,
	@IdCliente	   BIGINT
AS
BEGIN
	UPDATE BENEFICIARIOS 
	SET 
		NOME = @NOME, 
		CPF = @CPF
	WHERE Id = @Id
END
