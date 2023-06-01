import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnSubmit = document.querySelector('button');
const form = document.querySelector(".form");


form.addEventListener('submit', onSubmit);


function onSubmit(evt){
  evt.preventDefault();


  let {amount:{value:amount}, delay:{value:delay}, step:{value:step}} = evt.target.elements;

  amount = Number(amount); 
  delay = Number(delay);
  step = Number(step);
 
  notifyPromice(); 
 

 function notifyPromice(){
    for (let i = 1; i<=amount; i+=1){    
        const delayStep = delay+step*(i-1); 
        const promise = createPromise(i, delayStep);  
      setTimeout(()=>{
        promise
        .then(value=>Notify.success(value))
        .catch(err=>Notify.failure(err));
    }, delayStep);
    
  }
 }


  function createPromise(position, delay) {
    return new Promise((res, rej)=>{
      const shouldResolve = Math.random() > 0.3;

        if (shouldResolve) {
          res(`✅ Fulfilled promise ${position} in ${delay}ms`);
        } else {
          rej(`❌ Rejected promise ${position} in ${delay}ms`);
        }
      })
  }

}
