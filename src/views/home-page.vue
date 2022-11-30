<template>
  <div class="container home">


    <ul v-if="boards" class="board-list">
      <li v-for="board in boards" :key="board._id">
        <pre>{{ board }}</pre>
        <router-link :to="`/board/${board._id}`">
          <board-preview :board="board" />
        </router-link>
        <button @click="removeBoard(board._id)">x</button>
        <button @click="updateBoard(board)">Update</button>
        <hr />
        <button @click="addBoardMsg(board._id)">Add board msg</button>
        <button @click="printBoardToConsole(board)">Print msgs to console</button>
      </li>
    </ul>
    <hr />
    <form @submit.prevent="addBoard()">
      <h2>Add board</h2>
      <input type="text" v-model="boardToAdd.title" />
      <button>Save</button>
    </form>
  </div>
</template>

<script>

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { boardService } from '../services/board.service.local'

import taskDetailsBtn from '../cmps/task-details-btn.vue'
// import { getActionRemoveBoard, getActionUpdateBoard, getActionAddBoardMsg } from '../store/board.store'

import boardPreview from '../cmps/board-preview.vue'
export default {
  data() {
    return {
      boardToAdd: boardService.getEmptyBoard()
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    boards() {
      return this.$store.getters.boards
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  },
  methods: {
    async addBoard() {
      try {
        await this.$store.dispatch({ type: 'addBoard', board: this.boardToAdd })
        showSuccessMsg('Board added')
        this.boardToAdd = boardService.getEmptyBoard()
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add board')
      }
    },
    async removeBoard(boardId) {
      try {
        await this.$store.dispatch({ type: 'removeBoard', boardId })
        showSuccessMsg('Board removed')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove board')
      }
    },
    async updateBoard(board) {
      try {
        board = { ...board }
        console.log(board.title);
        board.title = prompt('Board title?', board.title)
        console.log(board.title);
        await this.$store.dispatch({ type: 'updateBoard', board })
        showSuccessMsg('Board updated')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update board')
      }
    },
    async addBoardMsg(boardId) {
      try {
        await this.$store.dispatch(getActionAddBoardMsg(boardId))
        showSuccessMsg('Board msg added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add board msg')
      }
    },
    printBoardToConsole(board) {
      console.log('Board msgs:', board.msgs)
    }
  },
  components: {
    boardPreview
  }


}
</script>
