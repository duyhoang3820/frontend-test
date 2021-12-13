
export const getTaskApi = () => {

    return dispatch => {
        let data = JSON.parse(localStorage.getItem('ToDoList'))
        dispatch({
            type: 'GET_TASK_LIST',
            data
        })
    }
}

export const addTaskApi = (task) => {
    return dispatch => {
        localStorage.setItem('ToDoList', JSON.stringify(task))
        dispatch(getTaskApi())
    }
}
export const deleteTaskApi = (taskName) => {
    return dispatch => {
        dispatch({
            type: 'DEL_TASK_LIST',
            taskName
        })
    }
}
export const editTaskApi = (taskName) => {
    return dispatch => {
        dispatch({
            type: 'EDIT_TASK_LIST',
            taskName
        })
    }
}
export const updateTaskList = (task) => {
    return dispatch => {
        dispatch({
            type: 'UPDATE_TASK_LIST',
            task
        })
    }
}

export const doneTaskList = (id) => {
    return dispatch => {
        dispatch({
            type: 'DONE_TASK_LIST',
            id
        })
    }
}
export const inProgressTaskList = (id) => {
    return dispatch => {
        dispatch({
            type: 'INPROGRESS_TASK_LIST',
            id
        })
    }
}