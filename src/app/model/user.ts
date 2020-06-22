export interface user {
    name: string,
    nascimento: string,
    sexo: string
    pais: string,
    estado: string,
    cidade: string,
    email: string,
    password: number,
    status: [
        {
            ativo: number,
            online: number,
            banido: [

                {

                    valor: number,
                    data: string,
                    motivo: string
                }

            ]

        }
    ],
    primeiroacesso: number


}