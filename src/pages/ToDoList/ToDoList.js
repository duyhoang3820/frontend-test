import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTaskApi, deleteTaskApi, doneTaskList, inProgressTaskList, updateTaskList } from '../../redux/action/ToDoListActions';
import _ from 'lodash'
import './ToDoList.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'


export default function ToDoList() {
    const { taskList, taskEdit } = useSelector(state => state.ToDoListReducer)
    // console.log('taskList', taskList);
    const dispatch = useDispatch();
    const [taskEditCopy, setTaskEditCopy] = useState()
    const [state, setState] = useState({
        taskName: '',
        status: 'TODO'
    });
    useEffect(() => {
        setTaskEditCopy({
            ...taskEdit,
            taskEditCop: taskEdit
        })
    }, [taskEdit])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taskName: taskEdit?.taskName,
            id: taskEdit?.id,
            status: taskEdit?.status
        },
        validationSchema: Yup.object().shape({
            taskName: Yup.string().required("Task name is required!"),
        }),
    });

    const handleChange = (e) => {
        const { value } = e.target;
        // console.log(name, value);
        setState((prev) => ({
            ...prev,
            taskName: value
        }))
    }
    const addTask = (e) => {
        e.preventDefault();
        // console.log(state);
        if (state.taskName === '') {
            alert('Task name is required')
            return
        }
        dispatch(addTaskApi(state))
        document.getElementById('taskName').value = '';
    }


    const renderTaskTodo = () => {
        return taskList.filter(task => task.status === 'TODO').map((item, index) => {
            return <li key={index} className='bg-primary'>
                <span className='mt-1'>{item.taskName} </span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        dispatch(deleteTaskApi(item.taskName))
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="inprogress" type="button" onClick={() => {
                        dispatch(inProgressTaskList(item.id))
                    }}>
                        <i className="fa fa-spinner"></i>
                    </button>
                    <button className="done" type="button" onClick={() => {
                        dispatch(doneTaskList(item.id))
                    }}>
                        <i className="fa fa-check"></i>
                    </button>
                    <button className="edit" type="button" data-toggle="modal" data-target="#edit" onClick={() => {
                        dispatch({
                            type: 'TASK_NAME_EDIT',
                            taskEdit: item,
                        })
                    }}>
                        <i className="fa fa-edit"></i>
                        {/* <i className="fas fa-check-circle" /> */}
                    </button>
                </div>
            </li>
        })
    }
    const renderTaskDone = () => {
        return taskList.filter(task => task.status === 'DONE').map((item, index) => {
            return <li key={index} className='bg-success'>
                <span className='mt-1 text-black'>{item.taskName} </span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        dispatch(deleteTaskApi(item.taskName))
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="edit" type="button" data-toggle="modal" data-target="#edit" onClick={() => {
                        dispatch({
                            type: 'TASK_NAME_EDIT',
                            taskEdit: item,
                        })
                    }}>
                        <i className="fa fa-edit"></i>
                        {/* <i className="fas fa-check-circle" /> */}
                    </button>
                </div>
            </li>
        })
    }
    const renderTaskInProgress = () => {
        return taskList.filter(task => task.status === 'INPROGRESS').map((item, index) => {
            return <li key={index} className='bg-warning'>
                <span className='mt-1'>{item.taskName} </span>
                <div className="buttons">
                    <button className="done" type="button" onClick={() => {
                        dispatch(doneTaskList(item.id))
                    }}>
                        <i className="fa fa-check"></i>
                    </button>
                    <button className="remove" type="button" onClick={() => {
                        dispatch(deleteTaskApi(item.taskName))
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="edit" type="button" data-toggle="modal" data-target="#edit" onClick={() => {
                        dispatch({
                            type: 'TASK_NAME_EDIT',
                            taskEdit: item,
                        })
                    }}>
                        <i className="fa fa-edit"></i>
                        {/* <i className="fas fa-check-circle" /> */}
                    </button>
                </div>
            </li>
        })
    }
    useEffect(() => {
        setTaskEditCopy({
            taskEditCop: formik.values
        })
    }, [formik.values])

    return (

        <form onSubmit={formik.handleSubmit}>
            <div className="card">
                <div className="card__header">
                    <img src="https://picsum.photos/1500/500" />
                </div>
                {/* <h2>hello!</h2> */}
                <div className="card__body">
                    <div className="form-group">
                        <div className="card__content">
                            <div className="card__title mb-5">
                                <h2 className='mt-5'>My Tasks</h2>
                            </div>
                            <div className="card__add">
                                <input name="taskName" id="taskName" type="text" placeholder="Enter an activity..." onChange={handleChange} required />
                                <button id="addItem" onClick={addTask}>
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                        </div>
                        <div className='listTask'>
                            <div className="card__todo form-group">
                                {/* Uncompleted tasks */}
                                <p>To do</p>
                                <ul className="todo" id="todo">
                                    {renderTaskTodo()}
                                </ul>
                            </div>
                            <div className="card__todo form-group">
                                {/* In processing tasks */}
                                <p>In Progress</p>
                                <ul className="todo" id="inprogress">
                                    {renderTaskInProgress()}
                                </ul>
                            </div>
                            <div className="card__todo form-group">
                                {/* Completed tasks */}
                                <p>Completed</p>
                                <ul className="todo" id="completed">
                                    {renderTaskDone()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" id="edit">
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h4 className="modal-title">Change task name</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="taskName" className="text-primary" style={{ fontSize: '14px' }}>Task name</label>
                                <input className="form-control" type="text" name="taskName" id="taskName" value={taskEditCopy?.taskName} onChange={formik.handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={() => {
                                if (formik.values.taskName.trim() === '') {
                                    alert('Task name is required')
                                } else {
                                    dispatch(updateTaskList(formik.values))
                                }

                            }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
