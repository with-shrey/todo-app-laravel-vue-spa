<template>
    <div class="container">
        <loading :active.sync="loading"
                 :can-cancel="false"
                 :is-full-page="true"/>
        <div class="card">
            <div class="card-header">
                <ul class="nav nav-tabs nav-fill card-header-tabs">
                    <li class="nav-item">
                        <router-link active-class="active" class="nav-link" to="/todo/incomplete">Incomplete Tasks
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link active-class="active" class="nav-link" to="/todo/complete">Completed Tasks
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <button @click="logoutUser" class="btn btn-danger" style="float: right">Logout</button>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <div class="alert alert-danger" v-if="error">
                    {{error}}
                </div>
                <add-todo @todoAdded="addItem" v-if="!completed"/>
                <transition-group name="list" tag="p">
                    <todo-item
                        :index="index"
                        :key="todo.id"
                        :todo="todo"
                        @statusChanged="removeItem"
                        class="list-item-custom"
                        v-for="(todo, index) in tasks"/>
                </transition-group>
                <div class="card" v-if="tasks.length === 0">
                    <div class="card-body">
                        <span class="text-danger">No Tasks Found</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import HTTP from "../utils/HTTP";
    import Loading from 'vue-loading-overlay';
    import AddTodo from "../components/AddTodo";
    import TodoItem from "../components/TodoItem";
    import * as Auth from "../utils/Auth";

    async function getTasks(completed) {
        let error, tasks;
        try {
            const {data} = await HTTP().get(`/todo?completed=${Number(completed)}`);
            tasks = data;
            return Promise.resolve(tasks);
        } catch (e) {
            if (e.response && e.response.data) {
                error = e.response.data.message;
            } else {
                error = e.message;
            }
            return Promise.reject(error);
        }
    }

    export default {
        components: {
            Loading,
            AddTodo,
            TodoItem
        },
        data() {
            return {
                loading: false,
                tasks: [],
                error: null,
                completed: false
            }
        },

        mounted() {
            this.completed = this.$route.meta.completed
        },

        beforeRouteEnter(to, from, next) {
            getTasks(to.meta.completed)
                .then((tasks) => {
                    next(vm => vm.setData(null, tasks))
                }).catch((e) => {
                next(vm => vm.setData(e, null))
            })
        },

        beforeRouteUpdate(to, from, next) {
            this.error = null;
            this.loading = true;
            this.tasks = [];
            getTasks(to.meta.completed)
                .then((tasks) => {
                    this.setData(null, tasks);
                    next()
                }).catch((e) => this.setData(e, null))
        },
        watch: {
            '$route.meta.completed': function (completed) {
                this.completed = completed;
            }
        },
        methods: {
            setData: function (err, tasks) {
                this.tasks = tasks || [];
                this.error = err
            },
            removeItem: function (index) {
                this.tasks.splice(index, 1)
            },
            addItem: function (todo) {
                this.tasks.unshift(todo);
            },
            logoutUser: async function () {
                this.loading = true;
                try {
                    await Auth.logout()
                } catch (e) {
                    if (e.response && e.response.data) {
                        this.error = e.response.data.message;
                    } else {
                        this.error = e.message;
                    }
                } finally {
                    this.loading = false;
                }
                this.$router.push('/login');
                window.location.href = `${window.location.origin}/login`;
            }
        }
    }
</script>

<style scoped>
    .list-item-custom {
        display: block;
        margin-right: 10px;
    }

    .list-enter-active, .list-leave-active {
        transition: all 0.5s;
    }

    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
    {
        opacity: 0;
        transform: translateY(-20%);
    }
</style>
