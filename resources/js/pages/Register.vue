<template>
    <!-- Default form login -->
    <div class="container animated fadeIn d-flex full-height align-items-center justify-content-center">
        <loading :active.sync="loading"
                 :can-cancel="false"
                 :is-full-page="true"/>
        <div class="card col-md-4 col-sm-12 col-xs-12">
            <form @submit="loginUser" class="card-body">

                <p class="h4 mb-4 text-center text-capitalize">Register</p>
                <div class="alert alert-danger" v-if="error.message">
                    {{error.message}}
                </div>
                <div class="form-group">
                    <label class="text-left" for="name">Email address</label>
                    <input class="form-control" id="name" placeholder="Full Name" type="text" v-model="name">
                    <small class="form-text text-danger" v-if="error.name">{{error.name}}</small>
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
                <div class="form-group">
                    <label class="text-left" for="password_confirmation">Password Confirm</label>
                    <input class="form-control" id="password_confirmation" placeholder="Password" type="password"
                           v-model="password_confirmation">
                    <small class="form-text text-danger" v-if="error.password_confirmation">{{error.password_confirmation}}</small>
                </div>

                <button class="btn btn-info btn-block my-4" type="submit">Register</button>

                <p>Already Registered?
                    <router-link to="/login">SignIn</router-link>
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

    export default {
        components: {Loading},
        data() {
            return {
                loading: false,
                email: '',
                password: '',
                password_confirmation: '',
                name: '',
                error: {
                    message: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                }
            }
        },
        methods: {
            loginUser: async function (e) {
                e.preventDefault();
                this.loading = true;
                this.error = formErrorConvertor({}, ['email', 'password', 'password_confirmation', 'name'])
                try {
                    const {data} = await HTTP().post('/register', {
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password_confirmation,
                        name: this.name,

                    });
                    const user = data.user;
                    const token = data.user.api_token;
                    localStorage.setItem('access_token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    await this.$router.push('/')
                } catch (error) {
                    this.error = formErrorConvertor(error, ['email', 'password', 'password_confirmation', 'name'])
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
