import { createContext } from 'react';

export const Context = createContext({} as {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>
    despesaEdit: string;
    setDespesaEdit: React.Dispatch<React.SetStateAction<string>>
});
