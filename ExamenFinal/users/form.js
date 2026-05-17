export function formularioLogin(){

    return `
    <div>
    <h2>Iniciar Sesion</h2>
        <form action = "/users/login" method="post">
            <input type "email" requiered/>
            <button type="submit"> Entrar</button>
        
        </form>
    <p>¿No tienes cuenta? <a href="/users/registro">Registrate</a></p>
    
    </div>
    `
}

export function formularioRegistro(){

    return `
    <div>
    <h2>registrarse</h2>
        <form action = "/users/registro" method="post">
        <input type="text" name="username" placeholder="Nombre de usuario" required />
            <input type "email" requiered/>
            <button type="submit"> Entrar</button>    
        </form>
    <p>¿Ya tienes cuenta? <a href="/users">Iniciar sesion</a></p>
    </div>
    `
}