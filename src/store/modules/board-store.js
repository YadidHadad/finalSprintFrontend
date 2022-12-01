import { boardService } from '../../services/board.service.local'

export const boardStore = {
    state: {
        boards: [],
        editedTask: null,
        board: null
    },

    getters: {
        boards({ boards }) { return boards },
        getEditedTask({ editedTask }) { return editedTask },
        board({ board }) { return board },
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
            const idx = state.boards.findIndex(b => b._id === payload.boardId)
            console.log(idx);
            state.boards[idx].groups.forEach(g => {
                if (g.tasks) {
                    const taskIdx = g.tasks.findIndex(t => t.id === payload.task.id)
                    if (taskIdx !== -1) {
                        g.tasks.splice(taskIdx, 1, payload.task)
                    }
                    console.log(state.boards);
                }
            })
        },
        setEditedTask(state, { taskId }) {
            // state.boards.some(board => {
            //     board.tasks.find(task => {
            //         if(task.id === taskId) {
            //             state.editedTask = task
            //             return true
            //         }
            //         return false
            //     })
            // })
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