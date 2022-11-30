import { boardService } from '../../services/board.service.local'

export const boardStore = {
    state: {
        boards: []
    },
    getters: {
        boards({ boards }) { return boards },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
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
        getTaskById(state, {taskId}) {
            console.log(taskId);
        }
        // addBoardMsg(state, { boardId, msg }) {
        //     const board = state.boards.find(board => board._id === boardId)
        //     if (!board.msgs) board.msgs = []
        //     board.msgs.push(msg)
        // },
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
        async updateTask(task, activity) {
            //update the task add new activity
            //and send socket to server task-updated
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