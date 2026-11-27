export interface Chamado {
  id: string;
  titulo: string;
  categoria: string;
  status: string;
  descricao: string;
}

export const STATUS_CHAMADO = ['Aberto', 'Em andamento', 'Concluído'];
