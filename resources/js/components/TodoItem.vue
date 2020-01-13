<template>
    <div @click="toggleCompleted" class="card todo">
        <div class="alert alert-danger" v-if="error">
            {{error}}
        </div>
        <loading :active.sync="loading"
                 :can-cancel="false"
                 :is-full-page="false"
                 :opacity="1"
                 loader="bars"/>
        <div class="card-body d-flex align-items-center justify-content-center">
            <label for="checkbox"/>
            <input class="checkbox" id="checkbox" type="checkbox" v-if="!todo.completed" v-model="todo.completed">
            <div :class=" ['task-text',{'strike-through': todo.completed}]">
                {{todo.task}}
            </div>
        </div>
    </div>
</template>

<script>
    import HTTP from "../utils/HTTP";
    import Loading from 'vue-loading-overlay';

    export default {
        components: {
            Loading
        },

        data() {
            return {
                loading: false,
                error: null
            }
        },
        props: {
            todo: Object,
            index: Number
        },

        methods: {
            toggleCompleted: async function () {
                this.loading = true;
                this.error = null;
                try {
                    const {data} = await HTTP().put(`/todo/${this.todo.id}`, {
                        completed: !this.todo.completed
                    });
                    this.todo.completed = !this.todo.completed;
                    this.$emit('statusChanged', this.index)
                } catch (e) {
                    if (e.response && e.response.data) {
                        this.error = e.response.data.message;
                    } else {
                        this.error = e.message;
                    }
                } finally {
                    this.loading = false;
                }
            }
        }
    }
</script>

<style scoped>
    .strike-through {
        text-decoration: line-through
    }

    .todo {
        margin-top: 10px;
    }

    .todo:hover {
        background: #c8d9e8;
        cursor: pointer;
    }

    .task-text {
        flex: 1;
    }

    .checkbox {
        margin-right: 15px;
        text-align: center;
    }
</style>
