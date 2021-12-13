/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    taskList: [],
    taskEdit: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TASK_LIST': {
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.taskName === action.data.taskName);
            if (index !== -1) {
                alert("Task name already exists");
                return { ...state };
            }
            state.taskList.push({ ...action.data, id: Math.floor(Math.random() * 100) + 1 });
            // console.log(state.taskList);
            return { ...state }
        }
        case 'DEL_TASK_LIST': {
            const newTaskList = [...state.taskList];
            const taskListUpdate = newTaskList.filter(item => item.taskName !== action.taskName)
            // console.log(state.taskList);
            state.taskList = taskListUpdate
            // console.log(state.taskList);
            return { ...state }
        }
        case 'TASK_NAME_EDIT': {
            state.taskEdit = action.taskEdit
            return { ...state }
        }
        case 'UPDATE_TASK_LIST': {
            state.taskEdit = action.task
            // console.log(state.taskEdit);
            let taskListUpdate = [...state.taskList];
            let index1 = taskListUpdate.findIndex(task => task.taskName === state.taskEdit.taskName);
            if (index1 !== -1) {
                alert("Task name already exists");
                return { ...state };
            }
            let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id)
            if (index !== -1) {
                taskListUpdate[index] = state.taskEdit
            }

            state.taskList = taskListUpdate;

            return { ...state }
        }
        case 'DONE_TASK_LIST': {
            let taskListUpdate = [...state.taskList]
            let index = taskListUpdate.findIndex(task => task.id === action.id);
            if (index !== -1) {
                taskListUpdate[index].status = 'DONE';
            }
            return { ...state, taskList: taskListUpdate }
        }
        case 'INPROGRESS_TASK_LIST': {
            let taskListUpdate = [...state.taskList]
            let index = taskListUpdate.findIndex(task => task.id === action.id);
            if (index !== -1) {
                taskListUpdate[index].status = 'INPROGRESS';
            }
            return { ...state, taskList: taskListUpdate }
        }
        default:
            return { ...state }
    }
}
