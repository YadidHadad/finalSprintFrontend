import { boardService } from '../../services/board.service.local'
import { utilService } from '../../services/util.service'
import { store } from '../store'

export const boardStore = {
    state: {
        boards: null,
        board: null,
        editedTask: null,
        previewTask: null
    },

    getters: {
        boards({ boards }) { return boards },
        board({ board }) { return board },
        getEditedTask({ editedTask }) { return editedTask },
        labels({ board }) { return board.labels },
        checklists({ editedTask }) { return editedTask.checklists },
        activities({ board }) {
            return board.activities
        },
        members({ board }) {
            return board.members
        },
        taskLabels({ editedTask, board }) {
            if (!editedTask.labelIds) return []
            return board.labels.filter(bl => {
                if (editedTask.labelIds.includes(bl.id))
                    return bl
            })
        },
        boardDoneTodos({ board }) {
            const boardDoneTodos = []
            board.groups.forEach(group => {
                group.tasks.forEach(task => {
                    task.checklists.forEach(checklist => {
                        checklist.todos.forEach(todo => {
                            if (todo.idDone) {
                                doneTodos.push(todo)
                            }
                        })
                    })
                })
            })
            return boardDoneTodos
        },
        isPreviewLabelsOpen({ board }) {
            return board.isPreviewLabelsOpen
        }
        // labelIds({ editedTask }) { return editedTask.labelIds }
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
            console.log(payload, 'PAYLLOADDDDD');
            state.editedTask = payload.task
            const group = state.board.groups.find(g => g.id === payload.groupId)
            const taskIdx = group.tasks.findIndex(task => task.id === payload.task.id)
            group.tasks.splice(taskIdx, 1, payload.task)
        },

        updateLabel(state, { label }) {
            const labelIdx = state.board.labels.findIndex(l => l.id === label.id)
            state.board.labels.splice(labelIdx, 1, label)
        },

        setEditedTask(state, { taskId, groupId, boardId }) {
            if (!state.boards) return
            const board = state.boards.find((board) => board._id === boardId)
            const group = board.groups.find((group) => group.id === groupId)
            const task = group.tasks.find((task) => task.id === taskId)
            state.editedTask = task
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

            activity.createdAt = Date.now()
            activity.id = utilService.makeId()

            if (!activity) return
            if (!state.board?.activities) state.board.activities = []
            state.board.activities.unshift(activity)
            // console.log(`activity:`, activity)
        },
        removeLastActivity(state) {
            state.board.activities.splice(0, 1)
        },
        togglePreviewLabels(state, { isOpen }) {
            state.board.isPreviewLabelsOpen = isOpen
        }
    },

    actions: {
        async loadBoards(context) {
            try {
                //SEND FILTER
                const boards = await boardService.query()
                context.commit({ type: 'setBoards', boards })
                return boards
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err)
                throw err
            }
        },
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
                context.commit({ type: 'updateBoard', board })
                context.commit({ type: 'setBoard', boardId: board._id })
                return board
            } catch (err) {
                console.log('boardStore: Error in updateBoard', err)
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
            console.log(payload.activity)
            console.log('PAYLOAD!!!!!!!!');
            console.log(payload);
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
                return payload.task
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

        async addTask(context, { boardId, groupId, task, activity }) {
            console.log(boardId, groupId, task, activity);
            const board = JSON.parse(JSON.stringify(context.state.boards.find(board => board._id === boardId)))

            const groupIdx = board.groups.findIndex((group) => group.id === groupId)
            console.log(groupIdx , '>>>>>>>>>>>>>>');
            if (!board.groups[groupIdx].tasks) board.groups[groupIdx].tasks = []
            board.groups[groupIdx].tasks.push(task)
            try {
                const updatedBoard = await context.dispatch({ type: 'updateBoard', board })
                context.commit({ type: 'addActivity', activity })
                return updatedBoard
            } catch (err) {
                board.groups[groupIdx].tasks.pop()
                context.commit({ type: 'updateBoard', board })
                context.commit({ type: 'setBoard', boardId: board._id })
                throw err
            }
        },

        async addGroup(context, { board, group, activity }) {
            group.id = utilService.makeId()
            board.groups.push(group)
            try {
                const updatedBoard = await context.dispatch({ type: 'updateBoard', board: board })
                context.commit({ type: 'addActivity', activity })
                return updatedBoard
            }
            catch (err) {
                console.log(err);
                board.groups.pop(group)
                context.commit({ type: 'updateBoard', board })
                context.commit({ type: 'setBoard', boardId: board._id })
                throw err
            }
        },

        async removeTask(context, { payload }) {
            console.log(payload, 'REMOVEEEEEEEEEEEEEEEEE');
            const prevBoard = context.state.boards.find(board => board._id === payload.activity.boardId)
            const newBoard = JSON.parse(JSON.stringify(prevBoard))
            const group = newBoard.groups.find(group => group.id === payload.activity.groupId)
            const taskIdx = group.tasks.findIndex(task => task.id === payload.taskId)
            console.log((taskIdx));
            group.tasks.splice(taskIdx, 1)
            context.commit({ type: 'updateBoard', board: newBoard })
            context.commit({ type: 'setBoard', boardId: newBoard._id })

            try {
                await boardService.save(newBoard)
                context.commit({ type: 'addActivity', activity: payload.activity })
                console.log('DELETEEEEEEEEEEEEEEEEEEEEEEEEEED');
            }
            catch (err) {
                console.log(err);
                context.commit({ type: 'updateBoard', board: prevBoard })
                context.commit({ type: 'setBoard', boardId: prevBoard._id })
                throw err
            }
        },

        async removeGroup(context, { board, groupId, activity }) {
            const prevBoard = board
            const idx = board.groups.findIndex((currGroup) => currGroup.id === groupId)
            board.groups.splice(idx, 1)
            context.commit({ type: 'updateBoard', board })
            context.commit({ type: 'setBoard', boardId: board._id })

            try {
                const updatedBoard = await context.dispatch({ type: 'updateBoard', board: board })
                context.commit({ type: 'addActivity', activity })
                return updatedBoard
            }

            catch (err) {
                console.log(err);
                context.commit({ type: 'updateBoard', board: prevBoard })
                context.commit({ type: 'setBoard', boardId: prevBoard._id })
                throw err
            }
        },

        async updateLabel(context, { payload }) {
            console.log(payload);
            const prevLabel = context.state.board.labels.find(l => l.id === payload.label.id)

            context.commit({ type: 'updateLabel', label: payload.label })
            try {
                await boardService.save(context.state.board)
                context.commit({ type: 'addActivity', activity: payload.activity })
            } catch (err) {
                console.log('boardStore: Error in updateLabel', err)
                context.commit({ type: 'updateLabel', prevLabel })
                throw err
            }
        },
    }
}