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
            console.log(currBoard);
        },
        addBoard(state, { board }) {
            state.boards.push(board)
        },
        updateBoard(state, { board }) {
            const idx = state.boards.findIndex(b => b._id === board._id)
            console.log(idx);
            state.boards.splice(idx, 1, board)
        },
        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },
        updateTask(state, { payload }) {
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
            console.log(state.editedTask);
            // addBoardMsg(state, { boardId, msg }) {
            //     const board = state.boards.find(board => board._id === boardId)
            //     if (!board.msgs) board.msgs = []
            //     board.msgs.push(msg)
            // },
        },
        updateLabels(state, { payload }) {
            console.log(payload.task.labelIds);
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
            state.board.activities.push(activity)
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
            try {
                board = await boardService.save(board)
                context.commit({ type: 'updateBoard', board })
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
        updateTask(context, { payload }) {
            //update the task add new activity
            //and send socket to server task-updated
            context.commit({ type: 'updateTask', payload })
            const board = context.state.boards.find(b => b._id === payload.boardId)
            // console.log(board);
            boardService.save(board)
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
