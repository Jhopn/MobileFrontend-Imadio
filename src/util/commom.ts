export const formatDate = (dateString: string) => {
    try {
        // Verifica se a string de data contém um formato reconhecível
        if (!dateString) return '';

        // Se for uma data ISO ou similar, podemos usar o Date
        if (dateString.includes('T') || dateString.includes('-') || dateString.includes('/')) {
            const date = new Date(dateString);

            // Verifica se a data é válida
            if (isNaN(date.getTime())) {
                // Se não for uma data válida, tenta extrair apenas a parte da data usando regex
                const dateMatch = dateString.match(/(\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2})/);
                return dateMatch ? dateMatch[0] : dateString;
            }

            // Formata a data como DD/MM/YYYY
            return date.toLocaleDateString('pt-BR');
        }

        // Se não conseguir processar, retorna a string original
        return dateString;
    } catch (error) {
        console.error('Erro ao formatar data:', error);
        return dateString;
    }
};
