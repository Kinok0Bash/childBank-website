import {observer} from "mobx-react-lite";
import './OperationHistory.scss';
import {useEffect} from "react";
import AccountStore from "../../store/AccountStore..js";
import HistoryItem from "./HistoryItem.jsx";
import LoaderStore from "../../store/LoaderStore.js";

const OperationHistory = ({type = 'LAST'}) => {
    useEffect(() => {
        async function fetch() {
            LoaderStore.showLocalLoader();
            if(type === 'LAST') await AccountStore.getLastOperations();
            else await AccountStore.getAllOperations();
            LoaderStore.hideLocalLoader();
        }
        fetch();
    }, [])

    const transactionsToDisplay = 
        type === 'LAST' 
            ? [...AccountStore.transactions].reverse().slice(0, 4) 
            : [...AccountStore.transactions].reverse();

    return (
        <ul className={'operationHistory'}>
                {transactionsToDisplay.map((item) => (
                    <HistoryItem {...item} />
                ))}
        </ul>
    )
}

export default observer(OperationHistory);