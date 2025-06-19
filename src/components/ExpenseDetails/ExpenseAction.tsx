// Por ejemplo en ExpenseDetail.tsx o donde lo necesites

import { useDeleteExpense } from "@hooks/useManageExpenses";
import { useSelectedExpense } from "@utils/selectExpenseStore";



const ExpenseActions = () => {
    const { selectedId, clearSelectedId } = useSelectedExpense();
    const { isLoading, error, deleteExpense } = useDeleteExpense()

    const handleDelete = async () => {
        if (!selectedId) return alert("No hay gasto seleccionado");
        
        await deleteExpense(selectedId)

        if (error) {
            alert(`Error al eliminar el gasto: ${error}`);
        }

        clearSelectedId();

        //acutalizar la pagina acutal
        window.location.reload();

    };

    return (
        <div className="mt-6 flex justify-center">
            <button
                onClick={handleDelete}
                disabled={!selectedId || isLoading}
                className={`px-6 py-2 text-white rounded-lg transition-colors duration-200 ${selectedId ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
            >
                Eliminar gasto seleccionado
            </button>
        </div>
    );
}

export default ExpenseActions;