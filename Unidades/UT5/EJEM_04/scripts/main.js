
  //enviar formulario
  
const loginForm = document.getElementById('login'); 
const loginButton = document.getElementById('submit'); 
loginButton.addEventListener('click', (e) => { 
  loginForm.submit(); 
})

  //resetar formulario

  // const loginForm = document.getElementById('login'); 
const resetButton = document.getElementById('reset'); 
resetButton.addEventListener('click', (e) => { 
  loginForm.reset(); 
});  