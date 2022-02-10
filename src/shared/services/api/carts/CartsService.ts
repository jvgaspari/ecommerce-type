import { ICartItem } from "../../../interfaces";
import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

const getAll = async (): Promise<ICartItem[] | ApiException> => {
    try {
        const { data } = await Api().get('/products');
        return data
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao consultar API.');
    }
};

export const CartsService = {
    getAll,
};