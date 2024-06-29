<template>
    <div class="login-form">
        <form @submit.prevent="loginUser">
            <input type="email" v-model="email" name="user-email" placeholder="Correo Electronico" required>
            <input type="password" v-model="password" name="user-password" placeholder="Contraseña" required>
            <div class="button-box">
                <div class="login-toggle-btn">
                    <input type="checkbox" v-model="rememberMe">
                    <label>Recordame</label>
                    <a href="#">Olvidaste tu contraseña?</a>
                </div>
                <button type="submit">Entrar</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            email: '',
            password: '',
            rememberMe: false
        };
    },
    methods: {
        ...mapActions(['login']),
        async loginUser() {
            try {
                await this.login({ email: this.email, password: this.password });
                this.$router.push('/');
            } catch (error) {
                console.error('Error during login:', error);
            }
        }
    }
};
</script>