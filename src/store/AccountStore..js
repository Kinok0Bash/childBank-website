import { makeAutoObservable, runInAction } from "mobx";
import api from "../services/axios/api.js";
import {
    BALANCE_CHILD,
    BALANCE_PARENT, HISTORY_ALL, HISTORY_LAST, PARENT_SALARY
} from "../constants/endpoints/endpointConst.js";

class AccountStore {
    parentBalance;
    childBalance;
    transactions;
    constructor() {
        this.parentBalance = 0;
        this.childBalance = 0;
        this.transactions = [];
        makeAutoObservable(this, {}, { autoBind: true });
    }

    getBalanceParent = async () => {
        let errorMessage;
        try {
            const response = await api.get(BALANCE_PARENT);
            runInAction(() => {
                this.parentBalance = response.data.parentBalance;
                this.childBalance = response.data.childBalance;
            });
        } catch(err) {
            errorMessage = err.response?.data?.message;
        }
        return errorMessage || null;
    }
    getBalanceChild = async () => {
        let errorMessage;
        try {
            const response = await api.get(BALANCE_CHILD);
            runInAction(() => {
                this.childBalance = response.data.balance;
            });
        } catch(err) {
            errorMessage = err.response?.data?.message;
        }
        return errorMessage || null;
    }

    getLastOperations = async () => {
        let errorMessage;
        try {
            const response = await api.get(HISTORY_LAST);
            runInAction(() => {
                this.transactions = response.data;
            });
        } catch(err) {
            errorMessage = err.response?.data?.message;
        }
        return errorMessage || null;
    }

    getAllOperations = async () => {
        let errorMessage;

        try {
            const response = await api.get(HISTORY_ALL);
            runInAction(() => {
                this.transactions = response.data;
            });
        } catch(err) {
            errorMessage = err.response?.data?.message;
        }
        return errorMessage || null;
    }

    getSalary = async () => {
        let errorMessage;
        let response;

        try {
            response = await api.put(PARENT_SALARY);

        } catch(err) {
            errorMessage = err.response?.data?.message;
        }
        return errorMessage || response.data.message;
    }

    clear = async () => {
        this.parentBalance = 0;
        this.childBalance = 0;
        this.transactions = [];
    }
}
export default new AccountStore();
