
import { storageService } from './async.storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    // addBoardActivity
}
window.cs = boardService


async function query(filterBy = { title: '' }) {
    var boards = await storageService.query(STORAGE_KEY)
    // if (filterBy.title) {
    //     const regex = new RegExp(filterBy.title, 'i')
    //     boards = boards.filter(board => regex.test(board.title))
    // }
    // if (filterBy.price) {
    //     boards = boards.filter(board => board.price <= filterBy.price)
    // }
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

function saveTask(boardId, groupId, task, activity) {
    const board = getById(boardId)
    // PUT /api/board/b123/task/t678

    // TODO: find the task, and update
    board.activities.unshift(activity)
    save(board)
    // return board
    // return task
}
async function saveGroup(boardId, groupId, activity) {
    try {
        const board = await getById(boardId)
        
    }
    catch {

    }


    // TODO: find the task, and update
    board.activities.unshift(activity)
    save(board)
    // return board
    // return task
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        board.createdBy = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

// async function addBoardActivity(boardId, txt) {
//     // Later, this is all done by the backend
//     const board = await getById(boardId)
//     if (!board.activities) board.activities = []

//     const msg = {
//         id: utilService.makeId(),
//         createdAt: Date.now(),
//         byMember: userService.getLoggedinUser(),
//         txt
//     }

//     board.activities.push(msg)
//     await storageService.put(STORAGE_KEY, board)

//     return activity
// }

function getEmptyBoard(
    title = '',
    isStarred = false,
    createdBy = {},
    style = {},
    labels = [],
    groups = [],
    members = [],
    activities = []) {
    return {
        _id: utilService.makeId(),
        title,
        isStarred,
        createdBy,
        style,
        labels,
        groups,
        members,
        activities,
    }
}


; (async () => {
    await storageService.post(STORAGE_KEY, getEmptyBoard(
        'Amir and Gal',
        true,
        {},
        { backgroundColor: "red" },
        ['important', 'urgent'],
        [],
        []))
    await storageService.post(STORAGE_KEY, getEmptyBoard(
        'Yadid',
        false,
        {},
        { backgroundColor: "red" },
        ['important', 'urgent', 'best'],
        [],
        []))
    await storageService.post(STORAGE_KEY, getEmptyBoard(
        "Testing board", //title
        false, //isStarred
        {}, //createdBy
        {}, //style
        [ //labels
            {
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            },
            {
                "id": "l102",
                "title": "Progress",
                "color": "#61bd33"
            }
        ],
        [ //groups
            {
                "id": "g101",
                "title": "Group 1",
                "archivedAt": 1589983468418,
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo"
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples"
                    }
                ],
                "style": {}
            },
        ],
        [], //members
        [], //activities
    ))


})()
