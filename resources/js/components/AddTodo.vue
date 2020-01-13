<template>
    <div class="card">
        <loading :active.sync="loading"
                 :can-cancel="false"
                 :is-full-page="false"
                 :opacity="1"
                 loader="bars"/>
        <form @submit="createTodo" class="card-body">
            <div class="alert alert-danger" v-if="error.message">
                {{error.message}}
            </div>
            <div class="form-group">
                <label class="text-left" for="email">Create Todo</label>
                <textarea class="form-control" id="email" placeholder="Task details here..." rows="3" type="email"
                          v-model="task"/>
                <small class="form-text text-danger" id="emailHelp" v-if="error.task">{{error.task}}</small>
            </div>
            <input class="btn btn-info btn-block my-4" type="submit" value="Add Task"/>
        </form>
    </div>
</template>

<script>
    import HTTP from "../utils/HTTP";
    import Loading from 'vue-loading-overlay';
    import {formErrorConvertor} from "../utils/ApiErrorConvertor";

    export default {
        components: {Loading},
        data() {
            return {
                loading: false,
                task: '',
                error: {
                    task: '',
                    message: ''
                }
            }
        },
        methods: {
            createTodo: async function (e) {
                e.preventDefault();
                this.error = formErrorConvertor({}, ['task'])
                this.loading = true;
                try {
                    const {data} = await HTTP().post('/todo', {
                        task: this.task,
                    });
                    this.$emit('todoAdded', data);
                    this.task = '';
                } catch (error) {
                    this.error = formErrorConvertor(error, ['task'])
                } finally {
                    this.loading = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>
