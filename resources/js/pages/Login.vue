<template>
    <!-- Default form login -->
    <div class="container animated fadeIn d-flex full-height align-items-center justify-content-center">
        <loading :active.sync="loading"
                 :can-cancel="false"
                 :is-full-page="true"/>
        <div class="card col-md-4 col-sm-12 col-xs-12">
            <form @submit="loginUser" class="card-body">

                <p class="h4 mb-4 text-center text-capitalize">Sign in</p>
                <div class="alert alert-danger" v-if="error.message">
                    {{error.message}}
                </div>
                <div class="form-group">
                    <label class="text-left" for="email">Email address</label>
                    <input class="form-control" id="email" placeholder="Enter email" type="email" v-model="email">
                    <small class="form-text text-danger" id="emailHelp" v-if="error.email">{{error.email}}</small>
                </div>

                <!-- Password -->
                <div class="form-group">
                    <label class="text-left" for="password">Password</label>
                    <input class="form-control" id="password" placeholder="Password" type="password" v-model="password">
                    <small class="form-text text-danger" v-if="error.password">{{error.password}}</small>
                </div>

                <button class="btn btn-info btn-block my-4" type="submit">Sign in</button>

                <p>Not a member?
                    <router-link to="/register">Register</router-link>
                </p>

            </form>
        </div>
    </div>
    <!-- Default form login -->
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import HTTP from "../utils/HTTP";
    import {formErrorConvertor} from "../utils/ApiErrorConvertor";
    import * as Auth from "../utils/Auth";

    export default {
        components: {Loading},
        data() {
            return {
                loading: false,
                email: '',
                password: '',
                error: {
                    message: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            loginUser: async function (e) {
                e.preventDefault();
                this.loading = true;
                this.error = formErrorConvertor({}, ['email', 'password'])
                try {
                    const {data} = await HTTP().post('/login', {
                        email: this.email,
                        password: this.password
                    });
                    Auth.login(data);
                    await this.$router.push('/')
                } catch (error) {
                    this.error = formErrorConvertor(error, ['email', 'password'])
                } finally {
                    this.loading = false
                }
            }
        }
    }
</script>

<style scoped>
    .full-height {
        height: 100vh;
    }
</style>
