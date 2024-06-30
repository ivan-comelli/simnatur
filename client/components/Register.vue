<template>
    <div class="register-form">
        <form @submit.prevent="registerUser">
            <input v-model="userName" @blur="formatUserName" type="text" name="user-name" placeholder="Nombre de Usuario" required>
            <input v-model="userPassword" type="password" name="user-password" placeholder="Contraseña" required>
            <input v-model="userEmail" name="user-email" placeholder="Correo Electronico" type="email" required>
            <div class="button-box">
                <button type="submit">Registrar</button>
            </div>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </form>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';

    export default { 
        data() {
            return {
                userName: '',
                userPassword: '',
                userEmail: '',
                errorMessage: null
            }
        },
        methods: {
            ...mapActions(['register']),
            formatUserName() {
                this.userName = this.userName.trim().toUpperCase();
            },
            async registerUser() {
                if (!this.validateInputs()) {
                    return;
                }

                const userData = {
                    name: this.userName,
                    password: this.userPassword,
                    email: this.userEmail
                };

                try {
                    await this.register(userData);
                    this.$router.push('/');
                }
                catch {
                    console.error('Error during registration: ', error)
                    this.errorMessage = 'Error durin registration: ' + error.message;
                }
            },
            validateInputs() {
                if (!this.userName || !this.userPassword || !this.userEmail) {
                    this.errorMessage = 'Todos los campos son obligatorios.'
                    return false;
                }
                return true;
            }
        }
    }
</script>