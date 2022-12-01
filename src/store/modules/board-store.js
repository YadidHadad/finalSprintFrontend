import { boardService } from '../../services/board.service.local'
import { utilService } from '../../services/util.service'
import { store } from '../store'

export const boardStore = {
    state: {
        boards: [],
        editedTask: null,
        board: null,
    },

    getters: {
        boards({ boards }) { return boards },
        getEditedTask({ editedTask }) { return editedTask },
        board({ board }) { return board },
        labels({ board }) { return board.labels },
        checklists({ editedTask }) { return editedTask.checklists },
        activities({ board }) { return board.activities },
    },

    mutations: {

        setBoards(state, { boards }) {
            state.boards = boards
        },

        setBoard(state, { boardId }) {
            const currBoard = state.boards.find(b => b._id === boardId)
            state.board = currBoard
            // console.log(currBoard);
        },

        addBoard(state, { board }) {
            state.boards.push(board)
        },

        updateBoard(state, { board }) {
            const idx = state.boards.findIndex(b => b._id === board._id)
            // console.log(idx);
            state.boards.splice(idx, 1, board)
        },

        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },
        updateTask(state, { payload }) {
            // console.log(state.board);
            this.editedTask = payload.task
            const group = state.board.groups.find(g => g.id === payload.groupId)
            const taskIdx = group.tasks.findIndex(task => task.id === payload.task.id)
            group.tasks.splice(taskIdx, 1, payload.task)
        },
        setEditedTask(state, { taskId }) {
            state.boards.forEach(board => {
                if (board.groups) {
                    board.groups.forEach(group => {
                        if (group.tasks) {
                            group.tasks.forEach(task => {
                                if (task.id === taskId)
                                    state.editedTask = task
                            })
                        }
                    })
                }
            })
        },
        updateEditedTask(state, { task }) {
            state.editedTask = task
        },
        updateLabels(state, { payload }) {
            // console.log(payload.task.labelIds);
            const labelIdx = state.board.labels.findIndex(l => l.color === payload.label.color)

            const group = state.board.groups.find(g => g.id === payload.groupId)
            const taskIdx = group.tasks.findIndex(task => task.id === payload.task.id)

            if (labelIdx !== -1) {
                // console.log(payload.task.labelIds);
                const taskLabelIdx = payload.task.labelIds.findIndex(labelId => {
                    let found = false
                    state.board.labels.forEach(label => {
                        if (label.id === labelId)
                            found = true
                    })
                    return found
                })
                state.board.labels.splice(labelIdx, 1)
                if (taskLabelIdx !== -1) {
                    payload.task.labelIds.splice(taskLabelIdx, 1)
                    // console.log(payload.task.labelIds);
                }
            }
            else {
                if (!payload.task?.labelIds) payload.task.labelIds = []
                if (!state.board?.labels) state.board.labels = []
                payload.label.id = utilService.makeId()
                payload.task.labelIds.push(payload.label.id)
                state.board.labels.push(payload.label)
            }
            group.tasks.splice(taskIdx, 1, payload.task)
            //find(task => task.id === payload.task.id)
        },
        addChecklist(state, { payload }) {
            const group = state.board.groups.find(g => g.id === payload.groupId)
            const taskIdx = group.tasks.findIndex(task => task.id === payload.task.id)
            if (!group.tasks[taskIdx]?.checklists) group.tasks[taskIdx].checklists = []
            payload.checklist.id = utilService.makeId()
            group.tasks[taskIdx].checklists.push(payload.checklist)
            // console.log(group.tasks[taskIdx].checklists)
        },
        addActivity(state, { activity }) {
            // console.log('*************************', activity)
            if (!activity) return
            if (!state.board?.activities) state.board.activities = []
            state.board.activities.unshift(activity)
            // console.log(`activity:`, activity)
        },
        removeLastActivity(state) {
            state.board.activities.splice(0, 1)
        }
    },

    actions: {
        async addBoard(context, { board }) {
            try {
                board = await boardService.save(board)
                context.commit({ type: 'addBoard', board })
                return board
            } catch (err) {
                console.log('boardStore: Error in addBoard', err)
                throw err
            }
        },

        async updateBoard(context, { board }) {
            context.commit({ type: 'updateBoard', board })
            context.commit({ type: 'setBoard', boardId: board._id })
            try {
                board = await boardService.save(board)
                return board
            } catch (err) {
                console.log('boardStore: Error in updateBoard', err)
                throw err
            }
        },
        async loadBoards(context) {
            try {
                //SEND FILTER
                const boards = await boardService.query()
                // console.log('***************************', boards)
                context.commit({ type: 'setBoards', boards })
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err)
                throw err
            }
        },
        async removeBoard(context, { boardId }) {
            try {
                await boardService.remove(boardId)
                context.commit({ type: 'removeBoard', boardId })
            } catch (err) {
                console.log('boardStore: Error in removeBoard', err)
                throw err
            }
        },

        async updateTask(context, { payload }) {
            //update the task add new activity
            //and send socket to server task-updated.
            const groupId = payload.groupId
            const taskId = payload.task.id
            const prevGroup = context.state.board.groups.find(g => g.id === groupId)
            const prevTask = prevGroup.tasks.find(t => t.id === taskId)
            // console.log(context.state.board.activities);

            context.commit({ type: 'updateTask', payload })
            if (payload.activity) context.commit({ type: 'addActivity', activity: payload.activity })
            const board = context.state.board
            try {
                const newBoard = await boardService.save(board)
                console.log(newBoard);
                // context.commit({ type: 'updateEditedTask', taskId })
                // await boardService.saveTask(payload.activity.boardId, payload.activity.groupId,
                //     payload.task, payload.activity)
            }
            catch (err) {
                {
                    console.log('boardStore: Error in updateLabels', err)
                    context.commit({
                        type: 'updateTask', payload: {
                            task: prevTask,
                            groupId: payload.groupId
                        }
                    })
                    context.commit(({ type: 'removeLastActivity' }))
                    throw err
                }
            }
        },

        async addNewTask(context, { board, groupId, task, activity }) {
            const groupIdx = board.groups.findIndex((group) => group.id === groupId)
            if (board.groups[groupIdx].tasks) {
                board.groups[groupIdx].tasks.push(task)
            } else {
                board.groups[groupIdx].tasks = [task]
            }
            if (board.board.activities) {
                board.activities.push(activity)
            } else {
                board.activities = [activity]
            }

            try {
                this.$store.dispatch({ type: 'updateBoard', board: board })

            } catch (err) {
                board.groups[groupIdx].tasks.pop()
                context.commit({ type: 'updateBoard', board })
                context.commit({ type: 'setBoard', boardId: board._id })
                console.log(err);
                showErrorMsg("Cannot add task");
            }
        },

        async updateLabels(context, { payload }) {
            const prevLabels = context.state.board.labels
            const group = context.state.board.groups.find(g => g.id === payload.groupId)
            const prevTask = group.tasks.find(task => task.id === payload.task.id)

            context.commit({ type: 'updateLabels', payload })
            try {
                await boardService.save(context.state.board)
                // context.commit({ type: 'addActivity', activity: payload.activity })
            } catch (err) {
                console.log('boardStore: Error in updateLabels', err)
                context.commit({
                    type: 'updateTask', payload: {
                        task: prevTask, boardId: payload.boardId,
                        groupId: payload.groupId
                    }
                })
                context.state.board.labels = prevLabels
                throw err
            }
        },
        async addChecklist(context, { payload }) {
            const group = context.state.board.groups.find(g => g.id === payload.groupId)
            const prevTask = group.tasks.find(task => task.id === payload.task.id)

            context.commit({ type: 'addChecklist', payload })
            try {
                context.commit({ type: 'addActivity', activity: payload.activity })
                await boardService.save(context.state.board)
            } catch (err) {
                console.log('boardStore: Error in updateLabels', err)
                context.commit({
                    type: 'updateTask', payload: {
                        task: prevTask, boardId: payload.boardId,
                        groupId: payload.groupId
                    }
                })
                throw err
            }
        }
        // async addBoardMsg(context, { boardId, txt }) {
        //     try {
        //         const msg = await boardService.addBoardMsg(boardId, txt)
        //         context.commit({ type: 'addBoardMsg', boardId, msg })
        //     } catch (err) {
        //         console.log('boardStore: Error in addBoardMsg', err)
        //         throw err
        //     }
        // },

    }
}



 // async updateLabelText(context, { payload }) {
        //     const prevLabels = context.state.board.labels
        //     const group = context.state.board.groups.find(g => g.id === payload.groupId)
        //     const prevTask = group.tasks.find(task => task.id === payload.task.id)

        //     context.commit({ type: 'updateLabelText', payload })
        //     try {
        //         await boardService.save(context.state.board)
        //     } catch (err) {
        //         console.log('boardStore: Error in updateLabelText', err)
        //         context.commit({
        //             type: 'updateLabelText', payload: {
        //                 task: prevTask, boardId: payload.boardId,
        //                 groupId: payload.groupId
        //             }
        //         })
        //         context.state.board.labels = prevLabels
        //         throw err
        //     }
        // },



                // updateLabelText(state, { payload }) {
        //     if (!payload.task?.labelIds) payload.task.labelIds = []
        //     if (!state.board?.labels) state.board.labels = []

        //     const labelIdx = state.board.labels.findIndex(l => l.color === payload.label.color)

        //     if (labelIdx !== -1) {
        //         state.board.labels[labelIdx].title = payload.label.title
        //     }
        //     else {
        //         state.board.labels.push(payload.label)
        //     }
        // },
